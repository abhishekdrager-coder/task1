// Calendar and availability management

let currentDate = new Date();
let selectedDateElement = null;
let availabilityData = {}; // Store availability: { '2026-01-15': { start: '09:00', end: '17:00', available: true } }

// Load saved availability data from localStorage
function loadAvailabilityData() {
    const savedData = localStorage.getItem('availabilityData');
    if (savedData) {
        try {
            availabilityData = JSON.parse(savedData);
        } catch (e) {
            console.error('Error loading availability data:', e);
            availabilityData = {};
        }
    }
}

// Save availability data to localStorage
function saveAvailabilityData() {
    try {
        localStorage.setItem('availabilityData', JSON.stringify(availabilityData));
    } catch (e) {
        console.error('Error saving availability data:', e);
    }
}

// Initialize calendar when page loads
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('calendarDays')) {
        loadAvailabilityData();
        renderCalendar();
        checkMonthlyAutoFill();
    }
});

// Render calendar
function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Update header
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    document.getElementById('currentMonthYear').textContent = `${monthNames[month]} ${year}`;
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const calendarDays = document.getElementById('calendarDays');
    calendarDays.innerHTML = '';
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        calendarDays.appendChild(emptyDay);
    }
    
    // Add days of the month
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isToday = (year === today.getFullYear() && month === today.getMonth() && day === today.getDate());
        const isPast = new Date(year, month, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
        
        if (isToday) {
            dayElement.classList.add('today');
        }
        
        if (isPast) {
            dayElement.classList.add('past');
        }
        
        // Check if day has availability set
        if (availabilityData[dateStr]) {
            if (availabilityData[dateStr].available) {
                dayElement.classList.add('available');
                dayElement.innerHTML = `
                    <span class="day-number">${day}</span>
                    <span class="day-hours">${availabilityData[dateStr].start}-${availabilityData[dateStr].end}</span>
                `;
            } else {
                dayElement.classList.add('unavailable');
                dayElement.innerHTML = `<span class="day-number">${day}</span>`;
            }
        } else {
            dayElement.innerHTML = `<span class="day-number">${day}</span>`;
        }
        
        dayElement.onclick = function() {
            if (!isPast) {
                selectDate(dateStr, dayElement);
            }
        };
        
        calendarDays.appendChild(dayElement);
    }
}

// Select a date
function selectDate(dateStr, element) {
    // Remove previous selection
    if (selectedDateElement) {
        selectedDateElement.classList.remove('selected');
    }
    
    // Add selection to clicked date
    element.classList.add('selected');
    selectedDateElement = element;
    
    // Show time slots form
    const timeSlotsContainer = document.getElementById('timeSlotsContainer');
    timeSlotsContainer.style.display = 'block';
    
    // Update selected date display
    const date = new Date(dateStr);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('selectedDate').textContent = date.toLocaleDateString('en-US', options);
    
    // Pre-fill with existing data if available
    if (availabilityData[dateStr]) {
        document.getElementById('startTime').value = availabilityData[dateStr].start || '09:00';
        document.getElementById('endTime').value = availabilityData[dateStr].end || '17:00';
    } else {
        document.getElementById('startTime').value = '09:00';
        document.getElementById('endTime').value = '17:00';
    }
    
    // Store current date for saving
    timeSlotsContainer.dataset.currentDate = dateStr;
    
    // Scroll to time slots
    timeSlotsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Save time slot
function saveTimeSlot() {
    const dateStr = document.getElementById('timeSlotsContainer').dataset.currentDate;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    
    if (startTime >= endTime) {
        showNotification('End time must be after start time!', 'error');
        return;
    }
    
    // Save to availability data
    availabilityData[dateStr] = {
        start: startTime,
        end: endTime,
        available: true
    };
    
    // Save to localStorage
    saveAvailabilityData();
    
    // Re-render calendar
    renderCalendar();
    
    // Close time slots
    closeTimeSlots();
    
    showNotification('✅ Availability saved!', 'success');
}

// Mark as unavailable
function markUnavailable() {
    const dateStr = document.getElementById('timeSlotsContainer').dataset.currentDate;
    
    availabilityData[dateStr] = {
        available: false
    };
    
    // Save to localStorage
    saveAvailabilityData();
    
    renderCalendar();
    closeTimeSlots();
    
    showNotification('Day marked as unavailable', 'success');
}

// Close time slots form
function closeTimeSlots() {
    document.getElementById('timeSlotsContainer').style.display = 'none';
    if (selectedDateElement) {
        selectedDateElement.classList.remove('selected');
    }
}

// Navigation
function previousMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}

// Apply template to multiple days
function applyTemplate() {
    const templateDays = document.querySelectorAll('.template-day');
    let applied = 0;
    
    templateDays.forEach(dayElement => {
        const checkbox = dayElement.querySelector('input[type="checkbox"]');
        if (checkbox.checked) {
            const dayName = checkbox.dataset.day;
            const timeInputs = dayElement.querySelectorAll('input[type="time"]');
            const startTime = timeInputs[0].value;
            const endTime = timeInputs[1].value;
            
            // Apply to all days of this type in current month
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            
            const dayIndex = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].indexOf(dayName);
            
            for (let day = 1; day <= daysInMonth; day++) {
                const date = new Date(year, month, day);
                if (date.getDay() === dayIndex && date >= new Date()) {
                    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    availabilityData[dateStr] = {
                        start: startTime,
                        end: endTime,
                        available: true
                    };
                    applied++;
                }
            }
        }
    });
    
    if (applied > 0) {
        // Save to localStorage
        saveAvailabilityData();
        
        renderCalendar();
        showNotification(`✅ Template applied to ${applied} day(s)!`, 'success');
    } else {
        showNotification('Please select at least one day', 'error');
    }
}

// Auto-fill functionality
function showAutoFillModal() {
    document.getElementById('autoFillModal').style.display = 'flex';
}

function closeAutoFillModal() {
    document.getElementById('autoFillModal').style.display = 'none';
}

function confirmAutoFill() {
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    // Get next month
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    
    let copied = 0;
    
    // Copy availability from current month to next month
    Object.keys(availabilityData).forEach(dateStr => {
        const date = new Date(dateStr);
        if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
            // Calculate corresponding date in next month
            const day = date.getDate();
            const daysInNextMonth = new Date(nextYear, nextMonth + 1, 0).getDate();
            
            // Only copy if day exists in next month
            if (day <= daysInNextMonth) {
                const nextDateStr = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                availabilityData[nextDateStr] = { ...availabilityData[dateStr] };
                copied++;
            }
        }
    });
    
    closeAutoFillModal();
    
    if (copied > 0) {
        // Save to localStorage
        saveAvailabilityData();
        
        // Show success message
        const message = document.createElement('div');
        message.className = 'success-message';
        message.textContent = `✅ Copied ${copied} day(s) to next month! Redirecting to dashboard...`;
        message.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            font-weight: 500;
        `;
        document.body.appendChild(message);
        
        // Redirect to overview after 1 second
        setTimeout(() => {
            message.remove();
            showSection('overview');
        }, 1000);
        
        // Move to next month to show changes
        currentDate.setMonth(nextMonth);
        currentDate.setFullYear(nextYear);
        renderCalendar();
    } else {
        showNotification('No availability to copy. Set your schedule first!', 'error');
    }
}

// Check if should show monthly auto-fill prompt
function checkMonthlyAutoFill() {
    // Check if it's near end of month (last 5 days)
    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const currentDay = today.getDate();
    
    // Check if we have availability data for current month
    const hasCurrentMonthData = Object.keys(availabilityData).some(dateStr => {
        const date = new Date(dateStr);
        return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
    });
    
    // Show prompt if near end of month and has data
    if (currentDay >= daysInMonth - 5 && hasCurrentMonthData) {
        const lastPrompt = localStorage.getItem('lastAutoFillPrompt');
        const currentMonthKey = `${today.getFullYear()}-${today.getMonth()}`;
        
        if (lastPrompt !== currentMonthKey) {
            setTimeout(() => {
                if (confirm('Would you like to copy this month\'s schedule to next month?')) {
                    showAutoFillModal();
                }
                localStorage.setItem('lastAutoFillPrompt', currentMonthKey);
            }, 2000);
        }
    }
}

// Toggle booking status
function toggleBookingStatus() {
    const checkbox = document.getElementById('acceptingBookings');
    const status = checkbox.checked ? 'accepting' : 'not accepting';
    showNotification(`You are now ${status} new bookings`, 'success');
}

// Notification helper
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
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
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('autoFillModal');
    if (event.target === modal) {
        closeAutoFillModal();
    }
}
