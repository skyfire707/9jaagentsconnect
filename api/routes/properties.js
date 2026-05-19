// Property routes - CRUD, search, filters
const express = require('express');
const { body, query: queryValidator, validationResult } = require('express-validator');
const slugify = require('slugify');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const { query } = require('../config/database');
const { authenticate, requireAgent, optionalAuth } = require('../middleware/auth');

// SEARCH PROPERTIES
router.get('/search', [
  queryValidator('page').optional().isInt({ min: 1 }),
  queryValidator('limit').optional().isInt({ min: 1, max: 50 }),
], async (req, res) => {
  try {
    const {
      q, // search query
      state,
      city,
      listingType, // sale or rent
      propertyType,
      minPrice,
      maxPrice,
      bedrooms,
      bathrooms,
      amenities,
      agentId,
      sortBy = 'created_at',
      sortOrder = 'desc',
      page = 1,
      limit = 20
    } = req.query;

    let sql = `
      SELECT p.*, 
        u.first_name as agent_first_name, 
        u.last_name as agent_last_name,
        u.avatar_url as agent_avatar,
        ap.company_name as agent_company,
        ap.verified as agent_verified,
        ap.rating as agent_rating
      FROM properties p
      JOIN users u ON p.agent_id = u.id
      LEFT JOIN agent_profiles ap ON u.id = ap.user_id
      WHERE p.status = 'active'
    `;
    
    const params = [];
    let paramIndex = 1;

    // Full-text search
    if (q) {
      sql += ` AND (
        p.title ILIKE $${paramIndex} OR 
        p.description ILIKE $${paramIndex} OR 
        p.city ILIKE $${paramIndex} OR 
        p.state ILIKE $${paramIndex}
      )`;
      params.push(`%${q}%`);
      paramIndex++;
    }

    if (state) {
      sql += ` AND p.state = $${paramIndex}`;
      params.push(state);
      paramIndex++;
    }

    if (city) {
      sql += ` AND p.city = $${paramIndex}`;
      params.push(city);
      paramIndex++;
    }

    if (listingType) {
      sql += ` AND p.listing_type = $${paramIndex}`;
      params.push(listingType);
      paramIndex++;
    }

    if (propertyType) {
      sql += ` AND p.property_type = $${paramIndex}`;
      params.push(propertyType);
      paramIndex++;
    }

    if (minPrice) {
      sql += ` AND p.price >= $${paramIndex}`;
      params.push(minPrice);
      paramIndex++;
    }

    if (maxPrice) {
      sql += ` AND p.price <= $${paramIndex}`;
      params.push(maxPrice);
      paramIndex++;
    }

    if (bedrooms) {
      sql += ` AND p.bedrooms >= $${paramIndex}`;
      params.push(bedrooms);
      paramIndex++;
    }

    if (bathrooms) {
      sql += ` AND p.bathrooms >= $${paramIndex}`;
      params.push(bathrooms);
      paramIndex++;
    }

    if (agentId) {
      sql += ` AND p.agent_id = $${paramIndex}`;
      params.push(agentId);
      paramIndex++;
    }

    // Sorting
    const validSortColumns = ['created_at', 'price', 'view_count', 'bedrooms'];
    const sortCol = validSortColumns.includes(sortBy) ? sortBy : 'created_at';
    const order = sortOrder === 'asc' ? 'ASC' : 'DESC';
    sql += ` ORDER BY p.${sortCol} ${order}`;

    // Pagination
    const offset = (page - 1) * limit;
    sql += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(limit, offset);

    const result = await query(sql, params);

    // Get total count for pagination
    let countSql = 'SELECT COUNT(*) FROM properties WHERE status = \'active\'';
    // ... (simplified - would need same WHERE clauses)
    
    res.json({
      properties: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: result.rows.length // Simplified
      }
    });

  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Search failed' });
  }
});

// GET SINGLE PROPERTY
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;

    // Increment view count
    await query(
      'UPDATE properties SET view_count = view_count + 1 WHERE id = $1',
      [id]
    );

    const result = await query(
      `SELECT p.*,
        u.first_name as agent_first_name, 
        u.last_name as agent_last_name,
        u.email as agent_email,
        u.phone,
        u.avatar_url as agent_avatar,
        ap.company_name as agent_company,
        ap.bio as agent_bio,
        ap.verified as agent_verified,
        ap.premium as agent_premium,
        ap.rating as agent_rating,
        ap.total_sales as agent_sales,
        ap.years_experience
      FROM properties p
      JOIN users u ON p.agent_id = u.id
      LEFT JOIN agent_profiles ap ON u.id = ap.user_id
      WHERE p.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Property not found' });
    }

    // Check if favorited (if user is logged in)
    let isFavorited = false;
    if (req.user) {
      const favResult = await query(
        'SELECT id FROM favorites WHERE user_id = $1 AND property_id = $2',
        [req.user.id, id]
      );
      isFavorited = favResult.rows.length > 0;
    }

    res.json({
      ...result.rows[0],
      isFavorited
    });

  } catch (err) {
    console.error('Get property error:', err);
    res.status(500).json({ error: 'Failed to load property' });
  }
});

// CREATE PROPERTY (Agent only)
router.post('/', authenticate, requireAgent, [
  body('title').trim().isLength({ min: 10, max: 300 }),
  body('description').optional().trim(),
  body('propertyType').isIn(['apartment', 'duplex', 'bungalow', 'terrace', 'mansion', 'land', 'commercial']),
  body('listingType').isIn(['sale', 'rent']),
  body('price').isNumeric().isFloat({ min: 0 }),
  body('city').trim().isLength({ min: 2 }),
  body('state').trim().isLength({ min: 2 }),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      description,
      propertyType,
      listingType,
      price,
      priceNegotiable,
      address,
      city,
      state,
      lga,
      latitude,
      longitude,
      bedrooms,
      bathrooms,
      toilets,
      parkingSpaces,
      areaSqm,
      yearBuilt,
      amenities,
      furnished
    } = req.body;

    const slug = slugify(`${title}-${uuidv4().slice(0, 8)}`, { lower: true });

    const result = await query(
      `INSERT INTO properties (
        agent_id, title, slug, description, property_type, listing_type,
        price, price_negotiable, address, city, state, lga, latitude, longitude,
        bedrooms, bathrooms, toilets, parking_spaces, area_sqm, year_built,
        amenities, furnished
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)
      RETURNING *`,
      [
        req.user.id, title, slug, description, propertyType, listingType,
        price, priceNegotiable, address, city, state, lga, latitude, longitude,
        bedrooms, bathrooms, toilets, parkingSpaces, areaSqm, yearBuilt,
        amenities ? JSON.stringify(amenities) : null, furnished
      ]
    );

    res.status(201).json({
      message: 'Property created successfully',
      property: result.rows[0]
    });

  } catch (err) {
    console.error('Create property error:', err);
    res.status(500).json({ error: 'Failed to create property' });
  }
});

// UPDATE PROPERTY (Agent only - own properties)
router.put('/:id', authenticate, requireAgent, async (req, res) => {
  try {
    const { id } = req.params;

    // Check ownership
    const checkResult = await query(
      'SELECT agent_id FROM properties WHERE id = $1',
      [id]
    );

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Property not found' });
    }

    if (checkResult.rows[0].agent_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to edit this property' });
    }

    const allowedUpdates = [
      'title', 'description', 'price', 'price_negotiable', 'status',
      'address', 'city', 'state', 'lga', 'latitude', 'longitude',
      'bedrooms', 'bathrooms', 'toilets', 'parking_spaces', 'area_sqm',
      'year_built', 'amenities', 'furnished', 'images', 'video_url'
    ];

    const updates = [];
    const values = [];
    let paramIndex = 1;

    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates.push(`${key} = $${paramIndex}`);
        values.push(req.body[key]);
        paramIndex++;
      }
    });

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const result = await query(
      `UPDATE properties SET ${updates.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
      values
    );

    res.json({
      message: 'Property updated successfully',
      property: result.rows[0]
    });

  } catch (err) {
    console.error('Update property error:', err);
    res.status(500).json({ error: 'Failed to update property' });
  }
});

// DELETE PROPERTY (Agent only)
router.delete('/:id', authenticate, requireAgent, async (req, res) => {
  try {
    const { id } = req.params;

    const checkResult = await query(
      'SELECT agent_id FROM properties WHERE id = $1',
      [id]
    );

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Property not found' });
    }

    if (checkResult.rows[0].agent_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await query('DELETE FROM properties WHERE id = $1', [id]);

    res.json({ message: 'Property deleted successfully' });

  } catch (err) {
    console.error('Delete property error:', err);
    res.status(500).json({ error: 'Failed to delete property' });
  }
});

// ADD TO FAVORITES
router.post('/:id/favorite', authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    await query(
      `INSERT INTO favorites (user_id, property_id) VALUES ($1, $2)
       ON CONFLICT (user_id, property_id) DO NOTHING`,
      [req.user.id, id]
    );

    // Update favorite count
    await query(
      'UPDATE properties SET favorite_count = favorite_count + 1 WHERE id = $1',
      [id]
    );

    res.json({ message: 'Added to favorites' });

  } catch (err) {
    console.error('Favorite error:', err);
    res.status(500).json({ error: 'Failed to add favorite' });
  }
});

// REMOVE FROM FAVORITES
router.delete('/:id/favorite', authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    await query(
      'DELETE FROM favorites WHERE user_id = $1 AND property_id = $2',
      [req.user.id, id]
    );

    await query(
      'UPDATE properties SET favorite_count = favorite_count - 1 WHERE id = $1',
      [id]
    );

    res.json({ message: 'Removed from favorites' });

  } catch (err) {
    console.error('Unfavorite error:', err);
    res.status(500).json({ error: 'Failed to remove favorite' });
  }
});

// GET SIMILAR PROPERTIES
router.get('/:id/similar', async (req, res) => {
  try {
    const { id } = req.params;

    const propertyResult = await query(
      'SELECT city, state, property_type, price, bedrooms FROM properties WHERE id = $1',
      [id]
    );

    if (propertyResult.rows.length === 0) {
      return res.status(404).json({ error: 'Property not found' });
    }

    const property = propertyResult.rows[0];

    const similar = await query(
      `SELECT p.*, u.first_name as agent_first_name, u.last_name as agent_last_name
       FROM properties p
       JOIN users u ON p.agent_id = u.id
       WHERE p.id != $1 
         AND p.status = 'active'
         AND p.city = $2
         AND ABS(p.price - $3) < $4
       LIMIT 6`,
      [id, property.city, property.price, property.price * 0.3]
    );

    res.json({ properties: similar.rows });

  } catch (err) {
    console.error('Similar properties error:', err);
    res.status(500).json({ error: 'Failed to load similar properties' });
  }
});

module.exports = router;
