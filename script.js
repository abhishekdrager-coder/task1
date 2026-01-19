// Task Masters - Service Marketplace Platform with Persistent Login

console.log('🎯 Task Masters Platform loaded successfully!');

// Complete list of services with subcategories
const servicesList = [
    { name: 'Home Cleaning', keywords: ['cleaning', 'home cleaning', 'house cleaning', 'deep cleaning', 'regular cleaning', 'maintenance cleaning', 'maid service'], category: 'Cleaning' },
    { name: 'Deep Cleaning', keywords: ['deep cleaning', 'thorough cleaning', 'intensive cleaning', 'detailed cleaning'], category: 'Cleaning' },
    { name: 'Regular House Cleaning', keywords: ['regular cleaning', 'house cleaning', 'routine cleaning', 'weekly cleaning'], category: 'Cleaning' },
    { name: 'Plumbing', keywords: ['plumbing', 'plumber', 'pipe repair', 'leak fixing', 'water repair', 'drainage', 'plumbing service'], category: 'Plumbing' },
    { name: 'Pipe Repair', keywords: ['pipe repair', 'pipe fixing', 'broken pipe', 'leaking pipe'], category: 'Plumbing' },
    { name: 'Drain Cleaning', keywords: ['drain cleaning', 'clogged drain', 'blocked drain', 'drainage'], category: 'Plumbing' },
    { name: 'Electrical Work', keywords: ['electrical', 'electrician', 'wiring', 'electric repair', 'power', 'electricity'], category: 'Electrical' },
    { name: 'Wiring Installation', keywords: ['wiring', 'electrical wiring', 'wire installation', 'rewiring'], category: 'Electrical' },
    { name: 'Light Fixtures', keywords: ['light fixtures', 'lighting', 'lights', 'light installation', 'fixture repair'], category: 'Electrical' },
    { name: 'Carpentry', keywords: ['carpentry', 'carpenter', 'wood work', 'furniture', 'woodworking'], category: 'Carpentry' },
    { name: 'Furniture Assembly', keywords: ['furniture assembly', 'furniture installation', 'assemble furniture', 'ikea assembly'], category: 'Carpentry' },
    { name: 'Furniture Repair', keywords: ['furniture repair', 'fix furniture', 'furniture fixing', 'repair wood'], category: 'Carpentry' },
    { name: 'Painting', keywords: ['painting', 'painter', 'paint service', 'wall painting', 'house painting'], category: 'Painting' },
    { name: 'Interior Painting', keywords: ['interior painting', 'indoor painting', 'room painting', 'wall paint'], category: 'Painting' },
    { name: 'Exterior Painting', keywords: ['exterior painting', 'outdoor painting', 'house exterior', 'outside painting'], category: 'Painting' },
    { name: 'Beauty & Salon', keywords: ['beauty', 'salon', 'hair', 'makeup', 'spa', 'beauty service', 'hair salon'], category: 'Beauty' },
    { name: 'Hair Styling', keywords: ['hair styling', 'haircut', 'hair service', 'hairdresser', 'hair salon'], category: 'Beauty' },
    { name: 'Makeup Service', keywords: ['makeup', 'makeup artist', 'bridal makeup', 'party makeup'], category: 'Beauty' },
    { name: 'Spa Services', keywords: ['spa', 'massage', 'facial', 'spa service', 'relaxation'], category: 'Beauty' },
    { name: 'Tutoring', keywords: ['tutoring', 'tutor', 'teaching', 'education', 'lessons', 'academic help'], category: 'Tutoring' },
    { name: 'Math Tutoring', keywords: ['math tutoring', 'mathematics', 'math help', 'math teacher'], category: 'Tutoring' },
    { name: 'English Tutoring', keywords: ['english tutoring', 'english teacher', 'language tutoring'], category: 'Tutoring' },
    { name: 'Science Tutoring', keywords: ['science tutoring', 'science help', 'physics', 'chemistry', 'biology'], category: 'Tutoring' },
    { name: 'Pest Control', keywords: ['pest control', 'exterminator', 'pest removal', 'bug control', 'insects'], category: 'Pest' },
    { name: 'Termite Control', keywords: ['termite', 'termite control', 'termite treatment'], category: 'Pest' },
    { name: 'AC Repair', keywords: ['ac repair', 'air conditioning', 'ac service', 'hvac', 'cooling', 'air conditioner'], category: 'AC' },
    { name: 'AC Installation', keywords: ['ac installation', 'install air conditioner', 'new ac', 'ac setup'], category: 'AC' },
    { name: 'AC Maintenance', keywords: ['ac maintenance', 'ac servicing', 'ac cleaning', 'ac checkup'], category: 'AC' },
    { name: 'Babysitting', keywords: ['babysitting', 'babysitter', 'childcare', 'nanny', 'child care'], category: 'Babysitting' },
    { name: 'Moving & Packing', keywords: ['moving', 'packing', 'movers', 'relocation', 'moving service', 'packers'], category: 'Moving' },
    { name: 'Packing Services', keywords: ['packing', 'packing service', 'pack items', 'packing help'], category: 'Moving' },
    { name: 'Personal Training', keywords: ['personal training', 'fitness', 'gym trainer', 'workout', 'exercise', 'fitness coach'], category: 'Fitness' },
    { name: 'Yoga Classes', keywords: ['yoga', 'yoga classes', 'yoga instructor', 'meditation'], category: 'Fitness' },
    { name: 'Lawn Mowing', keywords: ['lawn mowing', 'lawn care', 'grass cutting', 'lawn service', 'gardening'], category: 'Gardening' },
    { name: 'Gardening', keywords: ['gardening', 'garden maintenance', 'landscaping', 'plants'], category: 'Gardening' }
];

// Search suggestion functionality
function showSearchSuggestions(query) {
    const suggestionsDiv = document.getElementById('searchSuggestions');
    if (!suggestionsDiv) return;
    
    if (!query || query.length < 1) {
        suggestionsDiv.style.display = 'none';
        return;
    }
    
    const queryLower = query.toLowerCase();
    const matches = servicesList.filter(service => 
        service.keywords.some(keyword => keyword.includes(queryLower))
    ).slice(0, 8); // Limit to 8 suggestions
    
    if (matches.length === 0) {
        suggestionsDiv.style.display = 'none';
        return;
    }
    
    // Create suggestion items
    let html = '';
    matches.forEach(service => {
        html += `
            <div class="suggestion-item" onclick="selectSuggestion('${service.name.replace(/'/g, "\\'")}')"
                 style="padding: 15px 20px; cursor: pointer; border-bottom: 1px solid #f0f0f0; display: flex; align-items: center; gap: 12px; transition: background 0.2s;"
                 onmouseover="this.style.background='#f8f9fa'"
                 onmouseout="this.style.background='white'">
                <span style="font-size: 20px;">🔍</span>
                <div>
                    <div style="font-weight: 600; color: #2c3e50; font-size: 15px;">${service.name}</div>
                    <div style="font-size: 13px; color: #6c757d; margin-top: 2px;">in ${service.category}</div>
                </div>
            </div>
        `;
    });
    
    suggestionsDiv.innerHTML = html;
    suggestionsDiv.style.display = 'block';
}

function selectSuggestion(serviceName) {
    const searchInput = document.getElementById('serviceSearch');
    if (searchInput) {
        searchInput.value = serviceName;
    }
    
    // Hide suggestions
    const suggestionsDiv = document.getElementById('searchSuggestions');
    if (suggestionsDiv) {
        suggestionsDiv.style.display = 'none';
    }
    
    // Navigate to service
    window.location.href = `services.html?service=${encodeURIComponent(serviceName.toLowerCase())}`;
}

// Authentication Helper Functions
const Auth = {
    // Check if user is logged in
    isLoggedIn: function(userType) {
        // Check localStorage first (remember me)
        const rememberedUser = localStorage.getItem(`${userType}Auth`);
        if (rememberedUser) {
            return JSON.parse(rememberedUser);
        }
        // Check sessionStorage (current session only)
        const sessionUser = sessionStorage.getItem(`${userType}Auth`);
        if (sessionUser) {
            return JSON.parse(sessionUser);
        }
        return null;
    },
    
    // Save login state
    login: function(userType, userData, rememberMe) {
        const authData = {
            userType: userType,
            email: userData.email,
            timestamp: new Date().toISOString()
        };
        
        if (rememberMe) {
            // Save to localStorage (persists after browser close)
            localStorage.setItem(`${userType}Auth`, JSON.stringify(authData));
        } else {
            // Save to sessionStorage (cleared when browser closes)
            sessionStorage.setItem(`${userType}Auth`, JSON.stringify(authData));
        }
    },
    
    // Logout user
    logout: function(userType) {
        localStorage.removeItem(`${userType}Auth`);
        sessionStorage.removeItem(`${userType}Auth`);
        window.location.href = 'index.html';
    },
    
    // Check and redirect if already logged in
    checkAuthAndRedirect: function() {
        // Removed auto-redirect - users can visit home page while logged in
        // They will see "My Dashboard" link instead of login button
    }
};

// Add Enter key listener for search input and check auth on page load
window.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('serviceSearch');
    if (searchInput) {
        // Add input listener for autocomplete
        searchInput.addEventListener('input', (e) => {
            showSearchSuggestions(e.target.value);
        });
        
        // Add keypress listener for Enter key
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchService();
            }
        });
        
        // Add focus listener to show suggestions
        searchInput.addEventListener('focus', (e) => {
            if (e.target.value.length > 0) {
                showSearchSuggestions(e.target.value);
            }
        });
    }
    
    // Hide suggestions when clicking outside
    document.addEventListener('click', (e) => {
        const searchInput = document.getElementById('serviceSearch');
        const suggestionsDiv = document.getElementById('searchSuggestions');
        if (suggestionsDiv && searchInput && !searchInput.contains(e.target) && !suggestionsDiv.contains(e.target)) {
            suggestionsDiv.style.display = 'none';
        }
    });
    
    // Ensure modal is hidden on page load
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'none';
    }
});

// Search service functionality
function searchService() {
    const searchInput = document.getElementById('serviceSearch');
    const query = searchInput.value.trim();
    
    // Navigate to services page with the search query
    if (query === '') {
        // Show all services if no query
        window.location.href = 'services.html?service=all';
    } else {
        // Navigate with the search term
        window.location.href = `services.html?service=${encodeURIComponent(query.toLowerCase())}`;
    }
}

// Select service card
function selectService(serviceName) {
    // Navigate directly to services page with the selected category
    window.location.href = `services.html?service=${encodeURIComponent(serviceName.toLowerCase())}`;
}

// Customer login modal
function showCustomerLogin() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeModal() {
    document.getElementById('loginModal').style.display = 'none';
}

function showSignup() {
    closeModal();
    // In production, this would open a registration modal
    const rememberMe = document.getElementById('customerRememberMe')?.checked || false;
    Auth.login('customer', { email: 'new-user@example.com' }, rememberMe);
    window.location.href = 'customer-dashboard.html';
}

function handleCustomerLogin(event) {
    event.preventDefault();
    const email = document.getElementById('customerEmail')?.value;
    const rememberMe = document.getElementById('customerRememberMe')?.checked || false;
    
    // Save login state
    Auth.login('customer', { email: email }, rememberMe);
    
    window.location.href = 'customer-dashboard.html';
}

// Provider login/register
function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));
    
    if (tabName === 'login') {
        tabs[0].classList.add('active');
        document.getElementById('loginTab').classList.add('active');
    } else {
        tabs[1].classList.add('active');
        document.getElementById('registerTab').classList.add('active');
    }
}

function handleProviderLogin(event) {
    event.preventDefault();
    const email = document.getElementById('providerEmail')?.value;
    const rememberMe = document.getElementById('providerRememberMe')?.checked || false;
    
    // Save login state
    Auth.login('provider', { email: email }, rememberMe);
    
    window.location.href = 'provider.html';
}

function handleProviderRegister(event) {
    event.preventDefault();
    const email = document.querySelector('#registerTab input[type="email"]')?.value;
    const rememberMe = true; // Auto-remember new registrations
    
    // Save login state
    Auth.login('provider', { email: email }, rememberMe);
    
    window.location.href = 'provider.html';
}

// Logout function (to be called from logout buttons)
function handleLogout(userType) {
    Auth.logout(userType);
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('loginModal');
    if (modal && event.target === modal) {
        closeModal();
    }
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
