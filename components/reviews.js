// Reviews & Ratings System for 9jaAgentsConnect
// Inspired by 9jaconnet professional review features

const ReviewsSystem = {
    // Sample reviews data
    sampleReviews: [
        {
            id: 1,
            propertyId: 1,
            author: "Oluwaseun Adeleke",
            avatar: "https://randomuser.me/api/portraits/men/12.jpg",
            rating: 5,
            date: "2026-04-15",
            text: "John was incredibly professional! Found our dream home in Lekki within 2 weeks. Highly recommended!",
            verified: true,
            helpful: 24
        },
        {
            id: 2,
            propertyId: 1,
            author: "Amara Nwosu",
            avatar: "https://randomuser.me/api/portraits/women/33.jpg",
            rating: 5,
            date: "2026-03-22",
            text: "Smooth transaction from start to finish. John knows the Lekki market very well.",
            verified: true,
            helpful: 18
        },
        {
            id: 3,
            propertyId: 3,
            author: "Emeka Okonkwo",
            avatar: "https://randomuser.me/api/portraits/men/56.jpg",
            rating: 4,
            date: "2026-05-01",
            text: "Good experience overall. Property was exactly as described.",
            verified: true,
            helpful: 12
        },
        {
            id: 4,
            propertyId: 2,
            author: "Fatima Bello",
            avatar: "https://randomuser.me/api/portraits/women/67.jpg",
            rating: 5,
            date: "2026-04-28",
            text: "Sarah is the best agent in Abuja! Patient and very knowledgeable.",
            verified: true,
            helpful: 31
        }
    ],

    // Calculate average rating
    calculateAverage(reviews) {
        if (!reviews || reviews.length === 0) return 0;
        const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
        return (sum / reviews.length).toFixed(1);
    },

    // Generate star rating HTML
    generateStars(rating, size = 'md') {
        const sizes = { sm: '12px', md: '16px', lg: '20px' };
        const sizePx = sizes[size] || sizes.md;
        let html = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) {
                html += `<i class="fas fa-star" style="color: #ffc107; font-size: ${sizePx};"></i>`;
            } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
                html += `<i class="fas fa-star-half-alt" style="color: #ffc107; font-size: ${sizePx};"></i>`;
            } else {
                html += `<i class="far fa-star" style="color: #ddd; font-size: ${sizePx};"></i>`;
            }
        }
        return html;
    },

    // Create review card HTML
    createReviewCard(review) {
        const verifiedBadge = review.verified 
            ? `<span class="review-verified"><i class="fas fa-check-circle"></i> Verified</span>` 
            : '';
        
        return `
            <div class="review-card" data-review-id="${review.id}">
                <div class="review-header">
                    <img src="${review.avatar}" alt="${review.author}" class="review-avatar">
                    <div class="review-meta">
                        <div class="review-author">${review.author}</div>
                        <div class="review-rating">${this.generateStars(review.rating)}</div>
                    </div>
                    <div class="review-date">${this.formatDate(review.date)}</div>
                </div>
                <div class="review-content">
                    <p>${review.text}</p>
                    ${verifiedBadge}
                </div>
                <div class="review-footer">
                    <button class="review-helpful-btn" onclick="ReviewsSystem.markHelpful(${review.id})">
                        <i class="far fa-thumbs-up"></i> Helpful (${review.helpful})
                    </button>
                </div>
            </div>
        `;
    },

    // Get reviews for property
    getPropertyReviews(propertyId) {
        return this.sampleReviews.filter(r => r.propertyId === propertyId);
    },

    // Render reviews section
    renderReviewsSection(propertyId) {
        const reviews = this.getPropertyReviews(propertyId);
        const avgRating = this.calculateAverage(reviews);
        const ratingCounts = this.getRatingDistribution(reviews);
        
        return `
            <div class="reviews-section">
                <div class="reviews-header">
                    <h3>Reviews & Ratings</h3>
                    <div class="reviews-summary">
                        <div class="rating-score">
                            <span class="rating-number">${avgRating}</span>
                            <div class="rating-stars">${this.generateStars(avgRating, 'lg')}</div>
                            <span class="rating-count">${reviews.length} reviews</span>
                        </div>
                        <div class="rating-bars">
                            ${[5,4,3,2,1].map(star => `
                                <div class="rating-bar-row">
                                    <span>${star} star</span>
                                    <div class="rating-bar">
                                        <div class="rating-bar-fill" style="width: ${ratingCounts[star] || 0}%"></div>
                                    </div>
                                    <span>${ratingCounts[star] || 0}%</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                <div class="reviews-list">
                    ${reviews.length > 0 
                        ? reviews.map(r => this.createReviewCard(r)).join('') 
                        : '<p class="no-reviews">No reviews yet. Be the first to review!</p>'
                    }
                </div>
                <button class="btn btn-outline" onclick="ReviewsSystem.showReviewModal(${propertyId})">
                    <i class="fas fa-pen"></i> Write a Review
                </button>
            </div>
        `;
    },

    // Get rating distribution
    getRatingDistribution(reviews) {
        const counts = {5:0, 4:0, 3:0, 2:0, 1:0};
        reviews.forEach(r => counts[r.rating]++);
        const total = reviews.length;
        if (total === 0) return counts;
        return Object.fromEntries(
            Object.entries(counts).map(([k, v]) => [k, Math.round((v/total)*100)])
        );
    },

    // Format date
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-NG', { year: 'numeric', month: 'short', day: 'numeric' });
    },

    // Mark review as helpful
    markHelpful(reviewId) {
        showToast('Thank you for your feedback!');
        // In real implementation, would update backend
    },

    // Show review modal
    showReviewModal(propertyId) {
        const modalHTML = `
            <div class="modal active" id="reviewModal">
                <div class="modal-content" style="max-width: 500px;">
                    <div class="modal-header">
                        <h3>Write a Review</h3>
                        <button class="modal-close" onclick="closeModal('reviewModal')">&times;</button>
                    </div>
                    <form class="review-form" onsubmit="ReviewsSystem.submitReview(event, ${propertyId})">
                        <div class="form-group">
                            <label>Your Rating</label>
                            <div class="star-rating-input">
                                ${[1,2,3,4,5].map(i => `
                                    <input type="radio" name="rating" id="star${i}" value="${i}">
                                    <label for="star${i}"><i class="far fa-star"></i></label>
                                `).join('')}
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="review-text">Your Review</label>
                            <textarea id="review-text" rows="4" placeholder="Share your experience..." required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="reviewer-name">Your Name</label>
                            <input type="text" id="reviewer-name" placeholder="Enter your name" required>
                        </div>
                        <button type="submit" class="btn btn-primary" style="width: 100%;">
                            Submit Review
                        </button>
                    </form>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    },

    // Submit review
    submitReview(event, propertyId) {
        event.preventDefault();
        showToast('Review submitted successfully!');
        closeModal('reviewModal');
    }
};

// CSS for reviews (add to styles)
const reviewsStyles = `
    .reviews-section {
        margin-top: 3rem;
        padding-top: 2rem;
        border-top: 1px solid #e9ecef;
    }

    .reviews-header {
        margin-bottom: 2rem;
    }

    .reviews-header h3 {
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
    }

    .reviews-summary {
        display: flex;
        gap: 3rem;
        align-items: flex-start;
    }

    .rating-score {
        text-align: center;
    }

    .rating-number {
        font-size: 3rem;
        font-weight: 800;
        color: var(--dark);
        display: block;
        line-height: 1;
    }

    .rating-stars {
        margin: 0.5rem 0;
    }

    .rating-count {
        color: var(--gray);
        font-size: 0.9rem;
    }

    .rating-bars {
        flex: 1;
        max-width: 300px;
    }

    .rating-bar-row {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 0.5rem;
        font-size: 0.85rem;
    }

    .rating-bar {
        flex: 1;
        height: 8px;
        background: #e9ecef;
        border-radius: 4px;
        overflow: hidden;
    }

    .rating-bar-fill {
        height: 100%;
        background: var(--secondary);
        border-radius: 4px;
        transition: width 0.3s;
    }

    .review-card {
        padding: 1.5rem;
        border-bottom: 1px solid #e9ecef;
    }

    .review-card:last-child {
        border-bottom: none;
    }

    .review-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .review-avatar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        object-fit: cover;
    }

    .review-meta {
        flex: 1;
    }

    .review-author {
        font-weight: 600;
        margin-bottom: 0.25rem;
    }

    .review-rating {
        display: flex;
        gap: 2px;
    }

    .review-date {
        color: var(--gray);
        font-size: 0.85rem;
    }

    .review-content p {
        color: var(--gray);
        line-height: 1.6;
        margin-bottom: 0.75rem;
    }

    .review-verified {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        color: var(--secondary);
        font-size: 0.8rem;
        font-weight: 500;
    }

    .review-footer {
        margin-top: 1rem;
    }

    .review-helpful-btn {
        background: none;
        border: none;
        color: var(--gray);
        cursor: pointer;
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: color 0.3s;
    }

    .review-helpful-btn:hover {
        color: var(--primary);
    }

    .no-reviews {
        text-align: center;
        color: var(--gray);
        padding: 2rem;
    }

    /* Star Rating Input */
    .star-rating-input {
        display: flex;
        flex-direction: row-reverse;
        justify-content: flex-end;
        gap: 0.5rem;
    }

    .star-rating-input input {
        display: none;
    }

    .star-rating-input label {
        cursor: pointer;
        font-size: 1.5rem;
        color: #ddd;
        transition: color 0.2s;
    }

    .star-rating-input label:hover,
    .star-rating-input label:hover ~ label,
    .star-rating-input input:checked ~ label {
        color: #ffc107;
    }

    .star-rating-input label:hover i,
    .star-rating-input input:checked ~ label i {
        font-weight: 900;
    }

    .review-form .form-group {
        margin-bottom: 1.5rem;
    }

    .review-form label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
    }

    .review-form textarea,
    .review-form input {
        width: 100%;
        padding: 0.75rem;
        border: 2px solid #e9ecef;
        border-radius: 8px;
        font-family: inherit;
    }

    .review-form textarea:focus,
    .review-form input:focus {
        outline: none;
        border-color: var(--primary);
    }

    @media (max-width: 768px) {
        .reviews-summary {
            flex-direction: column;
            gap: 1.5rem;
        }
    }
`;

// Helper function
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ReviewsSystem;
}
