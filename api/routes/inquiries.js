// Inquiries/Contact routes - property inquiries, viewings, offers
const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const { query } = require('../config/database');
const { authenticate } = require('../middleware/auth');

// Email service
let resend;
try {
  const { Resend } = require('resend');
  resend = new Resend(process.env.RESEND_API_KEY);
} catch (e) {}

const sendEmail = async ({ to, subject, html }) => {
  try {
    if (resend && process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: '9jaAgentsConnect <noreply@9jaagentsconnect.com>',
        to,
        subject,
        html,
      });
    }
  } catch (err) {
    console.error('Email send failed:', err);
  }
};

// CREATE INQUIRY (Contact agent about property)
router.post('/', [
  body('propertyId').isUUID(),
  body('senderName').trim().isLength({ min: 2 }),
  body('senderEmail').isEmail(),
  body('senderPhone').optional().trim(),
  body('inquiryType').isIn(['viewing', 'information', 'offer', 'callback']),
  body('message').optional().trim(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      propertyId,
      senderName,
      senderEmail,
      senderPhone,
      inquiryType,
      message,
      proposedPrice,
      preferredDate,
      preferredTime
    } = req.body;

    // Get property and agent details
    const propertyResult = await query(
      `SELECT p.id, p.title, p.price, u.id as agent_id, u.email as agent_email, 
        u.first_name as agent_first_name, u.phone as agent_phone
       FROM properties p
       JOIN users u ON p.agent_id = u.id
       WHERE p.id = $1`,
      [propertyId]
    );

    if (propertyResult.rows.length === 0) {
      return res.status(404).json({ error: 'Property not found' });
    }

    const property = propertyResult.rows[0];
    const senderId = req.user ? req.user.id : null;

    // Create inquiry
    const result = await query(
      `INSERT INTO inquiries (
        property_id, sender_id, sender_name, sender_email, sender_phone,
        inquiry_type, message, proposed_price, preferred_date, preferred_time
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *`,
      [
        propertyId, senderId, senderName, senderEmail, senderPhone,
        inquiryType, message, proposedPrice || null, preferredDate || null, preferredTime || null
      ]
    );

    // Update inquiry count
    await query(
      'UPDATE properties SET inquiry_count = inquiry_count + 1 WHERE id = $1',
      [propertyId]
    );

    // Send email to agent
    const inquiryTypeLabel = {
      'viewing': 'Viewing Request',
      'information': 'Information Request',
      'offer': 'Purchase Offer',
      'callback': 'Callback Request'
    };

    await sendEmail({
      to: property.agent_email,
      subject: `New ${inquiryTypeLabel[inquiryType]} - ${property.title}`,
      html: `
        <h2>New ${inquiryTypeLabel[inquiryType]}</h2>
        <p><strong>Property:</strong> ${property.title}</p>
        <p><strong>From:</strong> ${senderName}</p>
        <p><strong>Email:</strong> ${senderEmail}</p>
        ${senderPhone ? `<p><strong>Phone:</strong> ${senderPhone}</p>` : ''}
        ${proposedPrice ? `<p><strong>Proposed Price:</strong> ₦${Number(proposedPrice).toLocaleString()}</p>` : ''}
        ${preferredDate ? `<p><strong>Preferred Date:</strong> ${preferredDate}</p>` : ''}
        ${preferredTime ? `<p><strong>Preferred Time:</strong> ${preferredTime}</p>` : ''}
        ${message ? `<p><strong>Message:</strong></p><p>${message}</p>` : ''}
        <br>
        <p><a href="${process.env.CLIENT_URL}/agent-dashboard" style="padding: 12px 24px; background: #0066FF; color: white; text-decoration: none; border-radius: 6px;">View in Dashboard</a></p>
      `
    });

    res.status(201).json({
      message: 'Inquiry sent successfully',
      inquiry: result.rows[0]
    });

  } catch (err) {
    console.error('Create inquiry error:', err);
    res.status(500).json({ error: 'Failed to send inquiry' });
  }
});

// GET AGENT'S INQUIRIES (Agent only)
router.get('/agent', authenticate, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    let sql = `
      SELECT i.*, p.title as property_title, p.slug as property_slug, p.images as property_images
      FROM inquiries i
      JOIN properties p ON i.property_id = p.id
      WHERE p.agent_id = $1
    `;
    
    const params = [req.user.id];
    let paramIndex = 2;

    if (status) {
      sql += ` AND i.status = $${paramIndex}`;
      params.push(status);
      paramIndex++;
    }

    sql += ` ORDER BY i.created_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    const offset = (page - 1) * limit;
    params.push(limit, offset);

    const result = await query(sql, params);

    // Get counts
    const countsResult = await query(
      `SELECT status, COUNT(*) 
       FROM inquiries i
       JOIN properties p ON i.property_id = p.id
       WHERE p.agent_id = $1
       GROUP BY status`,
      [req.user.id]
    );

    const counts = countsResult.rows.reduce((acc, row) => {
      acc[row.status] = parseInt(row.count);
      return acc;
    }, {});

    res.json({
      inquiries: result.rows,
      counts,
      pagination: { page: parseInt(page), limit: parseInt(limit) }
    });

  } catch (err) {
    console.error('Get inquiries error:', err);
    res.status(500).json({ error: 'Failed to load inquiries' });
  }
});

// UPDATE INQUIRY STATUS (Agent only)
router.patch('/:id/status', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, agentNotes } = req.body;

    // Verify agent owns this inquiry
    const checkResult = await query(
      `SELECT i.id, p.agent_id
       FROM inquiries i
       JOIN properties p ON i.property_id = p.id
       WHERE i.id = $1`,
      [id]
    );

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }

    if (checkResult.rows[0].agent_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await query(
      'UPDATE inquiries SET status = $1, agent_notes = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3',
      [status, agentNotes, id]
    );

    res.json({ message: 'Inquiry updated successfully' });

  } catch (err) {
    console.error('Update inquiry error:', err);
    res.status(500).json({ error: 'Failed to update inquiry' });
  }
});

module.exports = router;
