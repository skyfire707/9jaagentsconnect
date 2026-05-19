// Service Request & Booking System
// Inspired by 9jaconnet's professional hiring workflow

const BookingSystem = {
    // Request types
    requestTypes: [
        { id: 'viewing', label: 'Schedule Viewing', icon: 'fa-calendar', color: '#0066FF' },
        { id: 'info', label: 'Request Information', icon: 'fa-info-circle', color: '#00C853' },
        { id: 'offer', label: 'Make an Offer', icon: 'fa-hand-holding-usd', color: '#FF6B35' },
        { id: 'callback', label: 'Request Callback', icon: 'fa-phone', color: '#9C27B0' }
    ],

    // Show booking options
    showBookingOptions(propertyId, agent) {
        const modalHTML = `
            <div class="modal active" id="bookingModal">
                <div class="modal-content" style="max-width: 450px;">
                    <div class="modal-header">
                        <h3>Contact Agent</h3>
                        <button class="modal-close" onclick="closeModal('bookingModal')">&times;</button>
                    </div>
                    <div class="booking-options">
                        <div class="booking-agent-preview">
                            <img src="${agent.avatar}" alt="${agent.name}" class="booking-agent-avatar">
                            <div>
                                <h4>${agent.name}</h4>
                                <p><i class="fas fa-phone"></i> ${agent.phone}</p>
                            </div>
                        </div>
                        <p class="booking-hint">How would you like to proceed?</p>
                        <div class="booking-buttons">
                            ${this.requestTypes.map(type => `
                                <button class="booking-type-btn" onclick="BookingSystem.showRequestForm('${type.id}', ${propertyId}, '${agent.name}')" style="--btn-color: ${type.color}">
                                    <i class="fas ${type.icon}"></i>
                                    <span>${type.label}</span>
                                    <i class="fas fa-chevron-right arrow"></i>
                                </button>
                            `).join('')}
                        </div>
                        <div class="booking-note">
                            <i class="fas fa-shield-alt"></i>
                            <span>Your information is secure. We verify all agents on our platform.</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    },

    // Show specific request form
    showRequestForm(typeId, propertyId, agentName) {
        closeModal('bookingModal');
        
        const type = this.requestTypes.find(t => t.id === typeId);
        const forms = {
            viewing: this.getViewingForm(propertyId, agentName),
            info: this.getInfoForm(propertyId, agentName),
            offer: this.getOfferForm(propertyId, agentName),
            callback: this.getCallbackForm(propertyId, agentName)
        };
        
        const modalHTML = `
            <div class="modal active" id="requestFormModal">
                <div class="modal-content" style="max-width: 500px;">
                    <div class="modal-header" style="border-left: 4px solid ${type.color};">
                        <h3><i class="fas ${type.icon}" style="color: ${type.color};"></i> ${type.label}</h3>
                        <button class="modal-close" onclick="closeModal('requestFormModal')">&times;</button>
                    </div>
                    <div class="request-form-content">
                        ${forms[typeId]}
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Initialize date picker for viewing
        if (typeId === 'viewing') {
            this.initDatePicker();
        }
    },

    // Viewing form
    getViewingForm(propertyId, agentName) {
        return `
            <form onsubmit="BookingSystem.submitRequest(event, 'viewing')">
                <div class="form-group">
                    <label>Select Date & Time</label>
                    <div class="datetime-picker">
                        <input type="date" id="viewing-date" required min="${new Date().toISOString().split('T')[0]}">
                        <select id="viewing-time" required>
                            <option value="">Select time</option>
                            <option value="09:00">9:00 AM</option>
                            <option value="10:00">10:00 AM</option>
                            <option value="11:00">11:00 AM</option>
                            <option value="12:00">12:00 PM</option>
                            <option value="14:00">2:00 PM</option>
                            <option value="15:00">3:00 PM</option>
                            <option value="16:00">4:00 PM</option>
                            <option value="17:00">5:00 PM</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label for="viewing-name">Your Name</label>
                    <input type="text" id="viewing-name" placeholder="Enter your full name" required>
                </div>
                <div class="form-group">
                    <label for="viewing-phone">Phone Number</label>
                    <input type="tel" id="viewing-phone" placeholder="+234 800 000 0000" required>
                </div>
                <div class="form-group">
                    <label for="viewing-email">Email Address</label>
                    <input type="email" id="viewing-email" placeholder="your@email.com" required>
                </div>
                <div class="form-group">
                    <label for="viewing-message">Message (Optional)</label>
                    <textarea id="viewing-message" rows="3" placeholder="Any specific requirements or questions..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%;">
                    <i class="fas fa-calendar-check"></i> Schedule Viewing
                </button>
                <p class="form-note">
                    <i class="fas fa-clock"></i> ${agentName} typically responds within 1 hour
                </p>
            </form>
        `;
    },

    // Info form
    getInfoForm(propertyId, agentName) {
        return `
            <form onsubmit="BookingSystem.submitRequest(event, 'info')">
                <div class="form-group">
                    <label>What would you like to know?</label>
                    <div class="quick-questions">
                        ${[
                            'Is the price negotiable?',
                            'What are the payment terms?',
                            'Are there any additional fees?',
                            'Can I see more photos?',
                            'Is there a survey report?',
                            'What is the neighborhood like?'
                        ].map(q => `
                            <button type="button" class="quick-question-btn" onclick="document.getElementById('info-question').value = '${q}'">${q}</button>
                        `).join('')}
                    </div>
                </div>
                <div class="form-group">
                    <label for="info-question">Your Question</label>
                    <textarea id="info-question" rows="4" placeholder="Type your question here..." required></textarea>
                </div>
                <div class="form-group">
                    <label for="info-name">Your Name</label>
                    <input type="text" id="info-name" placeholder="Enter your name" required>
                </div>
                <div class="form-group">
                    <label for="info-contact">Phone or Email</label>
                    <input type="text" id="info-contact" placeholder="How should we contact you?" required>
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%;">
                    <i class="fas fa-paper-plane"></i> Send Request
                </button>
                <p class="form-note">
                    <i class="fas fa-reply"></i> Average response time: 45 minutes
                </p>
            </form>
        `;
    },

    // Offer form
    getOfferForm(propertyId, agentName) {
        return `
            <form onsubmit="BookingSystem.submitRequest(event, 'offer')">
                <div class="form-group">
                    <label for="offer-amount">Your Offer Amount (₦)</label>
                    <div class="offer-input-group">
                        <span class="offer-currency">₦</span>
                        <input type="number" id="offer-amount" placeholder="Enter amount" min="1000000" required>
                    </div>
                    <div class="offer-suggestions">
                        <span>Suggested offers:</span>
                        <button type="button" onclick="document.getElementById('offer-amount').value = 400000000">₦400M</button>
                        <button type="button" onclick="document.getElementById('offer-amount').value = 420000000">₦420M</button>
                        <button type="button" onclick="document.getElementById('offer-amount').value = 430000000">₦430M</button>
                    </div>
                </div>
                <div class="form-group">
                    <label>Payment Plan</label>
                    <select id="offer-payment" required>
                        <option value="">Select payment option</option>
                        <option value="cash">Full Cash Payment</option>
                        <option value="mortgage">Mortgage</option>
                        <option value="installment">Installment Plan</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="offer-name">Your Name</label>
                    <input type="text" id="offer-name" placeholder="Enter your full name" required>
                </div>
                <div class="form-group">
                    <label for="offer-phone">Phone Number</label>
                    <input type="tel" id="offer-phone" placeholder="+234 800 000 0000" required>
                </div>
                <div class="form-group">
                    <label for="offer-preapproval">Do you have a pre-approval letter?</label>
                    <select id="offer-preapproval">
                        <option value="no">No, not yet</option>
                        <option value="yes">Yes, I have pre-approval</option>
                        <option value="pending">Application in progress</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="offer-message">Additional Details</label>
                    <textarea id="offer-message" rows="3" placeholder="Any conditions or additional information..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%;">
                    <i class="fas fa-hand-holding-usd"></i> Submit Offer
                </button>
                <p class="form-note">
                    <i class="fas fa-info-circle"></i> Offers are not binding until contracts are signed
                </p>
            </form>
        `;
    },

    // Callback form
    getCallbackForm(propertyId, agentName) {
        return `
            <form onsubmit="BookingSystem.submitRequest(event, 'callback')">
                <div class="form-group">
                    <label>Best Time to Call</label>
                    <div class="time-slots">
                        ${['Morning (9-12)', 'Afternoon (12-4)', 'Evening (4-7)'].map(slot => `
                            <label class="time-slot">
                                <input type="radio" name="callback-time" value="${slot}" required>
                                <span>${slot}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>
                <div class="form-group">
                    <label for="callback-name">Your Name</label>
                    <input type="text" id="callback-name" placeholder="Enter your name" required>
                </div>
                <div class="form-group">
                    <label for="callback-phone">Phone Number</label>
                    <input type="tel" id="callback-phone" placeholder="+234 800 000 0000" required>
                </div>
                <div class="form-group">
                    <label for="callback-topic">What would you like to discuss?</label>
                    <select id="callback-topic" required>
                        <option value="">Select topic</option>
                        <option value="general">General property inquiry</option>
                        <option value="viewing">Schedule a viewing</option>
                        <option value="price">Price negotiation</option>
                        <option value="docs">Documentation requirements</option>
                        <option value="process">Buying process questions</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%;">
                    <i class="fas fa-phone-alt"></i> Request Callback
                </button>
                <p class="form-note">
                    <i class="fas fa-check-circle"></i> ${agentName} will call you at your preferred time
                </p>
            </form>
        `;
    },

    // Submit request
    submitRequest(event, type) {
        event.preventDefault();
        showToast('Request submitted successfully! Agent will contact you shortly.');
        closeModal('requestFormModal');
    },

    // Initialize date picker
    initDatePicker() {
        const dateInput = document.getElementById('viewing-date');
        if (dateInput) {
            const today = new Date();
            const maxDate = new Date();
            maxDate.setDate(today.getDate() + 30);
            dateInput.max = maxDate.toISOString().split('T')[0];
        }
    }
};

// CSS styles for booking
const bookingStyles = `
    /* Booking Modal Styles */
    .booking-options {
        padding: 1.5rem;
    }

    .booking-agent-preview {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background: var(--light);
        border-radius: 12px;
        margin-bottom: 1.5rem;
    }

    .booking-agent-avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        object-fit: cover;
    }

    .booking-agent-preview h4 {
        margin-bottom: 0.25rem;
    }

    .booking-agent-preview p {
        color: var(--gray);
        font-size: 0.9rem;
    }

    .booking-hint {
        text-align: center;
        color: var(--gray);
        margin-bottom: 1rem;
        font-size: 0.95rem;
    }

    .booking-buttons {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .booking-type-btn {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem 1.25rem;
        border: 2px solid #e9ecef;
        border-radius: 12px;
        background: white;
        cursor: pointer;
        transition: all 0.3s;
        text-align: left;
    }

    .booking-type-btn:hover {
        border-color: var(--btn-color);
        background: var(--btn-color) + '10';
    }

    .booking-type-btn i:first-child {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: var(--btn-color) + '15';
        color: var(--btn-color);
        font-size: 1.1rem;
    }

    .booking-type-btn span {
        flex: 1;
        font-weight: 600;
        font-size: 1rem;
    }

    .booking-type-btn .arrow {
        color: var(--gray);
        font-size: 0.9rem;
    }

    .booking-type-btn:hover .arrow {
        color: var(--btn-color);
        transform: translateX(4px);
    }

    .booking-note {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        margin-top: 1.5rem;
        padding: 1rem;
        background: #e8f5e9;
        border-radius: 8px;
        font-size: 0.85rem;
        color: #2e7d32;
    }

    .booking-note i {
        margin-top: 2px;
        color: var(--secondary);
    }

    /* Request Form Styles */
    .request-form-content {
        padding: 1.5rem;
    }

    .request-form-content .form-group {
        margin-bottom: 1.25rem;
    }

    .request-form-content label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: var(--dark);
    }

    .request-form-content input,
    .request-form-content select,
    .request-form-content textarea {
        width: 100%;
        padding: 0.875rem;
        border: 2px solid #e9ecef;
        border-radius: 8px;
        font-size: 1rem;
        transition: border-color 0.3s;
    }

    .request-form-content input:focus,
    .request-form-content select:focus,
    .request-form-content textarea:focus {
        outline: none;
        border-color: var(--primary);
    }

    .datetime-picker {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.75rem;
    }

    .quick-questions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }

    .quick-question-btn {
        padding: 0.5rem 0.75rem;
        border: 1px solid #e9ecef;
        border-radius: 20px;
        background: white;
        font-size: 0.85rem;
        cursor: pointer;
        transition: all 0.2s;
    }

    .quick-question-btn:hover {
        background: var(--primary);
        color: white;
        border-color: var(--primary);
    }

    .offer-input-group {
        position: relative;
    }

    .offer-currency {
        position: absolute;
        left: 1rem;
        top: 50%;
        transform: translateY(-50%);
        font-weight: 600;
        color: var(--gray);
    }

    .offer-input-group input {
        padding-left: 2.5rem;
    }

    .offer-suggestions {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-top: 0.5rem;
        font-size: 0.85rem;
    }

    .offer-suggestions span {
        color: var(--gray);
    }

    .offer-suggestions button {
        padding: 0.25rem 0.75rem;
        border: 1px solid var(--primary);
        border-radius: 4px;
        background: white;
        color: var(--primary);
        font-size: 0.85rem;
        cursor: pointer;
    }

    .offer-suggestions button:hover {
        background: var(--primary);
        color: white;
    }

    .time-slots {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0.75rem;
    }

    .time-slot {
        cursor: pointer;
    }

    .time-slot input {
        display: none;
    }

    .time-slot span {
        display: block;
        padding: 0.75rem;
        text-align: center;
        border: 2px solid #e9ecef;
        border-radius: 8px;
        font-size: 0.85rem;
        transition: all 0.2s;
    }

    .time-slot input:checked + span,
    .time-slot:hover span {
        border-color: var(--primary);
        background: var(--primary) + '10';
        color: var(--primary);
    }

    .form-note {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        margin-top: 1rem;
        padding: 0.75rem;
        background: var(--light);
        border-radius: 8px;
        font-size: 0.85rem;
        color: var(--gray);
    }

    .form-note i {
        color: var(--secondary);
    }
`;

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BookingSystem;
}
