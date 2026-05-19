// Frontend API Integration for 9jaAgentsConnect
// Add this to your app.js or create a separate api.js file

const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000/api'
  : 'https://9jaagentsconnect-api.up.railway.app/api'; // Change this after Railway deploy

// API Helper
const api = {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = localStorage.getItem('token');
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers
      },
      ...options
    };
    
    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }
    
    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
  
  // GET
  get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  },
  
  // POST
  post(endpoint, body) {
    return this.request(endpoint, { method: 'POST', body });
  },
  
  // PUT
  put(endpoint, body) {
    return this.request(endpoint, { method: 'PUT', body });
  },
  
  // DELETE
  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
};

// Auth functions
const Auth = {
  async register(userData) {
    const data = await api.post('/auth/register', userData);
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },
  
  async login(credentials) {
    const data = await api.post('/auth/login', credentials);
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },
  
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
  },
  
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  
  isLoggedIn() {
    return !!localStorage.getItem('token');
  },
  
  async forgotPassword(email) {
    return api.post('/auth/forgot-password', { email });
  },
  
  async resetPassword(token, password) {
    return api.post('/auth/reset-password', { token, password });
  }
};

// Properties functions
const PropertiesAPI = {
  async search(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return api.get(`/properties/search?${queryString}`);
  },
  
  async getById(id) {
    return api.get(`/properties/${id}`);
  },
  
  async create(propertyData) {
    return api.post('/properties', propertyData);
  },
  
  async update(id, propertyData) {
    return api.put(`/properties/${id}`, propertyData);
  },
  
  async delete(id) {
    return api.delete(`/properties/${id}`);
  },
  
  async addFavorite(id) {
    return api.post(`/properties/${id}/favorite`);
  },
  
  async removeFavorite(id) {
    return api.delete(`/properties/${id}/favorite`);
  },
  
  async getSimilar(id) {
    return api.get(`/properties/${id}/similar`);
  }
};

// Agents functions
const AgentsAPI = {
  async list(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return api.get(`/agents?${queryString}`);
  },
  
  async getById(id) {
    return api.get(`/agents/${id}`);
  },
  
  async updateProfile(profileData) {
    return api.put('/agents/profile', profileData);
  },
  
  async addReview(agentId, reviewData) {
    return api.post(`/agents/${agentId}/reviews`, reviewData);
  }
};

// Inquiries functions
const InquiriesAPI = {
  async create(inquiryData) {
    return api.post('/inquiries', inquiryData);
  },
  
  async getAgentInquiries() {
    return api.get('/inquiries/agent');
  },
  
  async updateStatus(id, status, notes) {
    return api.patch(`/inquiries/${id}/status`, { status, agentNotes: notes });
  }
};

// User functions
const UserAPI = {
  async getProfile() {
    return api.get('/users/me');
  },
  
  async updateProfile(profileData) {
    return api.put('/users/me', profileData);
  },
  
  async getFavorites() {
    return api.get('/users/favorites');
  }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { api, Auth, PropertiesAPI, AgentsAPI, InquiriesAPI, UserAPI };
}
