// Authentication routes - Register, Login, Email Verification, Password Reset
const express = require('express');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const { query } = require('../config/database');
const { generateToken } = require('../middleware/auth');

// Email service (using Resend)
let resend;
try {
  const { Resend } = require('resend');
  resend = new Resend(process.env.RESEND_API_KEY);
} catch (e) {
  console.log('Resend not configured, emails will be logged');
}

// Send email helper
const sendEmail = async ({ to, subject, html }) => {
  try {
    if (resend && process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: '9jaAgentsConnect <noreply@9jaagentsconnect.com>',
        to,
        subject,
        html,
      });
      console.log(`✉️ Email sent to ${to}`);
    } else {
      console.log('📧 Email would be sent:', { to, subject });
    }
  } catch (err) {
    console.error('Email send failed:', err);
  }
};

// REGISTER
router.post('/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('firstName').trim().isLength({ min: 2 }),
  body('lastName').trim().isLength({ min: 2 }),
  body('phone').optional().trim(),
  body('role').optional().isIn(['buyer', 'agent'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, firstName, lastName, phone, role = 'buyer' } = req.body;

    // Check if email exists
    const existing = await query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create user
    const result = await query(
      `INSERT INTO users (email, password_hash, first_name, last_name, phone, role)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, email, first_name, last_name, role, created_at`,
      [email, passwordHash, firstName, lastName, phone, role]
    );

    const user = result.rows[0];

    // If agent, create agent profile
    if (role === 'agent') {
      await query(
        'INSERT INTO agent_profiles (user_id) VALUES ($1)',
        [user.id]
      );
    }

    // Generate verification token
    const verificationToken = uuidv4();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await query(
      'INSERT INTO email_verifications (user_id, token, expires_at) VALUES ($1, $2, $3)',
      [user.id, verificationToken, expiresAt]
    );

    // Send verification email
    const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;
    
    await sendEmail({
      to: email,
      subject: 'Verify your 9jaAgentsConnect account',
      html: `
        <h2>Welcome to 9jaAgentsConnect!</h2>
        <p>Hello ${firstName},</p>
        <p>Thank you for registering. Please verify your email address by clicking the link below:</p>
        <p><a href="${verificationUrl}" style="padding: 12px 24px; background: #0066FF; color: white; text-decoration: none; border-radius: 6px;">Verify Email</a></p>
        <p>Or copy and paste this URL:</p>
        <p>${verificationUrl}</p>
        <p>This link expires in 24 hours.</p>
        <br>
        <p>Best regards,<br>9jaAgentsConnect Team</p>
      `
    });

    // Generate JWT
    const token = generateToken(user.id, user.role);

    res.status(201).json({
      message: 'Registration successful. Please check your email to verify your account.',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
        emailVerified: false,
        createdAt: user.created_at
      },
      token
    });

  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// LOGIN
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').exists()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user
    const result = await query(
      `SELECT u.id, u.email, u.password_hash, u.first_name, u.last_name, u.role, 
              u.email_verified, u.avatar_url, u.is_active,
              ap.company_name, ap.verified as agent_verified, ap.premium
       FROM users u
       LEFT JOIN agent_profiles ap ON u.id = ap.user_id
       WHERE u.email = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = result.rows[0];

    if (!user.is_active) {
      return res.status(401).json({ error: 'Account has been deactivated' });
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT
    const token = generateToken(user.id, user.role);

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
        emailVerified: user.email_verified,
        avatarUrl: user.avatar_url,
        agentProfile: user.role === 'agent' ? {
          companyName: user.company_name,
          verified: user.agent_verified,
          premium: user.premium
        } : null
      },
      token
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

// VERIFY EMAIL
router.get('/verify-email', async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ error: 'Verification token required' });
    }

    // Find valid token
    const result = await query(
      `SELECT ev.id, ev.user_id, ev.expires_at, ev.used
       FROM email_verifications ev
       WHERE ev.token = $1`,
      [token]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid verification token' });
    }

    const verification = result.rows[0];

    if (verification.used) {
      return res.status(400).json({ error: 'Token already used' });
    }

    if (new Date(verification.expires_at) < new Date()) {
      return res.status(400).json({ error: 'Token expired' });
    }

    // Mark as verified
    await query('BEGIN');
    
    await query(
      'UPDATE users SET email_verified = TRUE WHERE id = $1',
      [verification.user_id]
    );
    
    await query(
      'UPDATE email_verifications SET used = TRUE WHERE id = $1',
      [verification.id]
    );
    
    await query('COMMIT');

    res.json({ message: 'Email verified successfully' });

  } catch (err) {
    await query('ROLLBACK');
    console.error('Email verification error:', err);
    res.status(500).json({ error: 'Verification failed' });
  }
});

// RESEND VERIFICATION EMAIL
router.post('/resend-verification', async (req, res) => {
  try {
    const { email } = req.body;

    const result = await query(
      'SELECT id, first_name, email_verified FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = result.rows[0];

    if (user.email_verified) {
      return res.status(400).json({ error: 'Email already verified' });
    }

    // Generate new token
    const verificationToken = uuidv4();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // Invalidate old tokens
    await query(
      'UPDATE email_verifications SET used = TRUE WHERE user_id = $1',
      [user.id]
    );

    // Create new token
    await query(
      'INSERT INTO email_verifications (user_id, token, expires_at) VALUES ($1, $2, $3)',
      [user.id, verificationToken, expiresAt]
    );

    // Send email
    const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;
    
    await sendEmail({
      to: email,
      subject: 'Verify your 9jaAgentsConnect account',
      html: `
        <h2>Email Verification</h2>
        <p>Hello ${user.first_name},</p>
        <p>Click below to verify your email:</p>
        <p><a href="${verificationUrl}" style="padding: 12px 24px; background: #0066FF; color: white; text-decoration: none; border-radius: 6px;">Verify Email</a></p>
        <p>Link expires in 24 hours.</p>
      `
    });

    res.json({ message: 'Verification email sent' });

  } catch (err) {
    console.error('Resend verification error:', err);
    res.status(500).json({ error: 'Failed to send verification email' });
  }
});

// FORGOT PASSWORD
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    const result = await query(
      'SELECT id, first_name FROM users WHERE email = $1 AND is_active = TRUE',
      [email]
    );

    if (result.rows.length === 0) {
      // Don't reveal if email exists
      return res.json({ message: 'If an account exists, a reset email has been sent' });
    }

    const user = result.rows[0];

    // Generate reset token
    const resetToken = uuidv4();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Invalidate old tokens
    await query(
      'UPDATE password_resets SET used = TRUE WHERE user_id = $1',
      [user.id]
    );

    // Create new token
    await query(
      'INSERT INTO password_resets (user_id, token, expires_at) VALUES ($1, $2, $3)',
      [user.id, resetToken, expiresAt]
    );

    // Send email
    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
    
    await sendEmail({
      to: email,
      subject: 'Reset your 9jaAgentsConnect password',
      html: `
        <h2>Password Reset</h2>
        <p>Hello ${user.first_name},</p>
        <p>You requested a password reset. Click below to reset your password:</p>
        <p><a href="${resetUrl}" style="padding: 12px 24px; background: #FF6B35; color: white; text-decoration: none; border-radius: 6px;">Reset Password</a></p>
        <p>Or copy: ${resetUrl}</p>
        <p>This link expires in 1 hour.</p>
        <p>If you didn't request this, ignore this email.</p>
      `
    });

    res.json({ message: 'If an account exists, a reset email has been sent' });

  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ error: 'Failed to process request' });
  }
});

// RESET PASSWORD
router.post('/reset-password', [
  body('token').exists(),
  body('password').isLength({ min: 8 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { token, password } = req.body;

    const result = await query(
      `SELECT pr.id, pr.user_id, pr.expires_at, pr.used
       FROM password_resets pr
       WHERE pr.token = $1`,
      [token]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid reset token' });
    }

    const reset = result.rows[0];

    if (reset.used) {
      return res.status(400).json({ error: 'Token already used' });
    }

    if (new Date(reset.expires_at) < new Date()) {
      return res.status(400).json({ error: 'Token expired' });
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(password, 12);

    // Update password and mark token used
    await query('BEGIN');
    
    await query(
      'UPDATE users SET password_hash = $1 WHERE id = $2',
      [passwordHash, reset.user_id]
    );
    
    await query(
      'UPDATE password_resets SET used = TRUE WHERE id = $1',
      [reset.id]
    );
    
    await query('COMMIT');

    res.json({ message: 'Password reset successful' });

  } catch (err) {
    await query('ROLLBACK');
    console.error('Reset password error:', err);
    res.status(500).json({ error: 'Password reset failed' });
  }
});

module.exports = router;
