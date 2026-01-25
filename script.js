// Task Masters - Service Marketplace Platform with Persistent Login

console.log('🎯 Task Masters Platform loaded successfully!');

// Complete list of services with subcategories
const servicesList = [
    { name: 'Home Cleaning', keywords: ['cleaning', 'home cleaning', 'house cleaning', 'deep cleaning', 'regular cleaning', 'maintenance cleaning'], category: 'Cleaning' },
    { name: 'Maid Service', keywords: ['maid', 'maid service', 'housekeeping', 'housekeeper', 'domestic help'], category: 'Cleaning' },
    { name: 'Plumbing', keywords: ['plumbing', 'plumber', 'pipe repair', 'leak fixing', 'water repair', 'drainage', 'plumbing service'], category: 'Plumbing' },
    { name: 'Electrical Work', keywords: ['electrical', 'electrician', 'wiring', 'electric repair', 'power', 'electricity'], category: 'Electrical' },
    { name: 'Carpentry', keywords: ['carpentry', 'carpenter', 'wood work', 'furniture', 'woodworking'], category: 'Carpentry' },
    { name: 'Painting', keywords: ['painting', 'painter', 'paint service', 'wall painting', 'house painting'], category: 'Painting' },
    { name: 'Beauty & Salon', keywords: ['beauty', 'salon', 'hair', 'makeup', 'spa', 'beauty service'], category: 'Beauty' },
    { name: 'Makeup Artist', keywords: ['makeup', 'makeup artist', 'bridal makeup', 'party makeup', 'mua'], category: 'Beauty' },
    { name: 'Hairstylist', keywords: ['hairstylist', 'hair stylist', 'haircut', 'hair service', 'hairdresser', 'salon'], category: 'Beauty' },
    { name: 'Barber', keywords: ['barber', 'barber shop', 'mens haircut', 'shave', 'beard trim'], category: 'Beauty' },
    { name: 'Manicure Pedicure', keywords: ['manicure', 'pedicure', 'nails', 'nail art', 'nail service', 'mani pedi'], category: 'Beauty' },
    { name: 'Tutoring', keywords: ['tutoring', 'tutor', 'teaching', 'education', 'lessons', 'academic help', 'home tutor'], category: 'Tutoring' },
    { name: 'Pest Control', keywords: ['pest control', 'exterminator', 'pest removal', 'bug control', 'insects', 'fumigation'], category: 'Pest Control' },
    { name: 'AC Repair', keywords: ['ac repair', 'air conditioning', 'ac service', 'hvac', 'cooling', 'air conditioner'], category: 'AC Repair' },
    { name: 'Babysitting', keywords: ['babysitting', 'babysitter', 'childcare', 'nanny', 'child care', 'kids care'], category: 'Babysitting' },
    { name: 'Moving & Packing', keywords: ['moving', 'packing', 'movers', 'relocation', 'moving service', 'packers'], category: 'Moving' },
    { name: 'Personal Training', keywords: ['personal training', 'fitness', 'gym trainer', 'workout', 'exercise', 'fitness coach'], category: 'Fitness' },
    { name: 'Yoga Instructor', keywords: ['yoga', 'yoga instructor', 'yoga classes', 'yoga teacher', 'meditation'], category: 'Fitness' },
    { name: 'Dog Sitting', keywords: ['dog sitting', 'dog sitter', 'dog care', 'pet sitting dog', 'dog walker'], category: 'Pet Care' },
    { name: 'Cat Sitting', keywords: ['cat sitting', 'cat sitter', 'cat care', 'pet sitting cat'], category: 'Pet Care' },
    { name: 'Pet Grooming', keywords: ['pet grooming', 'dog grooming', 'cat grooming', 'pet bath', 'grooming service'], category: 'Pet Care' },
    { name: 'Massage', keywords: ['massage', 'body massage', 'spa massage', 'relaxation massage', 'therapeutic massage'], category: 'Massage' },
    { name: 'Physiotherapy', keywords: ['physiotherapy', 'physio', 'physical therapy', 'rehabilitation', 'physio therapy'], category: 'Physiotherapy' },
    { name: 'Dietitian', keywords: ['dietitian', 'nutritionist', 'diet plan', 'nutrition', 'meal planning'], category: 'Dietitian' },
    { name: 'Concierge', keywords: ['concierge', 'personal assistant', 'lifestyle management', 'errand service'], category: 'Concierge' },
    { name: 'Personal Chef', keywords: ['personal chef', 'home chef', 'private chef', 'cook', 'cooking service'], category: 'Personal Chef' },
    { name: 'Catering', keywords: ['catering', 'catering service', 'event catering', 'food catering', 'party catering'], category: 'Catering' },
    { name: 'Photographer', keywords: ['phot', 'photo', 'photographer', 'photography', 'photo shoot', 'photo service', 'pictures', 'camera'], category: 'Photographer' },
    { name: 'Videographer', keywords: ['video', 'videographer', 'videography', 'video shoot', 'video service', 'cinematography'], category: 'Videographer' },
    { name: 'Wedding Planner', keywords: ['wedding planner', 'wedding planning', 'wedding organizer', 'marriage planner'], category: 'Wedding Planner' },
    { name: 'Event Planner', keywords: ['event planner', 'event planning', 'party planner', 'event organizer', 'event management'], category: 'Event Planner' },
    { name: 'Wedding Decorator', keywords: ['wedding decorator', 'wedding decoration', 'marriage decoration', 'shaadi decorator'], category: 'Wedding Decorator' },
    { name: 'Event Decorator', keywords: ['event decorator', 'party decorator', 'event decoration', 'party decoration'], category: 'Event Decorator' },
    { name: 'Mehendi Artist', keywords: ['mehendi', 'mehndi', 'henna', 'mehendi artist', 'bridal mehendi', 'henna artist'], category: 'Mehendi Artist' },
    { name: 'Tailor', keywords: ['tailor', 'tailoring', 'stitching', 'alteration', 'clothes stitching', 'dress making'], category: 'Tailor' },
    { name: 'DJ', keywords: ['dj', 'disc jockey', 'music dj', 'party dj', 'wedding dj'], category: 'DJ' },
    { name: 'Dance Teacher', keywords: ['dance teacher', 'dance instructor', 'dance classes', 'dance trainer', 'choreographer'], category: 'Dance Teacher' },
    { name: 'Music Teacher', keywords: ['music teacher', 'music instructor', 'music classes', 'music lessons', 'music tutor'], category: 'Music Teacher' },
    { name: 'Astrologer', keywords: ['astrologer', 'astrology', 'horoscope', 'jyotish', 'kundli', 'zodiac'], category: 'Astrologer' },
    { name: 'Pandit', keywords: ['pandit', 'priest', 'puja', 'pooja', 'hindu priest', 'religious ceremony'], category: 'Pandit' },
    { name: 'Interior Designer', keywords: ['interior designer', 'interior design', 'home design', 'interior decoration', 'space planning'], category: 'Interior Designer' },
    { name: 'Gardener', keywords: ['gardener', 'gardening', 'landscaping', 'lawn care', 'garden maintenance', 'plants'], category: 'Gardener' },
    { name: 'Car Wash', keywords: ['car wash', 'car cleaning', 'vehicle wash', 'auto wash', 'car detailing'], category: 'Car Wash' },
    { name: 'Home Appliance Repair', keywords: ['appliance repair', 'home appliance', 'fridge repair', 'washing machine repair', 'appliance service'], category: 'Home Appliance Repair' },
    { name: 'Tattoo Artist', keywords: ['tattoo', 'tattoo artist', 'tattooing', 'body art', 'ink'], category: 'Tattoo Artist' }
];

// Search suggestion functionality
function showSearchSuggestions(query) {
    const suggestionsDiv = document.getElementById('searchSuggestions');
    if (!suggestionsDiv) {
        console.log('❌ searchSuggestions div not found!');
        return;
    }
    
    if (!query || query.length < 1) {
        suggestionsDiv.style.display = 'none';
        return;
    }
    
    const queryLower = query.toLowerCase();
    console.log('🔍 Searching for:', queryLower);
    
    const matches = servicesList.filter(service => 
        service.keywords.some(keyword => keyword.includes(queryLower))
    );
    
    console.log('✅ Found matches:', matches.length, matches.map(m => m.name));
    
    const limitedMatches = matches.slice(0, 8); // Limit to 8 suggestions
    
    if (limitedMatches.length === 0) {
        suggestionsDiv.style.display = 'none';
        return;
    }
    
    // Create suggestion items
    let html = '';
    limitedMatches.forEach(service => {
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
