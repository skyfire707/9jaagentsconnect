// GeoLocation Service for 9jaAgentsConnect
// Automatic location detection and maps integration

const GeoLocationService = {
    // User's current position
    currentPosition: null,
    currentAddress: null,
    
    // Initialize geolocation
    init() {
        this.loadGoogleMapsScript();
        this.checkStoredLocation();
    },

    // Load Google Maps script dynamically
    loadGoogleMapsScript() {
        if (document.getElementById('google-maps-script')) return;
        
        const script = document.createElement('script');
        script.id = 'google-maps-script';
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyYourKey&libraries=places,geometry&callback=initGoogleMaps';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    },

    // Check for stored location
    checkStoredLocation() {
        const stored = localStorage.getItem('userLocation');
        if (stored) {
            this.currentPosition = JSON.parse(stored);
        }
    },

    // Detect user location with multiple fallback methods
    async detectLocation(options = {}) {
        const { showModal = true, onSuccess = null, onError = null } = options;
        
        try {
            // Try browser geolocation first
            if (navigator.geolocation) {
                const position = await this.getBrowserPosition();
                await this.processPosition(position, onSuccess);
                return;
            }
            
            // Fallback to IP-based geolocation
            await this.getIPLocation(onSuccess, onError);
            
        } catch (error) {
            console.error('Location detection failed:', error);
            if (showModal) this.showLocationPrompt();
            if (onError) onError(error);
        }
    },

    // Get browser position
    getBrowserPosition() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                resolve,
                reject,
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
        });
    },

    // Process detected position
    async processPosition(position, onSuccess) {
        const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy
        };
        
        this.currentPosition = coords;
        
        // Reverse geocode to get address
        const address = await this.reverseGeocode(coords.lat, coords.lng);
        this.currentAddress = address;
        
        // Store location
        localStorage.setItem('userLocation', JSON.stringify({
            ...coords,
            address: address,
            timestamp: Date.now()
        }));
        
        // Update UI
        this.updateLocationUI(address);
        
        if (onSuccess) onSuccess(coords, address);
        
        return { coords, address };
    },

    // IP-based location fallback
    async getIPLocation(onSuccess, onError) {
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            
            if (data.latitude && data.longitude) {
                const coords = {
                    lat: data.latitude,
                    lng: data.longitude,
                    accuracy: 5000 // IP location is less accurate
                };
                
                const address = {
                    city: data.city,
                    state: data.region,
                    country: data.country_name,
                    full: `${data.city}, ${data.region}, ${data.country_name}`
                };
                
                this.currentPosition = coords;
                this.currentAddress = address;
                
                localStorage.setItem('userLocation', JSON.stringify({
                    ...coords,
                    address: address,
                    timestamp: Date.now()
                }));
                
                this.updateLocationUI(address);
                if (onSuccess) onSuccess(coords, address);
            }
        } catch (error) {
            if (onError) onError(error);
        }
    },

    // Reverse geocode using OpenStreetMap (free alternative to Google)
    async reverseGeocode(lat, lng) {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
            );
            const data = await response.json();
            
            if (data && data.address) {
                const addr = data.address;
                return {
                    suburb: addr.suburb || addr.neighbourhood || '',
                    city: addr.city || addr.town || addr.village || '',
                    state: addr.state || '',
                    country: addr.country || '',
                    postcode: addr.postcode || '',
                    full: data.display_name || ''
                };
            }
        } catch (error) {
            console.error('Reverse geocoding failed:', error);
        }
        
        return null;
    },

    // Forward geocode (address to coordinates)
    async geocodeAddress(address) {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&countrycodes=ng&limit=1`
            );
            const data = await response.json();
            
            if (data && data.length > 0) {
                return {
                    lat: parseFloat(data[0].lat),
                    lng: parseFloat(data[0].lon),
                    display_name: data[0].display_name
                };
            }
        } catch (error) {
            console.error('Geocoding failed:', error);
        }
        return null;
    },

    // Show location permission prompt
    showLocationPrompt() {
        const modalHTML = `
            <div class="modal active" id="locationPromptModal">
                <div class="modal-content" style="max-width: 400px; text-align: center;">
                    <div class="location-icon-large">
                        <i class="fas fa-map-marker-alt"></i>
                    </div>
                    <h3>Enable Location Services</h3>
                    <p>Allow 9jaAgentsConnect to access your location to find properties near you and show accurate distances.</p>
                    <div class="location-buttons">
                        <button class="btn btn-primary" onclick="GeoLocationService.enableLocation()">
                            <i class="fas fa-location-arrow"></i> Enable Location
                        </button>
                        <button class="btn btn-outline" onclick="GeoLocationService.manualLocation()">
                            <i class="fas fa-search"></i> Search Manually
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    },

    // Enable location when user clicks
    async enableLocation() {
        closeModal('locationPromptModal');
        await this.detectLocation({
            showModal: false,
            onSuccess: (coords, address) => {
                showToast(`Location set to ${address.city || 'your area'}`);
            },
            onError: () => {
                this.manualLocation();
            }
        });
    },

    // Manual location selection
    manualLocation() {
        closeModal('locationPromptModal');
        this.showLocationSelector();
    },

    // Location selector modal with all Nigerian states
    showLocationSelector() {
        const states = LocationHelpers.getAllStates();
        
        const modalHTML = `
            <div class="modal active" id="locationSelectorModal">
                <div class="modal-content" style="max-width: 500px;">
                    <div class="modal-header">
                        <h3><i class="fas fa-map-marker-alt"></i> Select Your Location</h3>
                        <button class="modal-close" onclick="closeModal('locationSelectorModal')">&times;</button>
                    </div>
                    <div class="location-selector-content">
                        <div class="search-locations">
                            <input type="text" id="locationSearch" placeholder="Search city or state..." 
                                   oninput="GeoLocationService.filterLocations(this.value)">
                        </div>
                        <div class="popular-locations">
                            <h4>Popular Cities</h4>
                            <div class="popular-cities-grid">
                                ${LocationHelpers.getPopularCities().map(city => `
                                    <button class="popular-city-btn" onclick="GeoLocationService.setLocation('${city.name}', '${city.state}')">
                                        <span class="city-name">${city.name}</span>
                                        <span class="city-count">${city.count} properties</span>
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                        <div class="all-states">
                            <h4>All States</h4>
                            <div class="states-list">
                                ${states.map(state => `
                                    <div class="state-item" data-state="${state.id}">
                                        <button class="state-btn" onclick="GeoLocationService.toggleStateCities('${state.id}')">
                                            <span>${state.name}</span>
                                            <i class="fas fa-chevron-right"></i>
                                        </button>
                                        <div class="cities-dropdown" id="cities-${state.id}" style="display: none;">
                                            ${LocationHelpers.getStateCities(state.id).map(city => `
                                                <button class="city-option" onclick="GeoLocationService.setLocation('${city.name}', '${state.id}')">
                                                    ${city.name}
                                                </button>
                                            `).join('')}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    },

    // Toggle state cities dropdown
    toggleStateCities(stateId) {
        const dropdown = document.getElementById(`cities-${stateId}`);
        const stateItem = document.querySelector(`[data-state="${stateId}"]`);
        const isVisible = dropdown.style.display !== 'none';
        
        // Close all other dropdowns
        document.querySelectorAll('.cities-dropdown').forEach(d => d.style.display = 'none');
        document.querySelectorAll('.state-item').forEach(s => s.classList.remove('expanded'));
        
        if (!isVisible) {
            dropdown.style.display = 'block';
            stateItem.classList.add('expanded');
        }
    },

    // Filter locations by search
    filterLocations(query) {
        const results = LocationHelpers.searchLocations(query);
        const container = document.querySelector('.location-selector-content');
        
        if (query.length < 2) {
            // Show default view
            this.showLocationSelector();
            return;
        }
        
        // Show search results
        const resultsHTML = `
            <div class="search-results">
                <h4>Search Results</h4>
                ${results.length > 0 ? `
                    <div class="results-list">
                        ${results.map(result => `
                            <button class="result-item" onclick="GeoLocationService.setLocation('${result.name}', '${result.stateKey || result.key}')">
                                <i class="fas ${result.type === 'state' ? 'fa-map' : 'fa-city'}"></i>
                                <div>
                                    <span class="result-name">${result.name}</span>
                                    ${result.state ? `<span class="result-state">${result.state}</span>` : ''}
                                </div>
                            </button>
                        `).join('')}
                    </div>
                ` : '<p class="no-results">No locations found</p>'}
            </div>
        `;
        
        const existingResults = container.querySelector('.search-results');
        if (existingResults) existingResults.remove();
        
        container.insertAdjacentHTML('beforeend', resultsHTML);
    },

    // Set selected location
    async setLocation(cityName, stateKey) {
        // Get coordinates for the city
        const state = NigeriaLocations[stateKey];
        const city = state?.cities.find(c => c.name === cityName);
        
        if (city) {
            this.currentPosition = { lat: city.lat, lng: city.lng };
            this.currentAddress = {
                city: cityName,
                state: state.name,
                full: `${cityName}, ${state.name}`
            };
            
            localStorage.setItem('userLocation', JSON.stringify({
                ...this.currentPosition,
                address: this.currentAddress,
                timestamp: Date.now()
            }));
            
            this.updateLocationUI(this.currentAddress);
            closeModal('locationSelectorModal');
            showToast(`Location set to ${cityName}`);
            
            // Trigger location change event
            window.dispatchEvent(new CustomEvent('locationChanged', {
                detail: { position: this.currentPosition, address: this.currentAddress }
            }));
        }
    },

    // Update location in UI
    updateLocationUI(address) {
        const locationDisplays = document.querySelectorAll('.user-location-display');
        locationDisplays.forEach(display => {
            display.innerHTML = `
                <i class="fas fa-map-marker-alt"></i>
                <span>${address.city || address.state || 'Select Location'}</span>
            `;
            display.classList.add('location-set');
        });
    },

    // Calculate distance from current location
    getDistanceFromCurrent(lat, lng) {
        if (!this.currentPosition) return null;
        
        return LocationHelpers.calculateDistance(
            this.currentPosition.lat,
            this.currentPosition.lng,
            lat,
            lng
        );
    },

    // Format distance for display
    formatDistance(km) {
        if (km < 1) {
            return `${Math.round(km * 1000)}m`;
        } else if (km < 100) {
            return `${km.toFixed(1)}km`;
        } else {
            return `${Math.round(km)}km`;
        }
    },

    // Sort properties by distance
    sortByDistance(properties) {
        if (!this.currentPosition) return properties;
        
        return properties.map(prop => ({
            ...prop,
            distance: this.getDistanceFromCurrent(prop.lat, prop.lng)
        })).sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));
    },

    // Get location-aware header HTML
    getLocationHeaderHTML() {
        return `
            <div class="location-header">
                <button class="location-display user-location-display" onclick="GeoLocationService.showLocationSelector()">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>Detecting location...</span>
                </button>
                <button class="detect-location-btn" onclick="GeoLocationService.detectLocation()" title="Detect my location">
                    <i class="fas fa-crosshairs"></i>
                </button>
            </div>
        `;
    }
};

// Google Maps callback
function initGoogleMaps() {
    console.log('Google Maps initialized');
}

// CSS Styles
const geolocationStyles = `
    /* Location Header */
    .location-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .location-display {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        background: var(--light);
        border: 1px solid #e9ecef;
        border-radius: 20px;
        font-size: 0.9rem;
        color: var(--gray);
        cursor: pointer;
        transition: all 0.3s;
    }

    .location-display:hover {
        border-color: var(--primary);
        color: var(--primary);
    }

    .location-display.location-set {
        background: var(--primary) + '10';
        border-color: var(--primary);
        color: var(--primary);
    }

    .location-display i {
        color: var(--secondary);
    }

    .detect-location-btn {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 1px solid #e9ecef;
        background: white;
        cursor: pointer;
        transition: all 0.3s;
    }

    .detect-location-btn:hover {
        background: var(--primary);
        color: white;
        border-color: var(--primary);
    }

    /* Location Prompt Modal */
    .location-icon-large {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: var(--gradient);
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1.5rem;
    }

    .location-icon-large i {
        font-size: 2.5rem;
        color: white;
    }

    .location-buttons {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        margin-top: 1.5rem;
    }

    /* Location Selector */
    .location-selector-content {
        padding: 1.5rem;
        max-height: 60vh;
        overflow-y: auto;
    }

    .search-locations {
        margin-bottom: 1.5rem;
    }

    .search-locations input {
        width: 100%;
        padding: 0.75rem 1rem;
        border: 2px solid #e9ecef;
        border-radius: 8px;
        font-size: 1rem;
    }

    .search-locations input:focus {
        outline: none;
        border-color: var(--primary);
    }

    .popular-locations {
        margin-bottom: 1.5rem;
    }

    .popular-locations h4,
    .all-states h4 {
        font-size: 0.9rem;
        text-transform: uppercase;
        color: var(--gray);
        margin-bottom: 1rem;
    }

    .popular-cities-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 0.75rem;
    }

    .popular-city-btn {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 1rem;
        border: 1px solid #e9ecef;
        border-radius: 8px;
        background: white;
        cursor: pointer;
        transition: all 0.2s;
    }

    .popular-city-btn:hover {
        border-color: var(--primary);
        background: var(--primary) + '05';
    }

    .popular-city-btn .city-name {
        font-weight: 600;
        color: var(--dark);
    }

    .popular-city-btn .city-count {
        font-size: 0.75rem;
        color: var(--gray);
    }

    .states-list {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    .state-item {
        border: 1px solid #e9ecef;
        border-radius: 8px;
        overflow: hidden;
    }

    .state-btn {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.875rem 1rem;
        background: white;
        border: none;
        cursor: pointer;
        font-size: 0.95rem;
    }

    .state-btn:hover {
        background: var(--light);
    }

    .state-btn i {
        transition: transform 0.3s;
    }

    .state-item.expanded .state-btn i {
        transform: rotate(90deg);
    }

    .cities-dropdown {
        background: var(--light);
        border-top: 1px solid #e9ecef;
    }

    .city-option {
        width: 100%;
        padding: 0.75rem 1rem 0.75rem 2rem;
        background: transparent;
        border: none;
        text-align: left;
        cursor: pointer;
        font-size: 0.9rem;
        color: var(--gray);
    }

    .city-option:hover {
        background: white;
        color: var(--primary);
    }

    /* Search Results */
    .search-results {
        margin-top: 1rem;
    }

    .results-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .result-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.875rem;
        border: 1px solid #e9ecef;
        border-radius: 8px;
        background: white;
        cursor: pointer;
        text-align: left;
    }

    .result-item:hover {
        border-color: var(--primary);
    }

    .result-item i {
        color: var(--primary);
        width: 24px;
        text-align: center;
    }

    .result-name {
        font-weight: 500;
        display: block;
    }

    .result-state {
        font-size: 0.8rem;
        color: var(--gray);
    }

    .no-results {
        text-align: center;
        color: var(--gray);
        padding: 2rem;
    }

    /* Distance Badge */
    .distance-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0.25rem 0.5rem;
        background: var(--secondary) + '15';
        color: var(--secondary);
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 500;
    }

    .distance-badge i {
        font-size: 0.7rem;
    }
`;

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GeoLocationService;
}
