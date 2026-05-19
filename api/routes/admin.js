// Admin routes - dashboard stats, user management
const express = require('express');
const router = express.Router();
const { query } = require('../config/database');
const { authenticate, requireAdmin } = require('../middleware/auth');

// GET DASHBOARD STATS
router.get('/stats', authenticate, requireAdmin, async (req, res) => {
  try {
    // Users stats
    const userStats = await query(`
      SELECT 
        COUNT(*) as total_users,
        COUNT(CASE WHEN role = 'buyer' THEN 1 END) as buyers,
        COUNT(CASE WHEN role = 'agent' THEN 1 END) as agents,
        COUNT(CASE WHEN email_verified = true THEN 1 END) as verified_users,
        COUNT(CASE WHEN created_at > NOW() - INTERVAL '30 days' THEN 1 END) as new_users_30d
      FROM users
      WHERE is_active = true
    `);

    // Property stats
    const propertyStats = await query(`
      SELECT 
        COUNT(*) as total_properties,
        COUNT(CASE WHEN status = 'active' THEN 1 END) as active_listings,
        COUNT(CASE WHEN status = 'sold' THEN 1 END) as sold,
        COUNT(CASE WHEN listing_type = 'sale' THEN 1 END) as for_sale,
        COUNT(CASE WHEN listing_type = 'rent' THEN 1 END) as for_rent,
        COUNT(CASE WHEN created_at > NOW() - INTERVAL '30 days' THEN 1 END) as new_properties_30d
      FROM properties
    `);

    // Inquiry stats
    const inquiryStats = await query(`
      SELECT 
        COUNT(*) as total_inquiries,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending,
        COUNT(CASE WHEN status = 'responded' THEN 1 END) as responded,
        COUNT(CASE WHEN created_at > NOW() - INTERVAL '7 days' THEN 1 END) as last_7_days
      FROM inquiries
    `);

    res.json({
      users: userStats.rows[0],
      properties: propertyStats.rows[0],
      inquiries: inquiryStats.rows[0]
    });

  } catch (err) {
    console.error('Stats error:', err);
    res.status(500).json({ error: 'Failed to load stats' });
  }
});

// GET ALL USERS (Admin only)
router.get('/users', authenticate, requireAdmin, async (req, res) => {
  try {
    const { role, page = 1, limit = 50 } = req.query;
    const offset = (page - 1) * limit;

    let sql = `
      SELECT u.id, u.email, u.first_name, u.last_name, u.role, 
        u.email_verified, u.is_active, u.created_at
      FROM users u
      WHERE 1=1
    `;
    const params = [];
    let paramIndex = 1;

    if (role) {
      sql += ` AND u.role = $${paramIndex}`;
      params.push(role);
      paramIndex++;
    }

    sql += ` ORDER BY u.created_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(limit, offset);

    const result = await query(sql, params);
    res.json({ users: result.rows });

  } catch (err) {
    console.error('Get users error:', err);
    res.status(500).json({ error: 'Failed to load users' });
  }
});

// VERIFY AGENT (Admin only)
router.patch('/agents/:id/verify', authenticate, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    await query(
      'UPDATE agent_profiles SET verified = TRUE WHERE user_id = $1',
      [id]
    );

    res.json({ message: 'Agent verified successfully' });

  } catch (err) {
    console.error('Verify agent error:', err);
    res.status(500).json({ error: 'Failed to verify agent' });
  }
});

module.exports = router;
