// Professional Verification & Badges System
// Adds trust indicators similar to 9jaconnet

const VerificationSystem = {
    // Verification types
    badges: {
        verified: {
            icon: 'fa-check-circle',
            color: '#00C853',
            label: 'Verified',
            description: 'Identity and credentials verified'
        },
        premium: {
            icon: 'fa-crown',
            color: '#FFD700',
            label: 'Premium',
            description: 'Premium agent with top-tier service'
        },
        topRated: {
            icon: 'fa-star',
            color: '#FF6B35',
            label: 'Top Rated',
            description: 'Consistently rated 4.8+ by clients'
        },
        quickResponse: {
            icon: 'fa-bolt',
            color: '#0066FF',
            label: 'Quick Response',
            description: 'Responds within 1 hour'
        },
        expert: {
            icon: 'fa-award',
            color: '#9C27B0',
            label: 'Expert',
            description: '5+ years experience'
        },
        local: {
            icon: 'fa-map-marked-alt',
            color: '#00BCD4',
            label: 'Local Expert',
            description: 'Specialized in this area'
        }
    },

    // Generate badge HTML
    generateBadge(badgeType, size = 'md') {
        const badge = this.badges[badgeType];
        if (!badge) return '';
        
        const sizes = {
            sm: { fontSize: '10px', padding: '2px 6px', iconSize: '10px' },
            md: { fontSize: '12px', padding: '4px 10px', iconSize: '12px' },
            lg: { fontSize: '14px', padding: '6px 14px', iconSize: '14px' }
        };
        
        const s = sizes[size] || sizes.md;
        
        return `
            <span class="verification-badge ${badgeType}" 
                  style="background: ${badge.color}20; color: ${badge.color}; border: 1px solid ${badge.color}40;"
                  title="${badge.description}">
                <i class="fas ${badge.icon}" style="font-size: ${s.iconSize};"></i>
                ${badge.label}
            </span>
        `;
    },

    // Generate multiple badges
    generateBadges(badgeTypes, size = 'md') {
        return badgeTypes.map(type => this.generateBadge(type, size)).join('');
    },

    // Agent verification card
    createAgentVerificationCard(agent) {
        const badges = agent.badges || ['verified'];
        const specialties = agent.specialties || [];
        
        return `
            <div class="agent-verification-info">
                <div class="agent-badges">
                    ${this.generateBadges(badges, 'md')}
                </div>
                ${specialties.length > 0 ? `
                    <div class="agent-specialties">
                        <span class="specialties-label">Specialties:</span>
                        ${specialties.map(s => `<span class="specialty-tag">${s}</span>`).join('')}
                    </div>
                ` : ''}
                <div class="agent-stats-row">
                    <div class="stat-item">
                        <i class="fas fa-clock"></i>
                        <span>Response time: ${agent.responseTime || '< 1 hour'}</span>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-calendar-check"></i>
                        <span>Member since ${agent.memberSince || '2024'}</span>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-shield-alt"></i>
                        <span>${agent.successRate || '98%'} success rate</span>
                    </div>
                </div>
            </div>
        `;
    },

    // Verification modal
    showVerificationModal(agent) {
        const badges = agent.badges || [];
        const modalHTML = `
            <div class="modal active" id="verificationModal">
                <div class="modal-content" style="max-width: 500px;">
                    <div class="modal-header">
                        <h3><i class="fas fa-shield-alt" style="color: var(--secondary);"></i> Verification Status</h3>
                        <button class="modal-close" onclick="closeModal('verificationModal')">&times;</button>
                    </div>
                    <div class="verification-modal-content">
                        <div class="agent-header">
                            <img src="${agent.avatar}" alt="${agent.name}" class="agent-large-avatar">
                            <div>
                                <h4>${agent.name}</h4>
                                <div class="agent-badges-large">
                                    ${this.generateBadges(badges, 'lg')}
                                </div>
                            </div>
                        </div>
                        <div class="verification-checks">
                            <h4>Verified Credentials</h4>
                            <div class="check-list">
                                ${this.getVerificationChecks(agent).map(check => `
                                    <div class="check-item ${check.verified ? 'verified' : ''}">
                                        <i class="fas ${check.verified ? 'fa-check-circle' : 'fa-circle'}"></i>
                                        <span>${check.label}</span>
                                        ${check.verified ? '<span class="check-date">' + check.date + '</span>' : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        <div class="verification-note">
                            <i class="fas fa-info-circle"></i>
                            <p>All verifications are conducted by the 9jaAgentsConnect team. We verify identity, credentials, and track record.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    },

    // Get verification checks
    getVerificationChecks(agent) {
        return [
            { label: 'Government ID Verified', verified: true, date: 'Jan 2026' },
            { label: 'Real Estate License', verified: agent.badges?.includes('expert'), date: 'Mar 2026' },
            { label: 'Phone Number Verified', verified: true, date: 'Jan 2026' },
            { label: 'Email Address Verified', verified: true, date: 'Jan 2026' },
            { label: 'Background Check Passed', verified: agent.badges?.includes('verified'), date: 'Feb 2026' },
            { label: 'Professional References', verified: agent.badges?.includes('premium'), date: 'Mar 2026' }
        ];
    }
};

// CSS styles for verification
const verificationStyles = `
    .verification-badge {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 4px 10px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
        margin-right: 6px;
        margin-bottom: 4px;
        transition: transform 0.2s;
    }

    .verification-badge:hover {
        transform: scale(1.05);
    }

    .agent-verification-info {
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid #e9ecef;
    }

    .agent-badges {
        margin-bottom: 0.75rem;
    }

    .agent-specialties {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }

    .specialties-label {
        font-size: 0.85rem;
        color: var(--gray);
    }

    .specialty-tag {
        background: var(--light);
        color: var(--dark);
        padding: 4px 10px;
        border-radius: 12px;
        font-size: 0.8rem;
        font-weight: 500;
    }

    .agent-stats-row {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
    }

    .stat-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.85rem;
        color: var(--gray);
    }

    .stat-item i {
        color: var(--primary);
    }

    /* Verification Modal Styles */
    .verification-modal-content {
        padding: 1.5rem;
    }

    .agent-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.5rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid #e9ecef;
    }

    .agent-large-avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        object-fit: cover;
        border: 3px solid var(--primary);
    }

    .agent-header h4 {
        font-size: 1.25rem;
        margin-bottom: 0.5rem;
    }

    .agent-badges-large {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .verification-checks h4 {
        margin-bottom: 1rem;
    }

    .check-list {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .check-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem;
        border-radius: 8px;
        background: #f8f9fa;
    }

    .check-item.verified {
        background: #e8f5e9;
    }

    .check-item i {
        color: #ccc;
        font-size: 1.1rem;
    }

    .check-item.verified i {
        color: var(--secondary);
    }

    .check-item span {
        flex: 1;
        font-weight: 500;
    }

    .check-date {
        font-size: 0.8rem;
        color: var(--gray);
        font-weight: 400 !important;
    }

    .verification-note {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        margin-top: 1.5rem;
        padding: 1rem;
        background: #e3f2fd;
        border-radius: 8px;
    }

    .verification-note i {
        color: var(--primary);
        margin-top: 2px;
    }

    .verification-note p {
        font-size: 0.9rem;
        color: #1565c0;
        margin: 0;
    }

    /* Property trust badges */
    .property-trust-badges {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 0.75rem;
    }

    .trust-badge {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        font-size: 0.75rem;
        color: var(--gray);
    }

    .trust-badge i {
        color: var(--secondary);
    }

    /* Agent card enhanced */
    .agent-card-enhanced {
        position: relative;
    }

    .agent-card-premium {
        border: 2px solid #FFD700;
        position: relative;
        overflow: hidden;
    }

    .agent-card-premium::before {
        content: 'PREMIUM';
        position: absolute;
        top: 10px;
        right: -30px;
        background: #FFD700;
        color: #000;
        padding: 2px 40px;
        font-size: 10px;
        font-weight: 700;
        transform: rotate(45deg);
    }
`;

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VerificationSystem;
}
