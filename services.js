// Services page functionality

// Provider database - will be populated as providers register
const providerDatabase = {
    'cleaning': [],
    'plumbing': [],
    'electrical': [],
    'carpentry': [],
    'painting': [],
    'beauty': [],
    'tutoring': [],
    'pest control': [],
    'ac repair': [],
    'babysitting': [],
    'moving': [],
    'fitness': []
};

// Get service type from URL
const urlParams = new URLSearchParams(window.location.search);
const serviceType = urlParams.get('service') || 'all';

// Load page
window.addEventListener('DOMContentLoaded', () => {
    loadServiceProviders();
});

function loadServiceProviders() {
    const serviceTitle = document.getElementById('serviceTitle');
    const serviceDescription = document.getElementById('serviceDescription');
    const providersList = document.getElementById('providersList');
    
    // Update title
    const formattedService = serviceType.charAt(0).toUpperCase() + serviceType.slice(1);
    serviceTitle.textContent = formattedService === 'All' ? 'All Services' : `${formattedService} Providers`;
    serviceDescription.textContent = `Find the best ${formattedService.toLowerCase()} professionals near you`;
    
    // Get providers for this service
    let providers = [];
    if (serviceType === 'all' || !providerDatabase[serviceType.toLowerCase()]) {
        // Show all providers from all categories
        Object.values(providerDatabase).forEach(categoryProviders => {
            providers = providers.concat(categoryProviders);
        });
    } else {
        providers = providerDatabase[serviceType.toLowerCase()] || [];
    }
    
    // Render providers
    if (providers.length === 0) {
        providersList.innerHTML = `
            <div class="no-providers">
                <div class="empty-icon">🔍</div>
                <h2>No providers found</h2>
                <p>We're working on adding more ${formattedService.toLowerCase()} professionals in your area.</p>
                <p>Check back soon or try searching for a different service!</p>
                <a href="index.html" class="btn-back">← Back to Home</a>
            </div>
        `;
    } else {
        providersList.innerHTML = providers.map(provider => `
            <div class="provider-card">
                <div class="provider-avatar">${provider.image}</div>
                <div class="provider-info">
                    <div class="provider-header">
                        <h3>${provider.name}</h3>
                        ${provider.verified ? '<span class="verified-badge">✓ Verified</span>' : ''}
                    </div>
                    <div class="provider-rating">
                        <span class="rating">⭐ ${provider.rating}</span>
                        <span class="reviews">(${provider.reviews} reviews)</span>
                    </div>
                    <p class="provider-experience">📅 ${provider.experience} years experience</p>
                    <div class="provider-footer">
                        <div class="provider-price">
                            <span class="price-label">Starting at</span>
                            <span class="price-amount">$${provider.price}</span>
                        </div>
                        <button class="btn-book ${!provider.available ? 'disabled' : ''}" 
                                onclick="bookProvider('${provider.name}')"
                                ${!provider.available ? 'disabled' : ''}>
                            ${provider.available ? 'Book Now' : 'Not Available'}
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function bookProvider(name) {
    // Redirect to customer dashboard or booking page
    window.location.href = 'customer-dashboard.html';
}

function applyFilters() {
    // Filter logic would go here
    console.log('Filters applied');
}

function clearFilters() {
    // Uncheck all checkboxes
    document.querySelectorAll('.filter-group input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    console.log('Filters cleared');
}

// Customer login modal
function showCustomerLogin() {
    document.getElementById('loginModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('loginModal').style.display = 'none';
}

function showSignup() {
    closeModal();
    window.location.href = 'customer-dashboard.html';
}

function handleCustomerLogin(event) {
    event.preventDefault();
    window.location.href = 'customer-dashboard.html';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('loginModal');
    if (modal && event.target === modal) {
        closeModal();
    }
}
