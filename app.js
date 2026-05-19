// 9jaAgentsConnect - Nigeria Real Estate Platform
// Main Application JavaScript

// Sample Property Data (In production, this comes from backend API)
const sampleProperties = [
    {
        id: 1,
        title: "Luxury 5 Bedroom Duplex with Swimming Pool",
        location: "Lekki Phase 1, Lagos",
        price: 450000000,
        priceText: "₦450,000,000",
        type: "sale",
        bedrooms: 5,
        bathrooms: 6,
        area: 650,
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600",
        agent: {
            name: "John Adeyemi",
            phone: "+234 801 234 5678",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        lat: 6.4474,
        lng: 3.4772
    },
    {
        id: 2,
        title: "Modern 3 Bedroom Apartment in Gwarinpa",
        location: "Gwarinpa, Abuja",
        price: 75000000,
        priceText: "₦75,000,000",
        type: "sale",
        bedrooms: 3,
        bathrooms: 3,
        area: 280,
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600",
        agent: {
            name: "Sarah Okonkwo",
            phone: "+234 802 345 6789",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        lat: 9.0765,
        lng: 7.3986
    },
    {
        id: 3,
        title: "Spacious 4 Bedroom Terrace House",
        location: "GRA Phase 3, Port Harcourt",
        price: 120000000,
        priceText: "₦120,000,000",
        type: "sale",
        bedrooms: 4,
        bathrooms: 4,
        area: 450,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600",
        agent: {
            name: "Michael Eze",
            phone: "+234 803 456 7890",
            avatar: "https://randomuser.me/api/portraits/men/67.jpg"
        },
        lat: 4.8156,
        lng: 7.0498
    },
    {
        id: 4,
        title: "Executive 3 Bedroom Flat for Rent",
        location: "Ikeja, Lagos",
        price: 3500000,
        priceText: "₦3,500,000/year",
        type: "rent",
        bedrooms: 3,
        bathrooms: 3,
        area: 220,
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600",
        agent: {
            name: "Grace Ojo",
            phone: "+234 804 567 8901",
            avatar: "https://randomuser.me/api/portraits/women/28.jpg"
        },
        lat: 6.6018,
        lng: 3.3515
    },
    {
        id: 5,
        title: "Newly Built 6 Bedroom Mansion",
        location: "Maitama, Abuja",
        price: 850000000,
        priceText: "₦850,000,000",
        type: "sale",
        bedrooms: 6,
        bathrooms: 7,
        area: 1200,
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600",
        agent: {
            name: "Ahmed Ibrahim",
            phone: "+234 805 678 9012",
            avatar: "https://randomuser.me/api/portraits/men/45.jpg"
        },
        lat: 9.0820,
        lng: 7.5280
    },
    {
        id: 6,
        title: "2 Bedroom Apartment with BQ",
        location: "Victoria Island, Lagos",
        price: 180000000,
        priceText: "₦180,000,000",
        type: "sale",
        bedrooms: 2,
        bathrooms: 2,
        area: 180,
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600",
        agent: {
            name: "Chioma Nnamdi",
            phone: "+234 806 789 0123",
            avatar: "https://randomuser.me/api/portraits/women/56.jpg"
        },
        lat: 6.4281,
        lng: 3.4215
    }
];

// Sample Agents Data - Enhanced with verification badges
const sampleAgents = [
    {
        id: 1,
        name: "John Adeyemi",
        location: "Lagos",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        listings: 47,
        sales: 128,
        rating: 4.9,
        phone: "+234 801 234 5678",
        badges: ['verified', 'premium', 'topRated', 'expert'],
        specialties: ['Luxury Homes', 'Lekki Properties', 'Waterfront'],
        responseTime: '< 30 mins',
        memberSince: '2019',
        successRate: '98%'
    },
    {
        id: 2,
        name: "Sarah Okonkwo",
        location: "Abuja",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        listings: 32,
        sales: 89,
        rating: 4.8,
        phone: "+234 802 345 6789",
        badges: ['verified', 'quickResponse', 'local'],
        specialties: ['Family Homes', 'Gwarinpa', 'New Builds'],
        responseTime: '< 1 hour',
        memberSince: '2021',
        successRate: '96%'
    },
    {
        id: 3,
        name: "Michael Eze",
        location: "Port Harcourt",
        avatar: "https://randomuser.me/api/portraits/men/67.jpg",
        listings: 28,
        sales: 76,
        rating: 4.7,
        phone: "+234 803 456 7890",
        badges: ['verified', 'expert'],
        specialties: ['Oil & Gas Areas', 'GRA', 'Investment Properties'],
        responseTime: '< 2 hours',
        memberSince: '2020',
        successRate: '94%'
    },
    {
        id: 4,
        name: "Grace Ojo",
        location: "Lagos",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg",
        listings: 35,
        sales: 95,
        rating: 4.9,
        phone: "+234 804 567 8901",
        badges: ['verified', 'premium', 'topRated', 'quickResponse'],
        specialties: ['Ikoyi', 'Victoria Island', 'Commercial'],
        responseTime: '< 45 mins',
        memberSince: '2018',
        successRate: '99%'
    }
];

// Import component functions (will be loaded via script tags)
// ReviewsSystem, VerificationSystem, BookingSystem, AdvancedFilters

// State Management
let currentProperties = [...sampleProperties];
let currentAgents = [...sampleAgents];
let map = null;
let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

// DOM Elements
const propertiesGrid = document.getElementById('properties-grid');
const agentsGrid = document.getElementById('agents-grid');
const toast = document.getElementById('toast');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    loadProperties();
    loadAgents();
    initScrollEffects();
    initMobileMenu();
});

// Load Properties
function loadProperties(properties = currentProperties) {
    if (!propertiesGrid) return;
    
    propertiesGrid.innerHTML = properties.map(property => createPropertyCard(property)).join('');
}

// Create Property Card HTML - Enhanced with 9jaconnet features
function createPropertyCard(property) {
    const isFavorite = favorites.includes(property.id);
    const badgeClass = property.type === 'sale' ? 'badge-sale' : 'badge-rent';
    const badgeText = property.type === 'sale' ? 'For Sale' : 'For Rent';
    const agent = sampleAgents.find(a => a.name === property.agent.name) || property.agent;
    
    // Generate trust badges
    const trustBadges = [
        '<span class="trust-badge"><i class="fas fa-eye"></i> 245 views</span>',
        '<span class="trust-badge"><i class="fas fa-clock"></i> Posted today</span>'
    ].join('');
    
    return `
        <div class="property-card" data-id="${property.id}">
            <div class="property-image">
                <img src="${property.image}" alt="${property.title}" loading="lazy">
                <span class="property-badge ${badgeClass}">${badgeText}</span>
                <div class="property-actions">
                    <button class="action-btn ${isFavorite ? 'active' : ''}" onclick="toggleFavorite(${property.id}, event)" title="Save to favorites">
                        <i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                    <button class="action-btn" onclick="showMap(${property.lat}, ${property.lng}, '${property.title}')" title="View on map">
                        <i class="fas fa-map-marker-alt"></i>
                    </button>
                    <button class="action-btn" onclick="shareProperty(${property.id})" title="Share">
                        <i class="fas fa-share-alt"></i>
                    </button>
                </div>
            </div>
            <div class="property-info">
                <div class="property-price">${property.priceText}</div>
                <h3 class="property-title">${property.title}</h3>
                <div class="property-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${property.location}
                </div>
                <div class="property-trust-badges">
                    ${trustBadges}
                </div>
                <div class="property-features">
                    <div class="feature">
                        <i class="fas fa-bed"></i>
                        ${property.bedrooms} Beds
                    </div>
                    <div class="feature">
                        <i class="fas fa-bath"></i>
                        ${property.bathrooms} Baths
                    </div>
                    <div class="feature">
                        <i class="fas fa-ruler-combined"></i>
                        ${property.area} m²
                    </div>
                </div>
                <div class="property-agent">
                    <div class="agent-info" onclick="showAgentProfile('${agent.name}')" style="cursor: pointer;">
                        <img src="${agent.avatar}" alt="${agent.name}" class="agent-avatar">
                        <div>
                            <div class="agent-name">
                                ${agent.name}
                                ${agent.badges?.includes('verified') ? '<i class="fas fa-check-circle" style="color: var(--secondary); margin-left: 4px; font-size: 0.75rem;"></i>' : ''}
                            </div>
                            <div class="agent-rating">
                                ${generateStarRating(agent.rating || 4.5)}
                                <span>(${agent.sales || 50} sales)</span>
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.85rem;" 
                            onclick="BookingSystem.showBookingOptions(${property.id}, ${JSON.stringify(agent).replace(/"/g, '&quot;')})">
                        <i class="fas fa-comment-dots"></i> Contact
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Load Agents
function loadAgents(agents = currentAgents) {
    if (!agentsGrid) return;
    
    agentsGrid.innerHTML = agents.map(agent => createAgentCard(agent)).join('');
}

// Create Agent Card HTML - Enhanced with badges and specialties
function createAgentCard(agent) {
    const badges = agent.badges || ['verified'];
    const specialties = agent.specialties || [];
    const isPremium = badges.includes('premium');
    
    return `
        <div class="agent-card ${isPremium ? 'agent-card-premium' : ''}" onclick="showAgentProfile('${agent.name}')">
            <img src="${agent.avatar}" alt="${agent.name}">
            <h3>${agent.name}</h3>
            <div class="location">
                <i class="fas fa-map-marker-alt"></i> ${agent.location}
            </div>
            <div class="agent-badges-row">
                ${badges.slice(0, 3).map(badge => {
                    const badgeColors = {
                        verified: '#00C853', premium: '#FFD700', topRated: '#FF6B35',
                        quickResponse: '#0066FF', expert: '#9C27B0', local: '#00BCD4'
                    };
                    const icons = {
                        verified: 'fa-check-circle', premium: 'fa-crown', topRated: 'fa-star',
                        quickResponse: 'fa-bolt', expert: 'fa-award', local: 'fa-map-marked-alt'
                    };
                    return `<i class="fas ${icons[badge]}" style="color: ${badgeColors[badge]};" title="${badge}"></i>`;
                }).join('')}
            </div>
            ${specialties.length > 0 ? `
                <div class="agent-specialties-mini">
                    ${specialties.slice(0, 2).map(s => `<span class="specialty-pill">${s}</span>`).join('')}
                </div>
            ` : ''}
            <div class="agent-stats">
                <div class="agent-stat">
                    <div class="agent-stat-value">${agent.listings}</div>
                    <div class="agent-stat-label">Listings</div>
                </div>
                <div class="agent-stat">
                    <div class="agent-stat-value">${agent.sales}</div>
                    <div class="agent-stat-label">Sales</div>
                </div>
                <div class="agent-stat">
                    <div class="agent-stat-value">${agent.rating}</div>
                    <div class="agent-stat-label">★</div>
                </div>
            </div>
            <div class="agent-quick-info">
                <span><i class="fas fa-clock"></i> ${agent.responseTime || '< 1 hour'}</span>
                <span><i class="fas fa-check"></i> ${agent.successRate || '95%'} success</span>
            </div>
            <button class="btn btn-primary" style="width: 100%; margin-top: 1rem;" 
                    onclick="event.stopPropagation(); BookingSystem.showBookingOptions(null, ${JSON.stringify(agent).replace(/"/g, '&quot;')})">
                <i class="fas fa-comment-dots"></i> Contact Agent
            </button>
        </div>
    `;
}

// Generate star rating HTML
function generateStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            stars += '<i class="fas fa-star" style="color: #ffc107;"></i>';
        } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
            stars += '<i class="fas fa-star-half-alt" style="color: #ffc107;"></i>';
        } else {
            stars += '<i class="far fa-star" style="color: #ddd;"></i>';
        }
    }
    return stars;
}

// Show agent profile modal
function showAgentProfile(agentName) {
    const agent = sampleAgents.find(a => a.name === agentName);
    if (!agent) return;
    
    // Calculate agent's reviews
    const agentReviews = ReviewsSystem.sampleReviews.filter(r => {
        const agentProps = sampleProperties.filter(p => p.agent.name === agentName);
        return agentProps.some(p => p.id === r.propertyId);
    });
    
    const modalHTML = `
        <div class="modal active" id="agentProfileModal">
            <div class="modal-content" style="max-width: 600px; max-height: 90vh; overflow-y: auto;">
                <div class="modal-header">
                    <h3>Agent Profile</h3>
                    <button class="modal-close" onclick="closeModal('agentProfileModal')">&times;</button>
                </div>
                <div class="agent-profile-content">
                    <div class="agent-profile-header">
                        <img src="${agent.avatar}" alt="${agent.name}" class="agent-profile-avatar">
                        <div class="agent-profile-info">
                            <h2>${agent.name}</h2>
                            <p class="agent-location"><i class="fas fa-map-marker-alt"></i> ${agent.location}</p>
                            <div class="agent-profile-rating">
                                ${generateStarRating(agent.rating)}
                                <span>${agent.rating} (${agentReviews.length} reviews)</span>
                            </div>
                            <div class="agent-badges">
                                ${(agent.badges || []).map(badge => {
                                    const badgeColors = {
                                        verified: '#00C853', premium: '#FFD700', topRated: '#FF6B35',
                                        quickResponse: '#0066FF', expert: '#9C27B0', local: '#00BCD4'
                                    };
                                    const labels = {
                                        verified: 'Verified', premium: 'Premium', topRated: 'Top Rated',
                                        quickResponse: 'Quick Response', expert: 'Expert', local: 'Local Expert'
                                    };
                                    return `<span class="profile-badge" style="background: ${badgeColors[badge]}20; color: ${badgeColors[badge]};">${labels[badge]}</span>`;
                                }).join('')}
                            </div>
                        </div>
                    </div>
                    
                    <div class="agent-profile-stats">
                        <div class="profile-stat">
                            <div class="profile-stat-value">${agent.listings}</div>
                            <div class="profile-stat-label">Active Listings</div>
                        </div>
                        <div class="profile-stat">
                            <div class="profile-stat-value">${agent.sales}</div>
                            <div class="profile-stat-label">Properties Sold</div>
                        </div>
                        <div class="profile-stat">
                            <div class="profile-stat-value">${agent.successRate || '95%'}</div>
                            <div class="profile-stat-label">Success Rate</div>
                        </div>
                        <div class="profile-stat">
                            <div class="profile-stat-value">${agent.responseTime || '< 1hr'}</div>
                            <div class="profile-stat-label">Response Time</div>
                        </div>
                    </div>
                    
                    ${agent.specialties?.length ? `
                        <div class="agent-profile-section">
                            <h4>Specialties</h4>
                            <div class="specialties-list">
                                ${agent.specialties.map(s => `<span class="specialty-badge">${s}</span>`).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    <div class="agent-profile-section">
                        <h4>Client Reviews</h4>
                        ${agentReviews.length > 0 
                            ? agentReviews.map(r => ReviewsSystem.createReviewCard(r)).join('') 
                            : '<p class="no-reviews">No reviews yet</p>'
                        }
                    </div>
                    
                    <div class="agent-profile-actions">
                        <button class="btn btn-primary" onclick="BookingSystem.showBookingOptions(null, ${JSON.stringify(agent).replace(/"/g, '&quot;')}); closeModal('agentProfileModal');">
                            <i class="fas fa-calendar-check"></i> Book Consultation
                        </button>
                        <a href="tel:${agent.phone.replace(/\s/g, '')}" class="btn btn-outline">
                            <i class="fas fa-phone"></i> Call Now
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Share property
function shareProperty(propertyId) {
    if (navigator.share) {
        navigator.share({
            title: 'Property on 9jaAgentsConnect',
            url: window.location.href + '#property-' + propertyId
        });
    } else {
        showToast('Link copied to clipboard!');
    }
}

// Close modal helper
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    }
}

// Search Tab Switching
function switchTab(tab) {
    document.querySelectorAll('.search-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    
    // Update property type options based on tab
    const propertyType = document.getElementById('property-type');
    propertyType.innerHTML = getPropertyTypeOptions(tab);
}

function getPropertyTypeOptions(tab) {
    const options = {
        buy: `<option value="">Property Type</option>
            <option value="apartment">Apartment</option>
            <option value="duplex">Duplex</option>
            <option value="bungalow">Bungalow</option>
            <option value="terrace">Terrace</option>
            <option value="mansion">Mansion</option>`,
        rent: `<option value="">Property Type</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="room">Room/Self Contain</option>
            <option value="office">Office Space</option>`,
        land: `<option value="">Land Type</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="industrial">Industrial</option>
            <option value="agricultural">Agricultural</option>`,
        commercial: `<option value="">Commercial Type</option>
            <option value="office">Office Building</option>
            <option value="retail">Retail Space</option>
            <option value="warehouse">Warehouse</option>
            <option value="hotel">Hotel/Guest House</option>`
    };
    return options[tab] || options.buy;
}

// Search Properties
function searchProperties(event) {
    event.preventDefault();
    
    const location = document.getElementById('location').value.toLowerCase();
    const propertyType = document.getElementById('property-type').value;
    const priceRange = document.getElementById('price-range').value;
    
    let filtered = sampleProperties.filter(p => {
        let match = true;
        
        if (location && !p.location.toLowerCase().includes(location)) {
            match = false;
        }
        
        if (priceRange) {
            const [min, max] = priceRange.split('-').map(v => v.replace('+', '').trim());
            if (max && p.price > parseInt(max)) match = false;
            if (min && p.price < parseInt(min)) match = false;
        }
        
        return match;
    });
    
    currentProperties = filtered;
    loadProperties();
    
    // Scroll to properties
    document.getElementById('featured').scrollIntoView({ behavior: 'smooth' });
    
    showToast(`Found ${filtered.length} properties matching your search`);
}

// Filter by Location
function filterByLocation(location) {
    const filtered = sampleProperties.filter(p => 
        p.location.toLowerCase().includes(location.toLowerCase())
    );
    currentProperties = filtered;
    loadProperties();
    document.getElementById('featured').scrollIntoView({ behavior: 'smooth' });
    showToast(`Showing properties in ${location}`);
}

// Toggle Favorite
function toggleFavorite(propertyId, event) {
    event.stopPropagation();
    
    const index = favorites.indexOf(propertyId);
    if (index > -1) {
        favorites.splice(index, 1);
        showToast('Removed from favorites');
    } else {
        favorites.push(propertyId);
        showToast('Added to favorites');
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    loadProperties();
}

// Show Map Modal
function showMap(lat, lng, title) {
    const modal = document.getElementById('mapModal');
    modal.classList.add('active');
    
    if (!map) {
        map = L.map('map').setView([lat, lng], 14);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
    } else {
        map.setView([lat, lng], 14);
    }
    
    // Clear existing markers and add new one
    map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });
    
    L.marker([lat, lng])
        .addTo(map)
        .bindPopup(title)
        .openPopup();
}

// Close Map Modal
function closeMap() {
    document.getElementById('mapModal').classList.remove('active');
}

// Contact Agent
function contactAgent(phone, name) {
    showToast(`Calling ${name}...`);
    window.location.href = `tel:${phone.replace(/\s/g, '')}`;
}

// Show Toast Notification
function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// Initialize Scroll Effects
function initScrollEffects() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
        }
    });
    
    // Animate elements on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.property-card, .agent-card, .step').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Mobile Menu
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

// Close modal on outside click
window.addEventListener('click', (e) => {
    const modal = document.getElementById('mapModal');
    if (e.target === modal) {
        closeMap();
    }
});

// Property Detail Modal (Placeholder for future expansion)
function showPropertyDetail(propertyId) {
    const property = sampleProperties.find(p => p.id === propertyId);
    if (!property) return;
    
    // In a full implementation, this would open a detailed view
    console.log('Property detail:', property);
}

// Form Validation Helper
function validateForm(formData) {
    const errors = [];
    
    for (const [key, value] of formData.entries()) {
        if (!value.trim()) {
            errors.push(`${key} is required`);
        }
    }
    
    return errors;
}

// Currency Formatter for Nigeria
function formatNaira(amount) {
    return '₦' + amount.toLocaleString('en-NG');
}

// Backend API Integration
// Uses real API when available, falls back to sample data

const BackendAPI = {
    async getProperties(filters = {}) {
        try {
            const queryParams = new URLSearchParams();
            if (filters.location) queryParams.set('q', filters.location);
            if (filters.listingType) queryParams.set('listingType', filters.listingType);
            if (filters.minPrice) queryParams.set('minPrice', filters.minPrice);
            if (filters.maxPrice) queryParams.set('maxPrice', filters.maxPrice);
            
            const response = await fetch(`${API_BASE_URL}/properties/search?${queryParams}`);
            if (!response.ok) throw new Error('API Error');
            const data = await response.json();
            return data.properties || [];
        } catch (err) {
            console.log('Using sample data (API unavailable)');
            // Fallback to sample data
            let filtered = [...sampleProperties];
            if (filters.location) {
                filtered = filtered.filter(p => 
                    p.location.toLowerCase().includes(filters.location.toLowerCase())
                );
            }
            return filtered;
        }
    },
    
    async getAgents() {
        try {
            const response = await fetch(`${API_BASE_URL}/agents`);
            if (!response.ok) throw new Error('API Error');
            const data = await response.json();
            return data.agents || [];
        } catch (err) {
            console.log('Using sample agents (API unavailable)');
            return sampleAgents;
        }
    },
    
    async getPropertyById(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/properties/${id}`);
            if (!response.ok) throw new Error('API Error');
            return await response.json();
        } catch (err) {
            return sampleProperties.find(p => p.id === id) || null;
        }
    },
    
    async getAgentById(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/agents/${id}`);
            if (!response.ok) throw new Error('API Error');
            return await response.json();
        } catch (err) {
            return sampleAgents.find(a => a.id === id) || null;
        }
    }
};

// Legacy API wrapper for backwards compatibility
const API = {
    async getProperties(filters = {}) {
        return BackendAPI.getProperties(filters);
    },
    
    async getAgents() {
        return BackendAPI.getAgents();
    },
    
    async contactAgent(agentId, message) {
        // This would use the inquiry API
        return { success: true, message: 'Message sent successfully' };
    }
};

// Export for testing (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { API, formatNaira, sampleProperties, sampleAgents };
}

console.log('9jaAgentsConnect loaded successfully! 🏠');
