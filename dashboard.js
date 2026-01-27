// Dashboard functionality

// Load saved data on page load
window.addEventListener('DOMContentLoaded', function() {
    loadProfileData();
    loadBookingStatus();
    updateOverviewInfo();
    loadProfileAvatar();
    initializeDragAndDrop();
});

// Settings tabs navigation
function showSettingsTab(tabId, event) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.settings-tab-content');
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.settings-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Show selected tab content
    const selectedContent = document.getElementById(tabId);
    if (selectedContent) {
        selectedContent.classList.add('active');
    }
    
    // Add active class to clicked tab
    if (event) {
        const selectedTab = event.currentTarget;
        if (selectedTab) {
            selectedTab.classList.add('active');
        }
    }
}

// Avatar upload functions
function showAvatarOptions() {
    console.log('showAvatarOptions called');
    const modal = document.getElementById('avatarModal');
    if (modal) {
        modal.style.display = 'flex';
        console.log('Avatar modal opened');
    } else {
        alert('Error: Avatar modal not found in the page. Please refresh the page.');
    }
}

function closeAvatarModal() {
    const modal = document.getElementById('avatarModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function selectFromGallery() {
    document.getElementById('avatarFileInput').click();
}

function takePhoto() {
    document.getElementById('avatarCameraInput').click();
}

function handleAvatarUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
    }
    
    // Read and convert to base64
    const reader = new FileReader();
    reader.onload = function(e) {
        const imageData = e.target.result;
        
        // Save to localStorage
        localStorage.setItem('profileAvatar', imageData);
        
        // Update display
        updateAvatarDisplay(imageData);
        
        // Close modal
        closeAvatarModal();
        
        // Show success message
        showNotification('✅ Profile picture updated successfully!', 'success');
    };
    
    reader.readAsDataURL(file);
}

function updateAvatarDisplay(imageData) {
    const avatar = document.getElementById('profileAvatar');
    const headerAvatar = document.getElementById('headerProfileAvatar');
    
    if (avatar) {
        if (imageData) {
            avatar.innerHTML = `<img src="${imageData}" alt="Profile Picture" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
        } else {
            avatar.innerHTML = '👨‍💼';
        }
    }
    
    if (headerAvatar) {
        if (imageData) {
            headerAvatar.innerHTML = `<img src="${imageData}" alt="Profile Picture" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
        } else {
            headerAvatar.innerHTML = '👨‍💼';
        }
    }
}

function loadProfileAvatar() {
    const savedAvatar = localStorage.getItem('profileAvatar');
    if (savedAvatar) {
        updateAvatarDisplay(savedAvatar);
    }
}

function removeAvatar() {
    if (confirm('Are you sure you want to remove your profile picture?')) {
        localStorage.removeItem('profileAvatar');
        updateAvatarDisplay(null);
        closeAvatarModal();
        showNotification('Profile picture removed', 'success');
    }
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = 'success-message';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Show specific section
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.dashboard-section');
    for (let i = 0; i < sections.length; i++) {
        sections[i].classList.remove('active');
    }
    
    // Remove active class from all nav items
    const navItems = document.querySelectorAll('.modern-nav-item, .nav-item');
    for (let i = 0; i < navItems.length; i++) {
        navItems[i].classList.remove('active');
    }
    
    // Show selected section
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('active');
        section.style.display = 'block';
    }
    
    // Add active class to the nav item
    const activeNavItem = document.querySelector('.modern-nav-item[onclick*="' + sectionId + '"], .nav-item[onclick*="' + sectionId + '"]');
    if (activeNavItem) {
        activeNavItem.classList.add('active');
    }
}

// Filter bookings
function filterBookings(status) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (typeof event !== 'undefined' && event.target) {
        event.target.classList.add('active');
    }
}

// Save profile
function saveProfile(event) {
    event.preventDefault();
    
    // Get form data
    const form = event.target;
    
    // Get province and cities
    const provinceSelect = document.getElementById('serviceProvince');
    const selectedCities = Array.from(document.querySelectorAll('input[name="serviceArea"]:checked')).map(cb => cb.value);
    
    // Get selected categories
    const selectedCategories = Array.from(document.querySelectorAll('input[name="serviceCategory"]:checked')).map(cb => cb.value);
    
    const profileData = {
        name: form.querySelector('input[type="text"]')?.value || '',
        email: form.querySelector('input[type="email"]')?.value || '',
        phone: form.querySelector('input[type="tel"]')?.value || '',
        categories: selectedCategories,
        experience: form.querySelector('input[type="number"]')?.value || '',
        rate: form.querySelectorAll('input[type="number"]')[1]?.value || '',
        description: form.querySelector('textarea')?.value || '',
        province: provinceSelect?.value || '',
        cities: selectedCities
    };
    
    // Validate that categories are selected
    if (profileData.categories.length === 0) {
        alert('Please select at least one service category!');
        return;
    }
    
    // Validate that province and cities are selected
    if (!profileData.province) {
        alert('Please select a province!');
        return;
    }
    
    if (profileData.cities.length === 0) {
        alert('Please select at least one city!');
        return;
    }
    
    // Save to localStorage
    localStorage.setItem('providerProfile', JSON.stringify(profileData));
    
    // Update all name displays immediately (name or business name)
    const displayName = profileData.businessName || profileData.name;
    
    // Update sidebar profile display
    const sidebarName = document.getElementById('providerName');
    const sidebarPhone = document.getElementById('providerPhone');
    if (sidebarName && displayName) {
        sidebarName.textContent = displayName;
    }
    if (sidebarPhone && profileData.phone) {
        sidebarPhone.textContent = profileData.phone;
    }
    
    // Update welcome name in header
    const welcomeName = document.getElementById('welcomeName');
    if (welcomeName && displayName) {
        welcomeName.textContent = displayName;
    }
    
    // Update navigation bar name
    const navName = document.getElementById('navProviderName');
    if (navName && displayName) {
        navName.textContent = displayName;
    }
    
    // Create success message
    const message = document.createElement('div');
    message.className = 'success-message';
    message.textContent = '✅ Profile updated successfully! Redirecting to dashboard...';
    message.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(message);
    
    // Remove message and redirect to overview
    setTimeout(function() {
        message.remove();
        
        // Switch to overview section
        document.querySelectorAll('.dashboard-section').forEach(section => {
            section.classList.remove('active');
        });
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const overviewSection = document.getElementById('overview');
        if (overviewSection) {
            overviewSection.classList.add('active');
        }
        
        const overviewNavItem = document.querySelector('.nav-item[onclick*="overview"]');
        if (overviewNavItem) {
            overviewNavItem.classList.add('active');
        }
        
        // Update overview info from localStorage
        updateOverviewInfo();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1000);
}

// Save availability
function saveAvailability(event) {
    event.preventDefault();
    
    const message = document.createElement('div');
    message.className = 'success-message';
    message.textContent = '✅ Availability updated successfully!';
    message.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 9999;
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Logout
function logout() {
    // Optionally clear data on logout
    // localStorage.removeItem('providerProfile');
    // localStorage.removeItem('availabilityData');
    // localStorage.removeItem('advancedSchedule');
    window.location.href = 'index.html';
}

// City selection functionality
const provinceCities = {
    'ON': ['Toronto', 'Ottawa', 'Mississauga', 'Brampton', 'Hamilton', 'London', 'Markham', 'Vaughan', 'Kitchener', 'Windsor', 'Richmond Hill', 'Oakville', 'Burlington', 'Oshawa', 'Barrie', 'St. Catharines', 'Cambridge', 'Kingston', 'Guelph', 'Whitby'],
    'QC': ['Montreal', 'Quebec City', 'Laval', 'Gatineau', 'Longueuil', 'Sherbrooke', 'Saguenay', 'Lévis', 'Trois-Rivières', 'Terrebonne', 'Saint-Jean-sur-Richelieu', 'Repentigny', 'Brossard', 'Drummondville', 'Saint-Jérôme', 'Granby', 'Blainville', 'Saint-Hyacinthe', 'Shawinigan', 'Dollard-des-Ormeaux'],
    'BC': ['Vancouver', 'Surrey', 'Burnaby', 'Richmond', 'Abbotsford', 'Coquitlam', 'Kelowna', 'Saanich', 'Delta', 'Langley', 'Victoria', 'Kamloops', 'Nanaimo', 'Chilliwack', 'Prince George', 'Vernon', 'New Westminster', 'Penticton', 'White Rock', 'Port Coquitlam'],
    'AB': ['Calgary', 'Edmonton', 'Red Deer', 'Lethbridge', 'St. Albert', 'Medicine Hat', 'Grande Prairie', 'Airdrie', 'Spruce Grove', 'Okotoks', 'Leduc', 'Fort McMurray', 'Cochrane', 'Lloydminster', 'Camrose', 'Brooks', 'Cold Lake', 'Wetaskiwin', 'Lacombe', 'Stony Plain'],
    'MB': ['Winnipeg', 'Brandon', 'Steinbach', 'Thompson', 'Portage la Prairie', 'Winkler', 'Selkirk', 'Morden', 'Dauphin', 'The Pas', 'Flin Flon', 'Swan River', 'Neepawa', 'Virden', 'Stonewall', 'Beausejour', 'Gimli', 'Niverville', 'Minnedosa', 'Carman'],
    'SK': ['Saskatoon', 'Regina', 'Prince Albert', 'Moose Jaw', 'Swift Current', 'Yorkton', 'North Battleford', 'Estevan', 'Weyburn', 'Lloydminster', 'Martensville', 'Warman', 'Melville', 'Humboldt', 'Meadow Lake', 'Kindersley', 'Melfort', 'Rosetown', 'Tisdale', 'Unity'],
    'NS': ['Halifax', 'Cape Breton', 'Truro', 'New Glasgow', 'Glace Bay', 'Dartmouth', 'Sydney', 'Kentville', 'Amherst', 'New Waterford', 'Bridgewater', 'Yarmouth', 'Antigonish', 'Port Hawkesbury', 'Westville', 'Stellarton', 'Wolfville', 'Windsor', 'Pictou', 'Digby'],
    'NB': ['Moncton', 'Saint John', 'Fredericton', 'Dieppe', 'Miramichi', 'Edmundston', 'Bathurst', 'Campbellton', 'Riverview', 'Quispamsis', 'Oromocto', 'Tracadie', 'Grand Falls', 'Woodstock', 'Caraquet', 'Sackville', 'Sussex', 'Rothesay', 'Shippagan', 'Dalhousie'],
    'NL': ['St. John\'s', 'Mount Pearl', 'Corner Brook', 'Conception Bay South', 'Paradise', 'Grand Falls-Windsor', 'Gander', 'Portugal Cove-St. Philip\'s', 'Torbay', 'Labrador City', 'Happy Valley-Goose Bay', 'Stephenville', 'Clarenville', 'Bay Roberts', 'Marystown', 'Carbonear', 'Channel-Port aux Basques', 'Deer Lake', 'Bonavista', 'Twillingate'],
    'PE': ['Charlottetown', 'Summerside', 'Stratford', 'Cornwall', 'Montague', 'Kensington', 'Souris', 'Alberton', 'Tignish', 'Georgetown', 'O\'Leary', 'Borden-Carleton', 'Wellington', 'North Rustico', 'Cavendish', 'Hunter River', 'Crapaud', 'Cardigan', 'Morell', 'Murray River']
};

function loadProvinceCities() {
    const provinceSelect = document.getElementById('serviceProvince');
    const citiesGroup = document.getElementById('citiesGroup');
    const citiesGrid = document.getElementById('citiesGrid');
    const selectedProvince = provinceSelect.value;
    
    if (!selectedProvince) {
        citiesGroup.style.display = 'none';
        return;
    }
    
    // Show cities group
    citiesGroup.style.display = 'block';
    
    // Clear existing cities
    citiesGrid.innerHTML = '';
    
    // Get cities for selected province
    const cities = provinceCities[selectedProvince] || [];
    
    // Populate cities
    cities.forEach(city => {
        const label = document.createElement('label');
        label.className = 'checkbox-label';
        label.innerHTML = `<input type="checkbox" name="serviceArea" value="${city}" onchange="updateSelectedCities()" /> ${city}`;
        citiesGrid.appendChild(label);
    });
    
    // Reset selected cities display
    updateSelectedCities();
    
    // Scroll to cities section
    citiesGroup.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function filterCities() {
    const searchInput = document.getElementById('citySearchInput');
    const filter = searchInput.value.toLowerCase();
    const citiesGrid = document.getElementById('citiesGrid');
    const labels = citiesGrid.getElementsByTagName('label');
    
    for (let i = 0; i < labels.length; i++) {
        const cityText = labels[i].textContent || labels[i].innerText;
        if (cityText.toLowerCase().indexOf(filter) > -1) {
            labels[i].style.display = '';
        } else {
            labels[i].style.display = 'none';
        }
    }
}

// Update selected cities display
function updateSelectedCities() {
    const checkboxes = document.querySelectorAll('input[name="serviceArea"]:checked');
    const selectedCitiesText = document.getElementById('selectedCitiesText');
    const selectedCitiesCount = document.getElementById('selectedCitiesCount');
    
    if (checkboxes.length === 0) {
        if (selectedCitiesText) {
            selectedCitiesText.textContent = 'None';
            selectedCitiesText.style.color = '#999';
        }
        if (selectedCitiesCount) {
            selectedCitiesCount.textContent = '(0 selected)';
        }
    } else {
        const cities = Array.from(checkboxes).map(cb => cb.value).join(', ');
        if (selectedCitiesText) {
            selectedCitiesText.textContent = `${checkboxes.length} ${checkboxes.length === 1 ? 'city' : 'cities'} selected`;
            selectedCitiesText.style.color = '#667eea';
            selectedCitiesText.title = cities;
        }
        if (selectedCitiesCount) {
            selectedCitiesCount.textContent = `(${checkboxes.length} selected)`;
        }
    }
    
    // Update overview section if it exists
    updateOverviewInfo();
}

// Update selected categories display
function updateSelectedCategories() {
    const checkboxes = document.querySelectorAll('input[name="serviceCategory"]:checked');
    const selectedCategoriesText = document.getElementById('selectedCategoriesText');
    
    if (checkboxes.length === 0) {
        if (selectedCategoriesText) {
            selectedCategoriesText.textContent = 'None';
            selectedCategoriesText.style.color = '#999';
        }
    } else {
        const categories = Array.from(checkboxes).map(cb => cb.value).join(', ');
        if (selectedCategoriesText) {
            selectedCategoriesText.textContent = `${checkboxes.length} ${checkboxes.length === 1 ? 'specialization' : 'specializations'} selected`;
            selectedCategoriesText.style.color = '#667eea';
            selectedCategoriesText.title = categories;
        }
    }
    
    // Update parent checkboxes state
    updateParentCheckboxes();
}

// Toggle all subcategories when main category checkbox is clicked
function toggleMainCategory(mainCheckbox) {
    const categoryId = mainCheckbox.getAttribute('data-category');
    const subcategories = document.querySelectorAll(`input[data-parent="${categoryId}"]`);
    
    subcategories.forEach(sub => {
        sub.checked = mainCheckbox.checked;
    });
    
    updateSelectedCategories();
}

// Update parent checkbox state based on children
function updateParentCheckboxes() {
    const mainCategories = document.querySelectorAll('.main-category');
    
    mainCategories.forEach(main => {
        const categoryId = main.getAttribute('data-category');
        const subcategories = document.querySelectorAll(`input[data-parent="${categoryId}"]`);
        const checkedSubs = document.querySelectorAll(`input[data-parent="${categoryId}"]:checked`);
        
        if (checkedSubs.length === 0) {
            main.checked = false;
            main.indeterminate = false;
        } else if (checkedSubs.length === subcategories.length) {
            main.checked = true;
            main.indeterminate = false;
        } else {
            main.checked = false;
            main.indeterminate = true;
        }
    });
}

// Load profile data from localStorage
function loadProfileData() {
    const savedProfile = localStorage.getItem('providerProfile');
    console.log('Loading profile data...', savedProfile);
    if (!savedProfile) {
        console.log('No saved profile found');
        return;
    }
    
    try {
        const profileData = JSON.parse(savedProfile);
        console.log('Profile data:', profileData);
        
        // Determine display name (business name takes priority over personal name)
        const displayName = profileData.businessName || profileData.name;
        console.log('Display name:', displayName);
        
        // Update welcome name in header
        const welcomeName = document.getElementById('welcomeName');
        if (welcomeName && displayName) {
            welcomeName.textContent = displayName;
            console.log('Updated welcome name to:', displayName);
        }
        
        // Update navigation bar name
        const navName = document.getElementById('navProviderName');
        if (navName && displayName) {
            navName.textContent = displayName;
            console.log('Updated nav name to:', displayName);
        }
        
        // Update sidebar profile display
        const sidebarName = document.getElementById('providerName');
        const sidebarPhone = document.getElementById('providerPhone');
        if (sidebarName && displayName) {
            sidebarName.textContent = displayName;
            console.log('Updated sidebar name to:', displayName);
        }
        if (sidebarPhone && profileData.phone) {
            sidebarPhone.textContent = profileData.phone;
        }
        
        // Fill in form fields if they exist
        const nameInput = document.querySelector('input[type="text"]');
        const emailInput = document.querySelector('input[type="email"]');
        const phoneInput = document.querySelector('input[type="tel"]');
        const numberInputs = document.querySelectorAll('input[type="number"]');
        const textarea = document.querySelector('textarea');
        const provinceSelect = document.getElementById('serviceProvince');
        
        if (nameInput) nameInput.value = profileData.name || '';
        if (emailInput) emailInput.value = profileData.email || '';
        if (phoneInput) phoneInput.value = profileData.phone || '';
        
        // Load categories (handle both old 'category' and new 'categories')
        const categories = profileData.categories || (profileData.category ? [profileData.category] : []);
        if (categories.length > 0) {
            categories.forEach(category => {
                const checkbox = document.querySelector(`input[name="serviceCategory"][value="${category}"]`);
                if (checkbox) checkbox.checked = true;
            });
            updateSelectedCategories();
        }
        
        if (numberInputs[0]) numberInputs[0].value = profileData.experience || '';
        if (numberInputs[1]) numberInputs[1].value = profileData.rate || '';
        if (textarea) textarea.value = profileData.description || '';
        if (provinceSelect && profileData.province) {
            provinceSelect.value = profileData.province;
            loadProvinceCities();
            
            // Wait for cities to load, then check saved ones
            setTimeout(() => {
                if (profileData.cities && profileData.cities.length > 0) {
                    profileData.cities.forEach(city => {
                        const checkbox = document.querySelector(`input[name="serviceArea"][value="${city}"]`);
                        if (checkbox) checkbox.checked = true;
                    });
                    updateSelectedCities();
                }
            }, 100);
        }
    } catch (e) {
        console.error('Error loading profile data:', e);
    }
}

// Update overview section with latest info
function updateOverviewInfo() {
    // Get saved profile data
    const savedProfile = localStorage.getItem('providerProfile');
    let profileData = null;
    
    if (savedProfile) {
        try {
            profileData = JSON.parse(savedProfile);
        } catch (e) {
            console.error('Error parsing profile data:', e);
        }
    }
    
    // Update province info
    const infoProvince = document.getElementById('infoProvince');
    if (infoProvince) {
        if (profileData && profileData.province) {
            // Map province codes to full names
            const provinceNames = {
                'ON': 'Ontario',
                'QC': 'Quebec',
                'BC': 'British Columbia',
                'AB': 'Alberta',
                'MB': 'Manitoba',
                'SK': 'Saskatchewan',
                'NS': 'Nova Scotia',
                'NB': 'New Brunswick',
                'NL': 'Newfoundland and Labrador',
                'PE': 'Prince Edward Island'
            };
            infoProvince.textContent = provinceNames[profileData.province] || profileData.province;
        } else {
            infoProvince.textContent = 'Not set';
        }
    }
    
    // Update categories info
    const infoCategories = document.getElementById('infoCategories');
    if (infoCategories) {
        const categories = profileData?.categories || (profileData?.category ? [profileData.category] : []);
        if (categories.length > 0) {
            infoCategories.textContent = categories.join(', ');
            infoCategories.style.color = '#333';
        } else {
            infoCategories.textContent = 'Not set';
            infoCategories.style.color = '#999';
        }
    }
    
    // Update cities info
    const infoCities = document.getElementById('infoCities');
    if (infoCities) {
        if (profileData && profileData.cities && profileData.cities.length > 0) {
            const cities = profileData.cities;
            infoCities.textContent = cities.slice(0, 3).join(', ') + (cities.length > 3 ? ` +${cities.length - 3} more` : '');
            infoCities.style.color = '#333';
            infoCities.title = cities.join(', ');
        } else {
            infoCities.textContent = 'No cities selected';
            infoCities.style.color = '#999';
        }
    }
    
    // Update available days count
    updateAvailableDaysCount();
}

// Count and display available days
function updateAvailableDaysCount() {
    const availableDaysCount = document.getElementById('availableDaysCount');
    if (!availableDaysCount) return;
    
    // Load availability data from localStorage
    const savedAvailability = localStorage.getItem('availabilityData');
    let availabilityData = {};
    
    if (savedAvailability) {
        try {
            availabilityData = JSON.parse(savedAvailability);
        } catch (e) {
            console.error('Error loading availability data:', e);
        }
    }
    
    // Count days from calendar data
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    let count = 0;
    
    Object.keys(availabilityData).forEach(key => {
        const [year, month] = key.split('-').map(Number);
        if (year === currentYear && month - 1 === currentMonth) {
            count++;
        }
    });
    
    availableDaysCount.textContent = `${count} days`;
}

// Switch between basic and advanced schedule modes
function switchScheduleMode(mode) {
    const basicMode = document.getElementById('basicCalendarMode');
    const advancedMode = document.getElementById('advancedCityMode');
    
    if (mode === 'basic') {
        basicMode.classList.add('active');
        advancedMode.classList.remove('active');
    } else {
        basicMode.classList.remove('active');
        advancedMode.classList.add('active');
        // Populate advanced mode with selected cities
        populateAdvancedModeCities();
    }
}

// Populate advanced mode with cities from profile
function populateAdvancedModeCities() {
    const checkboxes = document.querySelectorAll('input[name="serviceArea"]:checked');
    const selectedCities = Array.from(checkboxes).map(cb => cb.value);
    
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    
    // Load saved advanced schedule
    const savedSchedule = localStorage.getItem('advancedSchedule');
    let scheduleData = {};
    if (savedSchedule) {
        try {
            scheduleData = JSON.parse(savedSchedule);
        } catch (e) {
            console.error('Error loading advanced schedule:', e);
        }
    }
    
    days.forEach(day => {
        const container = document.getElementById(day + 'Cities');
        if (!container) return;
        
        if (selectedCities.length === 0) {
            container.innerHTML = '<p class="warning-text">⚠️ Please set your service cities in Profile Settings first</p>';
        } else {
            container.innerHTML = '';
            selectedCities.forEach(city => {
                const label = document.createElement('label');
                label.className = 'checkbox-label';
                const isChecked = scheduleData[day] && scheduleData[day].includes(city) ? 'checked' : '';
                label.innerHTML = `<input type="checkbox" name="${day}Cities" value="${city}" ${isChecked} /> ${city}`;
                container.appendChild(label);
            });
        }
    });
}

// Save advanced schedule
function saveAdvancedSchedule() {
    // Collect data from all days
    const scheduleData = {};
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    
    days.forEach(day => {
        const checkboxes = document.querySelectorAll(`input[name="${day}Cities"]:checked`);
        const cities = Array.from(checkboxes).map(cb => cb.value);
        if (cities.length > 0) {
            scheduleData[day] = cities;
        }
    });
    
    // Save to localStorage
    localStorage.setItem('advancedSchedule', JSON.stringify(scheduleData));
    
    // Show success message
    const message = document.createElement('div');
    message.className = 'success-message';
    message.textContent = '✅ Advanced schedule saved successfully!';
    message.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Toggle booking status
function toggleBookingStatus() {
    const checkbox = document.getElementById('acceptingBookings');
    const statusBadge = document.querySelector('.status-badge');
    
    if (checkbox && statusBadge) {
        if (checkbox.checked) {
            statusBadge.textContent = '● Accepting New Bookings';
            statusBadge.classList.add('active');
        } else {
            statusBadge.textContent = '● Not Accepting Bookings';
            statusBadge.classList.remove('active');
        }
        
        // Save to localStorage
        localStorage.setItem('acceptingBookings', checkbox.checked);
    }
}

// Load booking status from localStorage
function loadBookingStatus() {
    const checkbox = document.getElementById('acceptingBookings');
    const statusBadge = document.querySelector('.status-badge');
    const savedStatus = localStorage.getItem('acceptingBookings');
    
    if (checkbox && savedStatus !== null) {
        checkbox.checked = savedStatus === 'true';
        
        if (statusBadge) {
            if (checkbox.checked) {
                statusBadge.textContent = '● Accepting New Bookings';
                statusBadge.classList.add('active');
            } else {
                statusBadge.textContent = '● Not Accepting Bookings';
                statusBadge.classList.remove('active');
            }
        }
    }
}

// Initialize Drag and Drop functionality
function initializeDragAndDrop() {
    const dropZone = document.getElementById('dropZone');
    if (!dropZone) return;

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    // Highlight drop zone when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });

    // Handle dropped files
    dropZone.addEventListener('drop', handleDrop, false);
}

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlight(e) {
    const dropZone = document.getElementById('dropZone');
    dropZone.classList.add('highlight');
}

function unhighlight(e) {
    const dropZone = document.getElementById('dropZone');
    dropZone.classList.remove('highlight');
}

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;

    if (files.length > 0) {
        handleDroppedFile(files[0]);
    }
}

function handleDroppedFile(file) {
    // Validate file type
    if (!file.type.startsWith('image/')) {
        alert('Please drop an image file');
        return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
    }

    // Read and convert to base64
    const reader = new FileReader();
    reader.onload = function(e) {
        const imageData = e.target.result;
        
        // Save to localStorage
        localStorage.setItem('profileAvatar', imageData);
        
        // Update display
        updateAvatarDisplay(imageData);
        
        // Close modal
        closeAvatarModal();
        
        // Show success message
        showNotification('✅ Profile picture updated successfully!', 'success');
    };
    
    reader.readAsDataURL(file);
}

// Logout function
function handleLogout(userType) {
    if (userType === 'customer') {
        // Clear customer login status
        localStorage.removeItem('customerLoggedIn');
        // Redirect to login page
        window.location.href = 'login.html';
    } else if (userType === 'provider') {
        // Clear provider login status
        localStorage.removeItem('providerLoggedIn');
        // Redirect to provider login page
        window.location.href = 'service-provider-login.html';
    }
}
