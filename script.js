// Global state management
let currentUser = null;
let services = [];

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        currentUser = JSON.parse(loggedInUser);
        updateUIForLoggedInUser();
    }

    // Load services from localStorage
    loadServices();

    // Attach event listeners based on page
    attachEventListeners();
});

function attachEventListeners() {
    // Buyer Login Form
    const buyerLoginForm = document.getElementById('buyerLoginForm');
    if (buyerLoginForm) {
        buyerLoginForm.addEventListener('submit', handleBuyerLogin);
    }

    // Seller Login Form
    const sellerLoginForm = document.getElementById('sellerLoginForm');
    if (sellerLoginForm) {
        sellerLoginForm.addEventListener('submit', handleSellerLogin);
    }

    // Add Service Form
    const addServiceForm = document.getElementById('addServiceForm');
    if (addServiceForm) {
        addServiceForm.addEventListener('submit', handleAddService);
    }

    // Logout buttons
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    // Signup links
    const signupLinks = document.querySelectorAll('#signupLink');
    signupLinks.forEach(link => {
        link.addEventListener('click', handleSignup);
    });

    // Load dashboard data if on dashboard page
    if (document.getElementById('sellerServices')) {
        loadSellerServices();
    }
}

function handleBuyerLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simple validation (in production, this would be server-side)
    if (email && password) {
        const user = {
            email: email,
            type: 'buyer',
            name: email.split('@')[0]
        };
        
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        currentUser = user;
        
        showNotification('Login successful! Redirecting to dashboard...');
        setTimeout(() => {
            window.location.href = 'buyer-dashboard.html';
        }, 1000);
    } else {
        showNotification('Please enter valid credentials', 'error');
    }
}

function handleSellerLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simple validation (in production, this would be server-side)
    if (email && password) {
        const user = {
            email: email,
            type: 'seller',
            name: email.split('@')[0]
        };
        
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        currentUser = user;
        
        showNotification('Login successful! Redirecting to dashboard...');
        setTimeout(() => {
            window.location.href = 'seller-dashboard.html';
        }, 1000);
    } else {
        showNotification('Please enter valid credentials', 'error');
    }
}

function handleSignup(e) {
    e.preventDefault();
    showNotification('Signup functionality will be available soon! For now, use any email and password to login.');
}

function handleAddService(e) {
    e.preventDefault();
    
    const serviceName = document.getElementById('serviceName').value;
    const serviceCategory = document.getElementById('serviceCategory').value;
    const servicePrice = document.getElementById('servicePrice').value;
    const serviceDescription = document.getElementById('serviceDescription').value;

    const newService = {
        id: Date.now(),
        name: serviceName,
        category: serviceCategory,
        price: servicePrice,
        description: serviceDescription,
        provider: currentUser.name,
        providerEmail: currentUser.email,
        createdAt: new Date().toISOString()
    };

    // Save to services array
    services.push(newService);
    saveServices();
    
    // Clear form
    e.target.reset();
    
    // Reload services display
    loadSellerServices();
    
    showNotification('Service added successfully!');
}

function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem('loggedInUser');
    currentUser = null;
    showNotification('Logged out successfully!');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

function loadServices() {
    const savedServices = localStorage.getItem('services');
    if (savedServices) {
        services = JSON.parse(savedServices);
    } else {
        // Initialize with some sample services
        services = [
            {
                id: 1,
                name: "Professional Plumbing",
                category: "plumbing",
                price: 50,
                description: "Expert plumbing repairs, installations, and maintenance. 10+ years of experience.",
                provider: "John",
                providerEmail: "john@example.com"
            },
            {
                id: 2,
                name: "Electrical Services",
                category: "electrical",
                price: 60,
                description: "Licensed electrician providing all electrical services. Safety guaranteed.",
                provider: "Mike",
                providerEmail: "mike@example.com"
            },
            {
                id: 3,
                name: "House Cleaning",
                category: "cleaning",
                price: 40,
                description: "Professional house cleaning with eco-friendly products. Detail-oriented.",
                provider: "Sarah",
                providerEmail: "sarah@example.com"
            }
        ];
        saveServices();
    }
}

function saveServices() {
    localStorage.setItem('services', JSON.stringify(services));
}

function loadSellerServices() {
    const servicesContainer = document.getElementById('sellerServices');
    if (!servicesContainer || !currentUser) return;

    const userServices = services.filter(s => s.providerEmail === currentUser.email);
    
    if (userServices.length === 0) {
        servicesContainer.innerHTML = `
            <div class="service-listing">
                <h4>No services added yet</h4>
                <p>Add your first service to start receiving requests!</p>
            </div>
        `;
        return;
    }

    servicesContainer.innerHTML = userServices.map(service => `
        <div class="service-listing">
            <h4>${service.name}</h4>
            <p>${service.description}</p>
            <div class="service-meta">
                <span class="price">$${service.price}/hr</span>
                <button class="btn btn-secondary" onclick="deleteService(${service.id})" style="padding: 0.5rem 1rem; font-size: 0.9rem;">Delete</button>
            </div>
        </div>
    `).join('');
}

function deleteService(serviceId) {
    if (confirm('Are you sure you want to delete this service?')) {
        services = services.filter(s => s.id !== serviceId);
        saveServices();
        loadSellerServices();
        showNotification('Service deleted successfully!');
    }
}

function contactProvider(providerName) {
    if (!currentUser) {
        showNotification('Please login as a buyer to contact providers!');
        setTimeout(() => {
            window.location.href = 'buyer-login.html';
        }, 1500);
        return;
    }

    showNotification(`Contact request sent to ${providerName}! They will reach out to you soon.`);
}

function updateUIForLoggedInUser() {
    // Update buyer name if on buyer dashboard
    const buyerName = document.getElementById('buyerName');
    if (buyerName && currentUser) {
        buyerName.textContent = currentUser.name;
    }

    // Update seller name if on seller dashboard
    const sellerName = document.getElementById('sellerName');
    if (sellerName && currentUser) {
        sellerName.textContent = currentUser.name;
    }
}

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? 'linear-gradient(135deg, #9370db 0%, #a0424d 100%)' : '#dc3545'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Make functions available globally
window.contactProvider = contactProvider;
window.deleteService = deleteService;
