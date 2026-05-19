// Database configuration for PostgreSQL
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20, // maximum pool size
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test connection
pool.on('connect', () => {
  console.log('📦 Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ Database error:', err);
});

// Query helper
const query = (text, params) => pool.query(text, params);

// Initialize database tables
const initDatabase = async () => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // Users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        role VARCHAR(20) DEFAULT 'buyer' CHECK (role IN ('buyer', 'agent', 'admin')),
        avatar_url VARCHAR(500),
        email_verified BOOLEAN DEFAULT FALSE,
        phone_verified BOOLEAN DEFAULT FALSE,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Agents profile table
    await client.query(`
      CREATE TABLE IF NOT EXISTS agent_profiles (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        company_name VARCHAR(200),
        license_number VARCHAR(100),
        bio TEXT,
        specialties TEXT[],
        regions TEXT[],
        years_experience INTEGER DEFAULT 0,
        total_sales INTEGER DEFAULT 0,
        rating DECIMAL(2,1) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
        review_count INTEGER DEFAULT 0,
        verified BOOLEAN DEFAULT FALSE,
        premium BOOLEAN DEFAULT FALSE,
        response_time_minutes INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Properties table
    await client.query(`
      CREATE TABLE IF NOT EXISTS properties (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        agent_id UUID REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(300) NOT NULL,
        slug VARCHAR(350) UNIQUE,
        description TEXT,
        property_type VARCHAR(50) NOT NULL,
        listing_type VARCHAR(20) NOT NULL CHECK (listing_type IN ('sale', 'rent')),
        status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'sold', 'rented', 'draft', 'archived')),
        
        -- Price
        price DECIMAL(15,2) NOT NULL,
        price_negotiable BOOLEAN DEFAULT FALSE,
        
        -- Location
        address TEXT,
        city VARCHAR(100) NOT NULL,
        state VARCHAR(50) NOT NULL,
        lga VARCHAR(100),
        latitude DECIMAL(10,8),
        longitude DECIMAL(11,8),
        
        -- Property details
        bedrooms INTEGER,
        bathrooms INTEGER,
        toilets INTEGER,
        parking_spaces INTEGER,
        area_sqm DECIMAL(10,2),
        year_built INTEGER,
        
        -- Features
        amenities TEXT[],
        furnished BOOLEAN DEFAULT FALSE,
        
        -- Media
        images TEXT[],
        video_url VARCHAR(500),
        virtual_tour_url VARCHAR(500),
        
        -- Stats
        view_count INTEGER DEFAULT 0,
        inquiry_count INTEGER DEFAULT 0,
        favorite_count INTEGER DEFAULT 0,
        
        -- SEO
        meta_title VARCHAR(70),
        meta_description VARCHAR(160),
        
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Property inquiries
    await client.query(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
        sender_id UUID REFERENCES users(id) ON DELETE SET NULL,
        sender_name VARCHAR(100) NOT NULL,
        sender_email VARCHAR(255) NOT NULL,
        sender_phone VARCHAR(20),
        inquiry_type VARCHAR(20) NOT NULL CHECK (inquiry_type IN ('viewing', 'information', 'offer', 'callback')),
        message TEXT,
        proposed_price DECIMAL(15,2),
        preferred_date DATE,
        preferred_time VARCHAR(10),
        status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'responded', 'scheduled', 'completed', 'cancelled')),
        agent_notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Favorites/Wishlist
    await client.query(`
      CREATE TABLE IF NOT EXISTS favorites (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, property_id)
      )
    `);

    // Reviews/Ratings
    await client.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        reviewer_id UUID REFERENCES users(id) ON DELETE CASCADE,
        agent_id UUID REFERENCES users(id) ON DELETE CASCADE,
        property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        title VARCHAR(200),
        comment TEXT,
        verified_purchase BOOLEAN DEFAULT FALSE,
        helpful_count INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Email verification tokens
    await client.query(`
      CREATE TABLE IF NOT EXISTS email_verifications (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        token VARCHAR(255) UNIQUE NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        used BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Password reset tokens
    await client.query(`
      CREATE TABLE IF NOT EXISTS password_resets (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        token VARCHAR(255) UNIQUE NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        used BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Audit logs
    await client.query(`
      CREATE TABLE IF NOT EXISTS audit_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE SET NULL,
        action VARCHAR(100) NOT NULL,
        entity_type VARCHAR(50),
        entity_id UUID,
        old_data JSONB,
        new_data JSONB,
        ip_address INET,
        user_agent TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create indexes for performance
    await client.query(`CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_properties_location ON properties(state, city)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(property_type, listing_type)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(price)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_properties_agent ON properties(agent_id)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_inquiries_property ON inquiries(property_id)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_reviews_agent ON reviews(agent_id)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_users_role ON users(role)`);

    await client.query('COMMIT');
    console.log('✅ Database tables initialized successfully');
    
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Database initialization failed:', err);
    throw err;
  } finally {
    client.release();
  }
};

module.exports = {
  pool,
  query,
  initDatabase
};
