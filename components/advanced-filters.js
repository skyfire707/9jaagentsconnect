// Advanced Filtering Sidebar System
// Inspired by 9jaconnet's professional search capabilities

const AdvancedFilters = {
    // Filter categories
    filterConfig: {
        price: {
            label: 'Price Range',
            type: 'range',
            min: 0,
            max: 1000000000,
            step: 1000000,
            presets: [
                { label: 'Under ₦10M', min: 0, max: 10000000 },
                { label: '₦10M - ₦50M', min: 10000000, max: 50000000 },
                { label: '₦50M - ₦100M', min: 50000000, max: 100000000 },
                { label: '₦100M - ₦500M', min: 100000000, max: 500000000 },
                { label: '₦500M+', min: 500000000, max: 1000000000 }
            ]
        },
        propertyType: {
            label: 'Property Type',
            type: 'checkbox',
            options: [
                { value: 'apartment', label: 'Apartment/Flat', icon: 'fa-building' },
                { value: 'duplex', label: 'Duplex', icon: 'fa-home' },
                { value: 'bungalow', label: 'Bungalow', icon: 'fa-house-user' },
                { value: 'terrace', label: 'Terrace', icon: 'fa-city' },
                { value: 'mansion', label: 'Mansion', icon: 'fa-landmark' },
                { value: 'penthouse', label: 'Penthouse', icon: 'fa-building' },
                { value: 'land', label: 'Land', icon: 'fa-square' },
                { value: 'commercial', label: 'Commercial', icon: 'fa-store' }
            ]
        },
        bedrooms: {
            label: 'Bedrooms',
            type: 'chips',
            options: ['1', '2', '3', '4', '5', '6+']
        },
        bathrooms: {
            label: 'Bathrooms',
            type: 'chips',
            options: ['1', '2', '3', '4+']
        },
        amenities: {
            label: 'Amenities',
            type: 'checkbox',
            options: [
                { value: 'pool', label: 'Swimming Pool', icon: 'fa-swimming-pool' },
                { value: 'gym', label: 'Gym', icon: 'fa-dumbbell' },
                { value: 'security', label: 'Security', icon: 'fa-shield-alt' },
                { value: 'parking', label: 'Parking', icon: 'fa-car' },
                { value: 'garden', label: 'Garden', icon: 'fa-tree' },
                { value: 'generator', label: 'Generator', icon: 'fa-bolt' },
                { value: 'acs', label: 'Air Conditioning', icon: 'fa-snowflake' },
                { value: 'furnished', label: 'Furnished', icon: 'fa-couch' },
                { value: 'wifi', label: 'Internet', icon: 'fa-wifi' },
                { value: 'borehole', label: 'Borehole', icon: 'fa-tint' }
            ]
        },
        listingType: {
            label: 'Listing Type',
            type: 'toggle',
            options: [
                { value: 'sale', label: 'For Sale' },
                { value: 'rent', label: 'For Rent' }
            ]
        },
        agentType: {
            label: 'Agent Type',
            type: 'checkbox',
            options: [
                { value: 'verified', label: 'Verified Agents', icon: 'fa-check-circle' },
                { value: 'premium', label: 'Premium Agents', icon: 'fa-crown' },
                { value: 'quick', label: 'Quick Response', icon: 'fa-bolt' }
            ]
        },
        area: {
            label: 'Area (sq meters)',
            type: 'range',
            min: 0,
            max: 2000,
            step: 50,
            presets: [
                { label: 'Under 100 sqm', min: 0, max: 100 },
                { label: '100-300 sqm', min: 100, max: 300 },
                { label: '300-500 sqm', min: 300, max: 500 },
                { label: '500+ sqm', min: 500, max: 2000 }
            ]
        }
    },

    // Current filters state
    activeFilters: {},

    // Generate filter sidebar HTML
    generateFilterSidebar() {
        return `
            <aside class="filter-sidebar">
                <div class="filter-header">
                    <h3><i class="fas fa-filter"></i> Filters</h3>
                    <button class="filter-clear" onclick="AdvancedFilters.clearAll()">Clear all</button>
                </div>
                <div class="filter-content">
                    ${Object.entries(this.filterConfig).map(([key, config]) => this.renderFilterSection(key, config)).join('')}
                </div>
                <div class="filter-footer">
                    <button class="btn btn-primary" style="width: 100%;" onclick="AdvancedFilters.applyFilters()">
                        <i class="fas fa-search"></i> Apply Filters
                    </button>
                </div>
            </aside>
        `;
    },

    // Render individual filter section
    renderFilterSection(key, config) {
        return `
            <div class="filter-section" data-filter="${key}">
                <div class="filter-section-header" onclick="AdvancedFilters.toggleSection(this)">
                    <h4>${config.label}</h4>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="filter-section-content">
                    ${this.renderFilterInput(key, config)}
                </div>
            </div>
        `;
    },

    // Render filter input based on type
    renderFilterInput(key, config) {
        switch (config.type) {
            case 'range':
                return this.renderRangeFilter(key, config);
            case 'checkbox':
                return this.renderCheckboxFilter(key, config);
            case 'chips':
                return this.renderChipsFilter(key, config);
            case 'toggle':
                return this.renderToggleFilter(key, config);
            default:
                return '';
        }
    },

    // Range filter
    renderRangeFilter(key, config) {
        return `
            <div class="range-filter">
                <div class="range-presets">
                    ${config.presets.map(preset => `
                        <button type="button" class="preset-btn" 
                                onclick="AdvancedFilters.setRange('${key}', ${preset.min}, ${preset.max})">
                            ${preset.label}
                        </button>
                    `).join('')}
                </div>
                <div class="range-inputs">
                    <div class="range-input-group">
                        <label>Min</label>
                        <input type="number" id="${key}-min" placeholder="₦0" 
                               value="${this.activeFilters[key]?.min || ''}"
                               onchange="AdvancedFilters.updateFilter('${key}')">
                    </div>
                    <span class="range-separator">-</span>
                    <div class="range-input-group">
                        <label>Max</label>
                        <input type="number" id="${key}-max" placeholder="₦${config.max.toLocaleString()}"
                               value="${this.activeFilters[key]?.max || ''}"
                               onchange="AdvancedFilters.updateFilter('${key}')">
                    </div>
                </div>
            </div>
        `;
    },

    // Checkbox filter
    renderCheckboxFilter(key, config) {
        return `
            <div class="checkbox-filter">
                ${config.options.map(opt => `
                    <label class="checkbox-item">
                        <input type="checkbox" value="${opt.value}"
                               ${this.activeFilters[key]?.includes(opt.value) ? 'checked' : ''}
                               onchange="AdvancedFilters.updateFilter('${key}')">
                        <span class="checkbox-check">
                            <i class="fas fa-check"></i>
                        </span>
                        ${opt.icon ? `<i class="fas ${opt.icon}"></i>` : ''}
                        <span>${opt.label}</span>
                    </label>
                `).join('')}
            </div>
        `;
    },

    // Chips filter
    renderChipsFilter(key, config) {
        return `
            <div class="chips-filter">
                ${config.options.map(opt => `
                    <label class="chip">
                        <input type="checkbox" value="${opt}"
                               ${this.activeFilters[key]?.includes(opt) ? 'checked' : ''}
                               onchange="AdvancedFilters.updateFilter('${key}')">
                        <span>${opt}</span>
                    </label>
                `).join('')}
            </div>
        `;
    },

    // Toggle filter
    renderToggleFilter(key, config) {
        return `
            <div class="toggle-filter">
                ${config.options.map(opt => `
                    <label class="toggle-btn ${this.activeFilters[key] === opt.value ? 'active' : ''}">
                        <input type="radio" name="${key}" value="${opt.value}"
                               ${this.activeFilters[key] === opt.value ? 'checked' : ''}
                               onchange="AdvancedFilters.setToggleFilter('${key}', '${opt.value}')">
                        <span>${opt.label}</span>
                    </label>
                `).join('')}
            </div>
        `;
    },

    // Filter actions
    toggleSection(header) {
        header.parentElement.classList.toggle('collapsed');
    },

    setRange(key, min, max) {
        document.getElementById(`${key}-min`).value = min;
        document.getElementById(`${key}-max`).value = max;
        this.updateFilter(key);
    },

    setToggleFilter(key, value) {
        this.activeFilters[key] = value;
        // Re-render to update UI
        const section = document.querySelector(`[data-filter="${key}"] .filter-section-content`);
        if (section) {
            section.innerHTML = this.renderToggleFilter(key, this.filterConfig[key]);
        }
    },

    updateFilter(key) {
        const config = this.filterConfig[key];
        
        switch (config.type) {
            case 'range':
                const min = document.getElementById(`${key}-min`).value;
                const max = document.getElementById(`${key}-max`).value;
                if (min || max) {
                    this.activeFilters[key] = { min: parseInt(min) || 0, max: parseInt(max) || config.max };
                } else {
                    delete this.activeFilters[key];
                }
                break;
            case 'checkbox':
            case 'chips':
                const checked = Array.from(document.querySelectorAll(`[data-filter="${key}"] input:checked`))
                    .map(cb => cb.value);
                if (checked.length > 0) {
                    this.activeFilters[key] = checked;
                } else {
                    delete this.activeFilters[key];
                }
                break;
        }
        
        this.updateActiveCount();
    },

    updateActiveCount() {
        const count = Object.keys(this.activeFilters).length;
        const clearBtn = document.querySelector('.filter-clear');
        if (clearBtn) {
            clearBtn.textContent = count > 0 ? `Clear all (${count})` : 'Clear all';
            clearBtn.style.visibility = count > 0 ? 'visible' : 'hidden';
        }
    },

    clearAll() {
        this.activeFilters = {};
        document.querySelectorAll('.filter-sidebar input').forEach(input => {
            input.checked = false;
            input.value = '';
        });
        this.updateActiveCount();
        showToast('Filters cleared');
    },

    applyFilters() {
        console.log('Applying filters:', this.activeFilters);
        showToast('Filters applied!');
        
        // Dispatch event for main app
        window.dispatchEvent(new CustomEvent('filtersApplied', { detail: this.activeFilters }));
    },

    // Filter properties
    filterProperties(properties) {
        return properties.filter(prop => {
            // Price filter
            if (this.activeFilters.price) {
                if (prop.price < this.activeFilters.price.min || prop.price > this.activeFilters.price.max) {
                    return false;
                }
            }
            
            // Bedrooms filter
            if (this.activeFilters.bedrooms) {
                const bedCount = prop.bedrooms >= 6 ? '6+' : prop.bedrooms.toString();
                if (!this.activeFilters.bedrooms.includes(bedCount)) return false;
            }
            
            // Bathrooms filter
            if (this.activeFilters.bathrooms) {
                const bathCount = prop.bathrooms >= 4 ? '4+' : prop.bathrooms.toString();
                if (!this.activeFilters.bathrooms.includes(bathCount)) return false;
            }
            
            // Listing type
            if (this.activeFilters.listingType && prop.type !== this.activeFilters.listingType) {
                return false;
            }
            
            // Area filter
            if (this.activeFilters.area) {
                if (prop.area < this.activeFilters.area.min || prop.area > this.activeFilters.area.max) {
                    return false;
                }
            }
            
            return true;
        });
    }
};

// CSS styles
const filterStyles = `
    .filter-sidebar {
        background: white;
        border-radius: 12px;
        box-shadow: var(--shadow);
        width: 280px;
        max-height: calc(100vh - 200px);
        overflow-y: auto;
        position: sticky;
        top: 100px;
    }

    .filter-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1.25rem;
        border-bottom: 1px solid #e9ecef;
    }

    .filter-header h3 {
        font-size: 1.1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .filter-header h3 i {
        color: var(--primary);
    }

    .filter-clear {
        background: none;
        border: none;
        color: var(--primary);
        font-size: 0.85rem;
        cursor: pointer;
        visibility: hidden;
    }

    .filter-clear:hover {
        text-decoration: underline;
    }

    .filter-content {
        padding: 0.5rem 0;
    }

    .filter-section {
        border-bottom: 1px solid #e9ecef;
    }

    .filter-section:last-child {
        border-bottom: none;
    }

    .filter-section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 1.25rem;
        cursor: pointer;
        user-select: none;
    }

    .filter-section-header h4 {
        font-size: 0.95rem;
        font-weight: 600;
    }

    .filter-section-header i {
        font-size: 0.8rem;
        color: var(--gray);
        transition: transform 0.3s;
    }

    .filter-section.collapsed .filter-section-header i {
        transform: rotate(-90deg);
    }

    .filter-section.collapsed .filter-section-content {
        display: none;
    }

    .filter-section-content {
        padding: 0 1.25rem 1.25rem;
    }

    .filter-footer {
        padding: 1rem 1.25rem;
        border-top: 1px solid #e9ecef;
    }

    /* Range Filter */
    .range-presets {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }

    .preset-btn {
        padding: 0.375rem 0.75rem;
        border: 1px solid #e9ecef;
        border-radius: 20px;
        background: white;
        font-size: 0.8rem;
        cursor: pointer;
        transition: all 0.2s;
    }

    .preset-btn:hover,
    .preset-btn.active {
        background: var(--primary);
        color: white;
        border-color: var(--primary);
    }

    .range-inputs {
        display: flex;
        align-items: flex-end;
        gap: 0.5rem;
    }

    .range-input-group {
        flex: 1;
    }

    .range-input-group label {
        display: block;
        font-size: 0.8rem;
        color: var(--gray);
        margin-bottom: 0.25rem;
    }

    .range-input-group input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #e9ecef;
        border-radius: 6px;
        font-size: 0.9rem;
    }

    .range-separator {
        color: var(--gray);
        margin-bottom: 0.5rem;
    }

    /* Checkbox Filter */
    .checkbox-filter {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .checkbox-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        cursor: pointer;
    }

    .checkbox-item input {
        display: none;
    }

    .checkbox-check {
        width: 20px;
        height: 20px;
        border: 2px solid #ddd;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
    }

    .checkbox-check i {
        font-size: 0.7rem;
        color: white;
        opacity: 0;
    }

    .checkbox-item input:checked + .checkbox-check {
        background: var(--primary);
        border-color: var(--primary);
    }

    .checkbox-item input:checked + .checkbox-check i {
        opacity: 1;
    }

    .checkbox-item > i {
        color: var(--gray);
        width: 16px;
    }

    .checkbox-item span:last-child {
        font-size: 0.9rem;
        color: var(--dark);
    }

    /* Chips Filter */
    .chips-filter {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .chip {
        cursor: pointer;
    }

    .chip input {
        display: none;
    }

    .chip span {
        display: block;
        padding: 0.5rem 1rem;
        border: 1px solid #e9ecef;
        border-radius: 20px;
        font-size: 0.85rem;
        transition: all 0.2s;
    }

    .chip input:checked + span {
        background: var(--primary);
        color: white;
        border-color: var(--primary);
    }

    /* Toggle Filter */
    .toggle-filter {
        display: flex;
        gap: 0.5rem;
    }

    .toggle-btn {
        flex: 1;
        cursor: pointer;
    }

    .toggle-btn input {
        display: none;
    }

    .toggle-btn span {
        display: block;
        padding: 0.75rem;
        text-align: center;
        border: 2px solid #e9ecef;
        border-radius: 8px;
        font-size: 0.9rem;
        font-weight: 500;
        transition: all 0.2s;
    }

    .toggle-btn.active span,
    .toggle-btn input:checked + span {
        border-color: var(--primary);
        background: var(--primary) + '10';
        color: var(--primary);
    }

    /* Mobile Filter Toggle */
    .mobile-filter-toggle {
        display: none;
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: var(--primary);
        color: white;
        border: none;
        box-shadow: 0 4px 20px rgba(0,102,255,0.4);
        font-size: 1.25rem;
        cursor: pointer;
        z-index: 100;
    }

    @media (max-width: 1024px) {
        .filter-sidebar {
            position: fixed;
            left: -300px;
            top: 80px;
            bottom: 0;
            z-index: 99;
            transition: left 0.3s;
            border-radius: 0;
        }

        .filter-sidebar.open {
            left: 0;
        }

        .mobile-filter-toggle {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
`;

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdvancedFilters;
}
