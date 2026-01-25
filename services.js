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
    'fitness': [],
    'dance': [],
    'dance teacher': [],
    'dog sitting': [],
    'cat sitting': [],
    'pet grooming': [],
    'pet care': [],
    'makeup artist': [],
    'hairstylist': [],
    'hair salon': [],
    'barber': [],
    'massage': [],
    'spa services': [],
    'personal trainer': [],
    'yoga instructor': [],
    'yoga': [],
    'pilates': [],
    'meditation': [],
    'concierge': [],
    'personal chef': [],
    'catering': [],
    'maid service': [],
    'live-in maid': [],
    'part-time maid': [],
    'housekeeping': [],
    'nanny': [],
    'manicure pedicure': [],
    'nail technician': [],
    'dietitian': [],
    'nutritionist': [],
    'physiotherapy': [],
    'photographer': [],
    'photography': [],
    'videographer': [],
    'wedding planner': [],
    'event planner': [],
    'wedding decorator': [],
    'event decorator': [],
    'mehendi': [],
    'tailor': [],
    'dj': [],
    'music teacher': [],
    'astrologer': [],
    'pandit': [],
    'interior designer': [],
    'gardener': [],
    'car wash': [],
    'appliance repair': [],
    'tattoo': []
};

// STEP 1: Get raw search query from URL
const urlParams = new URLSearchParams(window.location.search);
const rawSearchQuery = urlParams.get('service') || 'all';

console.log('🔍 STEP 1 - Raw query from URL:', rawSearchQuery);

// STEP 2: Initialize variables
let finalSearchQuery = rawSearchQuery.toLowerCase();
let userTypedQuery = rawSearchQuery;
let wasAutoCorrected = false;

console.log('📝 STEP 2 - Initial variables set');
console.log('   - finalSearchQuery:', finalSearchQuery);
console.log('   - userTypedQuery:', userTypedQuery);

// STEP 3: Levenshtein distance calculation
function calculateLevenshteinDistance(str1, str2) {
    const len1 = str1.length;
    const len2 = str2.length;
    const matrix = Array(len1 + 1).fill(null).map(() => Array(len2 + 1).fill(0));

    for (let i = 0; i <= len1; i++) matrix[i][0] = i;
    for (let j = 0; j <= len2; j++) matrix[0][j] = j;

    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1,
                matrix[i][j - 1] + 1,
                matrix[i - 1][j - 1] + cost
            );
        }
    }
    return matrix[len1][len2];
}

// STEP 4: Calculate similarity percentage
function calculateSimilarityPercentage(str1, str2) {
    const distance = calculateLevenshteinDistance(str1.toLowerCase(), str2.toLowerCase());
    const maxLen = Math.max(str1.length, str2.length);
    const similarityPercent = ((maxLen - distance) / maxLen) * 100;
    return Math.round(similarityPercent);
}

// STEP 5: Find best matching service
function findBestServiceMatch(userQuery) {
    if (!userQuery || userQuery === 'all') {
        return { found: false, match: null, similarity: 0 };
    }

    const allServices = Object.keys(providerDatabase);
    let bestMatch = null;
    let bestSimilarity = 0;

    console.log('🔎 STEP 5 - Searching for best match...');
    console.log('   - User query:', userQuery);
    console.log('   - Available services:', allServices.length);

    for (let service of allServices) {
        let similarity = calculateSimilarityPercentage(userQuery, service);
        
        // BOOST: Check if user query is contained within service name (substring match)
        if (service.includes(userQuery)) {
            const containsBonus = 20; // Give 20% bonus for substring matches
            similarity = Math.min(100, similarity + containsBonus);
            console.log(`   - "${service}" contains "${userQuery}" → boosted to ${similarity}%`);
        }
        
        // BOOST: Check if service starts with user query (prefix match)
        if (service.startsWith(userQuery)) {
            const prefixBonus = 30; // Give 30% bonus for prefix matches
            similarity = Math.min(100, similarity + prefixBonus);
            console.log(`   - "${service}" starts with "${userQuery}" → boosted to ${similarity}%`);
        }
        
        if (similarity > bestSimilarity) {
            bestSimilarity = similarity;
            bestMatch = service;
        }
    }

    console.log('   - Best match found:', bestMatch);
    console.log('   - Similarity:', bestSimilarity + '%');

    // Return match only if similarity >= 40%
    if (bestSimilarity >= 40) {
        return { found: true, match: bestMatch, similarity: bestSimilarity };
    }
    
    return { found: false, match: null, similarity: bestSimilarity };
}

// STEP 6: Apply autocorrect if needed
console.log('🔧 STEP 6 - Checking if autocorrect needed...');

if (finalSearchQuery !== 'all') {
    // Check if exact match exists in database
    const exactMatchExists = providerDatabase.hasOwnProperty(finalSearchQuery);
    
    console.log('   - Exact match exists?', exactMatchExists);
    
    if (!exactMatchExists) {
        // Try to find a close match
        const matchResult = findBestServiceMatch(finalSearchQuery);
        
        if (matchResult.found && matchResult.match !== finalSearchQuery) {
            console.log('✨ STEP 6 - AUTOCORRECT APPLIED!');
            console.log('   - Original:', finalSearchQuery);
            console.log('   - Corrected to:', matchResult.match);
            console.log('   - Similarity:', matchResult.similarity + '%');
            
            userTypedQuery = finalSearchQuery;
            finalSearchQuery = matchResult.match;
            wasAutoCorrected = true;
        } else if (!matchResult.found) {
            console.log('❌ STEP 6 - No match found (below 40% threshold)');
        } else {
            console.log('✅ STEP 6 - Query is close enough to existing service');
        }
    } else {
        console.log('✅ STEP 6 - Exact match found, no autocorrect needed');
    }
}

console.log('📊 FINAL STATE:');
console.log('   - finalSearchQuery:', finalSearchQuery);
console.log('   - userTypedQuery:', userTypedQuery);
console.log('   - wasAutoCorrected:', wasAutoCorrected);

// Load page
window.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Page loaded, calling loadServiceProviders()');
    loadServiceProviders();
});

function loadServiceProviders() {
    console.log('📄 loadServiceProviders() called');
    console.log('   - finalSearchQuery:', finalSearchQuery);
    console.log('   - wasAutoCorrected:', wasAutoCorrected);
    
    const serviceTitle = document.getElementById('serviceTitle');
    const serviceDescription = document.getElementById('serviceDescription');
    const providersList = document.getElementById('providersList');
    
    // Format service name for display
    const formattedService = finalSearchQuery.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    
    console.log('   - formattedService:', formattedService);
    
    // Update title and description
    serviceTitle.textContent = finalSearchQuery === 'all' ? 'All Services' : `${formattedService} Providers`;
    serviceDescription.textContent = `Find the best ${formattedService.toLowerCase()} professionals near you`;
    
    console.log('   - Title updated:', serviceTitle.textContent);
    
    // SHOW AUTOCORRECT BANNER IF NEEDED
    if (wasAutoCorrected) {
        console.log('✨ Showing autocorrect banner');
        
        const banner = document.createElement('div');
        banner.style.cssText = 'background: #f8f9fa; border-left: 4px solid #4A90E2; padding: 16px 20px; margin-bottom: 24px; border-radius: 4px; font-size: 14px;';
        banner.innerHTML = `
            <div style="color: #5f6368; line-height: 1.6;">
                Showing results for <strong style="color: #202124;">${finalSearchQuery}</strong> instead of <strong style="color: #202124;">${userTypedQuery}</strong>
            </div>
            <div style="margin-top: 8px;">
                <span style="color: #5f6368;">Did you mean: </span>
                <a href="services.html?service=${encodeURIComponent(userTypedQuery)}" 
                   style="color: #1a73e8; text-decoration: none; font-size: 14px; font-style: italic;"
                   onmouseover="this.style.textDecoration='underline'"
                   onmouseout="this.style.textDecoration='none'">
                    ${userTypedQuery}
                </a>
            </div>
        `;
        const container = providersList.parentElement;
        container.insertBefore(banner, providersList);
        
        console.log('   - Banner inserted');
    }
    
    // SHOW LOCATION INFO
    const userLocation = LocationService.getLocation();
    if (userLocation) {
        const locationBanner = document.createElement('div');
        locationBanner.style.cssText = 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 20px; margin-bottom: 20px; border-radius: 8px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;';
        locationBanner.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 24px;">📍</span>
                <span style="font-weight: 600;">Showing providers near: ${LocationService.formatLocation(userLocation)}</span>
            </div>
            <button onclick="changeLocation()" style="background: rgba(255,255,255,0.2); border: none; color: white; padding: 8px 16px; border-radius: 20px; cursor: pointer; font-weight: 600; font-size: 14px;">
                Change Location
            </button>
        `;
        const container = providersList.parentElement;
        container.insertBefore(locationBanner, providersList);
    }
    
    // Get providers for this service
    let providers = [];
    if (finalSearchQuery === 'all') {
        // Show all providers
        Object.values(providerDatabase).forEach(categoryProviders => {
            providers = providers.concat(categoryProviders);
        });
    } else {
        // Get providers for specific service
        providers = providerDatabase[finalSearchQuery] || [];
    }
    
    console.log('   - Providers found:', providers.length);
    
    // FILTER BY LOCATION if user has location set
    if (userLocation && providers.length > 0) {
        console.log('📍 Filtering providers by location...');
        providers = LocationService.filterProvidersByLocation(providers, 50); // 50km radius
        console.log('   - After location filter:', providers.length, 'providers');
    }
    
    // Check if query doesn't match anything (below 40% threshold) AND wasn't autocorrected
    const matchResult = findBestServiceMatch(finalSearchQuery);
    if (finalSearchQuery !== 'all' && !providerDatabase[finalSearchQuery] && !wasAutoCorrected && !matchResult.found) {
        console.log('❌ No match found - showing no results page');
        
        providersList.innerHTML = `
            <div class="no-providers" style="text-align: center; padding: 60px 20px;">
                <div style="font-size: 64px; margin-bottom: 20px;">🔍</div>
                <h2 style="color: #202124; font-size: 24px; margin-bottom: 12px;">No results found for "${userTypedQuery}"</h2>
                <p style="color: #5f6368; font-size: 16px; margin-bottom: 24px;">
                    Try using different keywords or check your spelling.
                </p>
                <div style="margin-top: 20px;">
                    <p style="color: #5f6368; font-size: 14px; margin-bottom: 16px;">Search suggestions:</p>
                    <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                        ${Object.keys(providerDatabase).slice(0, 6).map(service => 
                            `<a href="services.html?service=${encodeURIComponent(service)}" 
                                style="padding: 8px 16px; background: #f1f3f4; color: #1a73e8; border-radius: 20px; text-decoration: none; font-size: 14px;"
                                onmouseover="this.style.background='#e8eaed'"
                                onmouseout="this.style.background='#f1f3f4'">
                                ${service}
                            </a>`
                        ).join('')}
                    </div>
                </div>
                <a href="index.html" style="display: inline-block; margin-top: 30px; padding: 12px 24px; background: #4A90E2; color: white; border-radius: 8px; text-decoration: none; font-weight: 500;"
                   onmouseover="this.style.background='#357ABD'"
                   onmouseout="this.style.background='#4A90E2'">
                    ← Back to Home
                </a>
            </div>
        `;
        return;
    }
    
    // Render providers
    if (providers.length === 0) {
        console.log('📭 No providers available for this service');
        
        providersList.innerHTML = `
            <div class="no-providers" style="text-align: center; padding: 60px 20px;">
                <div style="font-size: 64px; margin-bottom: 20px;">🔍</div>
                <h2 style="color: #202124; font-size: 24px; margin-bottom: 12px;">No ${formattedService} Providers Available Yet</h2>
                <p style="color: #5f6368; font-size: 16px; margin-bottom: 24px;">
                    We're working on adding more ${formattedService.toLowerCase()} professionals in your area.
                </p>
                <p style="color: #5f6368; font-size: 14px;">Check back soon or try searching for a different service!</p>
                <a href="index.html" style="display: inline-block; margin-top: 30px; padding: 12px 24px; background: #4A90E2; color: white; border-radius: 8px; text-decoration: none; font-weight: 500;"
                   onmouseover="this.style.background='#357ABD'"
                   onmouseout="this.style.background='#4A90E2'">
                    ← Back to Home
                </a>
            </div>
        `;
    } else {
        console.log('✅ Rendering', providers.length, 'providers');
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
                    ${provider.distance ? `<p class="provider-distance" style="color: #667eea; font-weight: 600; font-size: 14px;">📍 ${provider.distance} km away</p>` : ''}
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
