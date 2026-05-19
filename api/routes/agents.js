// Agent routes - profiles, search, reviews
const express = require('express');
const { query: queryValidator, validationResult } = require('express-validator');
const router = express.Router();
const { query } = require('../config/database');
const { authenticate, requireAgent } = require('../middleware/auth');

// GET ALL AGENTS
router.get('/', [
  queryValidator('page').optional().isInt({ min: 1 }),
  queryValidator('limit').optional().isInt({ min: 1, max: 50 }),
], async (req, res) => {
  try {
    const { 
      state, 
      verified, 
      premium, 
      minRating,
      sortBy = 'rating',
      page = 1, 
      limit = 20 
    } = req.query;

    let sql = `
      SELECT u.id, u.first_name, u.last_name, u.email, u.phone, u.avatar_url, u.created_at,
        ap.company_name, ap.bio, ap.specialties, ap.regions, ap.years_experience,
        ap.total_sales, ap.rating, ap.review_count, ap.verified, ap.premium, ap.response_time_minutes,
        (SELECT COUNT(*) FROM properties WHERE agent_id = u.id AND status = 'active') as active_listings
      FROM users u
      JOIN agent_profiles ap ON u.id = ap.user_id
      WHERE u.role = 'agent' AND u.is_active = TRUE
    `;
    
    const params = [];
    let paramIndex = 1;

    if (verified === 'true') {
      sql += ` AND ap.verified = TRUE`;
    }

    if (premium === 'true') {
      sql += ` AND ap.premium = TRUE`;
    }

    if (minRating) {
      sql += ` AND ap.rating >= $${paramIndex}`;
      params.push(minRating);
      paramIndex++;
    }

    if (state) {
      sql += ` AND $${paramIndex} = ANY(ap.regions)`;
      params.push(state);
      paramIndex++;
    }

    // Sorting
    const validSort = {
      'rating': 'ap.rating',
      'sales': 'ap.total_sales',
      'experience': 'ap.years_experience',
      'newest': 'u.created_at'
    };
    
    const sortCol = validSort[sortBy] || 'ap.rating';
    sql += ` ORDER BY ${sortCol} DESC`;

    // Pagination
    const offset = (page - 1) * limit;
    sql += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(limit, offset);

    const result = await query(sql, params);

    res.json({
      agents: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit)
      }
    });

  } catch (err) {
    console.error('Get agents error:', err);
    res.status(500).json({ error: 'Failed to load agents' });
  }
});

// GET SINGLE AGENT
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const agentResult = await query(
      `SELECT u.id, u.first_name, u.last_name, u.email, u.phone, u.avatar_url, u.created_at,
        ap.company_name, ap.bio, ap.license_number, ap.specialties, ap.regions, 
        ap.years_experience, ap.total_sales, ap.rating, ap.review_count, 
        ap.verified, ap.premium, ap.response_time_minutes
      FROM users u
      JOIN agent_profiles ap ON u.id = ap.user_id
      WHERE u.id = $1 AND u.role = 'agent'`,
      [id]
    );

    if (agentResult.rows.length === 0) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    const agent = agentResult.rows[0];

    // Get agent's active properties
    const propertiesResult = await query(
      `SELECT id, title, slug, price, listing_type, city, state, images, bedrooms, bathrooms
       FROM properties 
       WHERE agent_id = $1 AND status = 'active'
       ORDER BY created_at DESC
       LIMIT 6`,
      [id]
    );

    // Get agent's reviews
    const reviewsResult = await query(
      `SELECT r.*, u.first_name, u.last_name, u.avatar_url,
        p.title as property_title
      FROM reviews r
      JOIN users u ON r.reviewer_id = u.id
      LEFT JOIN properties p ON r.property_id = p.id
      WHERE r.agent_id = $1
      ORDER BY r.created_at DESC
      LIMIT 5`,
      [id]
    );

    res.json({
      ...agent,
      properties: propertiesResult.rows,
      reviews: reviewsResult.rows
    });

  } catch (err) {
    console.error('Get agent error:', err);
    res.status(500).json({ error: 'Failed to load agent' });
  }
});

// UPDATE AGENT PROFILE (Own profile only)
router.put('/profile', authenticate, requireAgent, async (req, res) => {
  try {
    const allowedUpdates = [
      'company_name', 'bio', 'license_number', 'specialties', 
      'regions', 'years_experience'
    ];

    const updates = [];
    const values = [];
    let paramIndex = 1;

    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates.push(`${key} = $${paramIndex}`);
        values.push(
          Array.isArray(req.body[key]) ? req.body[key] : req.body[key]
        );
        paramIndex++;
      }
    });

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(req.user.id);

    const result = await query(
      `UPDATE agent_profiles SET ${updates.join(', ')} WHERE user_id = $${paramIndex} RETURNING *`,
      values
    );

    res.json({
      message: 'Profile updated successfully',
      profile: result.rows[0]
    });

  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// ADD REVIEW
router.post('/:id/reviews', authenticate, [
  require('express-validator').body('rating').isInt({ min: 1, max: 5 }),
  require('express-validator').body('comment').optional().trim(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { rating, comment, propertyId } = req.body;

    // Can't review yourself
    if (id === req.user.id) {
      return res.status(400).json({ error: 'Cannot review yourself' });
    }

    // Check if agent exists
    const agentCheck = await query(
      'SELECT id FROM users WHERE id = $1 AND role = \'agent\'',
      [id]
    );

    if (agentCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    // Create review
    await query(
      `INSERT INTO reviews (reviewer_id, agent_id, property_id, rating, comment)
       VALUES ($1, $2, $3, $4, $5)`,
      [req.user.id, id, propertyId || null, rating, comment]
    );

    // Update agent rating
    await query(
      `UPDATE agent_profiles 
       SET rating = (SELECT AVG(rating)::DECIMAL(2,1) FROM reviews WHERE agent_id = $1),
           review_count = (SELECT COUNT(*) FROM reviews WHERE agent_id = $1)
       WHERE user_id = $1`,
      [id]
    );

    res.status(201).json({ message: 'Review added successfully' });

  } catch (err) {
    console.error('Add review error:', err);
    res.status(500).json({ error: 'Failed to add review' });
  }
});

module.exports = router;
