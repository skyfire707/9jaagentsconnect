// User routes - profile, favorites, settings
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { query } = require('../config/database');
const { authenticate } = require('../middleware/auth');

// GET CURRENT USER PROFILE
router.get('/me', authenticate, async (req, res) => {
  try {
    const result = await query(
      `SELECT u.id, u.email, u.first_name, u.last_name, u.phone, u.avatar_url, 
        u.role, u.email_verified, u.created_at
        ${req.user.role === 'agent' ? ', ap.*' : ''}
      FROM users u
      ${req.user.role === 'agent' ? 'LEFT JOIN agent_profiles ap ON u.id = ap.user_id' : ''}
      WHERE u.id = $1`,
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);

  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ error: 'Failed to load profile' });
  }
});

// UPDATE PROFILE
router.put('/me', authenticate, [
  body('firstName').optional().trim().isLength({ min: 2 }),
  body('lastName').optional().trim().isLength({ min: 2 }),
  body('phone').optional().trim(),
], async (req, res) => {
  try {
    const allowedUpdates = ['first_name', 'last_name', 'phone', 'avatar_url'];
    
    const updates = [];
    const values = [];
    let paramIndex = 1;

    const fieldMap = {
      firstName: 'first_name',
      lastName: 'last_name',
      phone: 'phone',
      avatarUrl: 'avatar_url'
    };

    Object.keys(req.body).forEach(key => {
      const dbField = fieldMap[key];
      if (dbField && allowedUpdates.includes(dbField)) {
        updates.push(`${dbField} = $${paramIndex}`);
        values.push(req.body[key]);
        paramIndex++;
      }
    });

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(req.user.id);

    const result = await query(
      `UPDATE users SET ${updates.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
      values
    );

    res.json({
      message: 'Profile updated successfully',
      user: result.rows[0]
    });

  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// GET USER'S FAVORITES
router.get('/favorites', authenticate, async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const result = await query(
      `SELECT p.*, f.created_at as favorited_at,
        u.first_name as agent_first_name, u.last_name as agent_last_name
      FROM favorites f
      JOIN properties p ON f.property_id = p.id
      JOIN users u ON p.agent_id = u.id
      WHERE f.user_id = $1 AND p.status = 'active'
      ORDER BY f.created_at DESC
      LIMIT $2 OFFSET $3`,
      [req.user.id, limit, offset]
    );

    res.json({
      favorites: result.rows,
      pagination: { page: parseInt(page), limit: parseInt(limit) }
    });

  } catch (err) {
    console.error('Get favorites error:', err);
    res.status(500).json({ error: 'Failed to load favorites' });
  }
});

module.exports = router;
