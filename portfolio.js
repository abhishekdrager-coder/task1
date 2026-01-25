// ============================================
// PORTFOLIO GALLERY FUNCTIONS
// ============================================

let portfolioImages = [];
let currentViewingIndex = -1;

// Load portfolio images from localStorage on page load
function loadPortfolioImages() {
    const saved = localStorage.getItem('portfolioImages');
    if (saved) {
        portfolioImages = JSON.parse(saved);
        updatePortfolioDisplay();
    }
}

// Initialize portfolio on page load
window.addEventListener('DOMContentLoaded', function() {
    loadPortfolioImages();
    initializePortfolioDragDrop();
});

// Open portfolio upload modal
function openPortfolioUpload() {
    const currentCount = portfolioImages.length;
    if (currentCount >= 30) {
        alert('⚠️ You have reached the maximum limit of 30 images. Please delete some images to upload new ones.');
        return;
    }
    
    const modal = document.getElementById('portfolioModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

// Close portfolio upload modal
function closePortfolioModal() {
    const modal = document.getElementById('portfolioModal');
    if (modal) {
        modal.style.display = 'none';
    }
    // Clear preview
    document.getElementById('portfolioPreviewContainer').style.display = 'none';
    document.getElementById('portfolioPreviewGrid').innerHTML = '';
    document.getElementById('uploadPortfolioBtn').style.display = 'none';
}

// Select portfolio images from file system
function selectPortfolioImages() {
    document.getElementById('portfolioFileInput').click();
}

// Handle portfolio image upload
let selectedFiles = [];
function handlePortfolioUpload(event) {
    const files = Array.from(event.target.files);
    const currentCount = portfolioImages.length;
    const remainingSlots = 30 - currentCount;
    
    if (files.length > remainingSlots) {
        alert(`⚠️ You can only upload ${remainingSlots} more image(s). You currently have ${currentCount}/30 images.`);
        selectedFiles = files.slice(0, remainingSlots);
    } else {
        selectedFiles = files;
    }
    
    // Show preview
    showPortfolioPreview(selectedFiles);
}

// Show preview of selected images
function showPortfolioPreview(files) {
    const previewContainer = document.getElementById('portfolioPreviewContainer');
    const previewGrid = document.getElementById('portfolioPreviewGrid');
    const uploadBtn = document.getElementById('uploadPortfolioBtn');
    
    previewGrid.innerHTML = '';
    
    files.forEach((file, index) => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const div = document.createElement('div');
                div.style.cssText = 'position: relative; padding-bottom: 100%; overflow: hidden; border-radius: 8px; background: #fff;';
                
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;';
                
                const removeBtn = document.createElement('button');
                removeBtn.innerHTML = '×';
                removeBtn.style.cssText = 'position: absolute; top: 5px; right: 5px; background: rgba(255,0,0,0.8); color: white; border: none; border-radius: 50%; width: 24px; height: 24px; cursor: pointer; font-size: 18px; line-height: 1;';
                removeBtn.onclick = function() {
                    selectedFiles.splice(index, 1);
                    showPortfolioPreview(selectedFiles);
                };
                
                div.appendChild(img);
                div.appendChild(removeBtn);
                previewGrid.appendChild(div);
            };
            reader.readAsDataURL(file);
        }
    });
    
    if (files.length > 0) {
        previewContainer.style.display = 'block';
        uploadBtn.style.display = 'inline-block';
    } else {
        previewContainer.style.display = 'none';
        uploadBtn.style.display = 'none';
    }
}

// Confirm and upload portfolio images
function confirmPortfolioUpload() {
    if (selectedFiles.length === 0) {
        alert('Please select at least one image.');
        return;
    }
    
    let processed = 0;
    const totalFiles = selectedFiles.length;
    
    selectedFiles.forEach((file, index) => {
        if (file.type.startsWith('image/')) {
            // Validate file size (max 5MB per image)
            if (file.size > 5 * 1024 * 1024) {
                alert(`Image "${file.name}" is too large. Maximum size is 5MB.`);
                processed++;
                if (processed === totalFiles) finishUpload();
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(e) {
                portfolioImages.push({
                    id: Date.now() + index,
                    data: e.target.result,
                    name: file.name,
                    uploadDate: new Date().toISOString()
                });
                
                processed++;
                if (processed === totalFiles) {
                    finishUpload();
                }
            };
            reader.readAsDataURL(file);
        } else {
            processed++;
            if (processed === totalFiles) finishUpload();
        }
    });
}

function finishUpload() {
    // Save to localStorage
    localStorage.setItem('portfolioImages', JSON.stringify(portfolioImages));
    
    // Update display
    updatePortfolioDisplay();
    
    // Close modal
    closePortfolioModal();
    
    // Show success message
    showNotification(`✅ Successfully uploaded ${selectedFiles.length} image(s)!`, 'success');
    
    // Clear selected files
    selectedFiles = [];
    document.getElementById('portfolioFileInput').value = '';
}

// Update portfolio display in dashboard
function updatePortfolioDisplay() {
    const grid = document.getElementById('portfolioGrid');
    const emptyState = document.getElementById('portfolioEmpty');
    const countSpan = document.getElementById('portfolioCount');
    
    // Update count
    countSpan.textContent = portfolioImages.length;
    
    if (portfolioImages.length === 0) {
        emptyState.style.display = 'flex';
        grid.style.gridTemplateColumns = '1fr';
    } else {
        emptyState.style.display = 'none';
        grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(120px, 1fr))';
        grid.innerHTML = '';
        
        portfolioImages.forEach((image, index) => {
            const imgDiv = document.createElement('div');
            imgDiv.className = 'portfolio-item';
            imgDiv.onclick = function() {
                viewPortfolioImage(index);
            };
            
            const img = document.createElement('img');
            img.src = image.data;
            img.alt = image.name;
            
            imgDiv.appendChild(img);
            grid.appendChild(imgDiv);
        });
    }
}

// View portfolio image in modal
function viewPortfolioImage(index) {
    currentViewingIndex = index;
    const modal = document.getElementById('portfolioViewerModal');
    const img = document.getElementById('portfolioViewerImage');
    
    if (modal && img && portfolioImages[index]) {
        img.src = portfolioImages[index].data;
        modal.style.display = 'flex';
    }
}

// Close portfolio viewer
function closePortfolioViewer() {
    const modal = document.getElementById('portfolioViewerModal');
    if (modal) {
        modal.style.display = 'none';
    }
    currentViewingIndex = -1;
}

// Delete portfolio image
function deletePortfolioImage() {
    if (currentViewingIndex === -1) return;
    
    if (confirm('Are you sure you want to delete this image from your portfolio?')) {
        portfolioImages.splice(currentViewingIndex, 1);
        localStorage.setItem('portfolioImages', JSON.stringify(portfolioImages));
        updatePortfolioDisplay();
        closePortfolioViewer();
        showNotification('🗑️ Image deleted successfully', 'success');
    }
}

// Initialize drag and drop for portfolio
function initializePortfolioDragDrop() {
    const dropZone = document.getElementById('portfolioDropZone');
    if (!dropZone) return;
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, function(e) {
            e.preventDefault();
            e.stopPropagation();
        }, false);
    });
    
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlightPortfolio, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlightPortfolio, false);
    });
    
    dropZone.addEventListener('drop', handlePortfolioDrop, false);
}

function highlightPortfolio(e) {
    const dropZone = document.getElementById('portfolioDropZone');
    dropZone.classList.add('highlight');
}

function unhighlightPortfolio(e) {
    const dropZone = document.getElementById('portfolioDropZone');
    dropZone.classList.remove('highlight');
}

function handlePortfolioDrop(e) {
    const dt = e.dataTransfer;
    const files = Array.from(dt.files);
    
    const currentCount = portfolioImages.length;
    const remainingSlots = 30 - currentCount;
    
    if (files.length > remainingSlots) {
        alert(`⚠️ You can only upload ${remainingSlots} more image(s). You currently have ${currentCount}/30 images.`);
        selectedFiles = files.slice(0, remainingSlots);
    } else {
        selectedFiles = files;
    }
    
    showPortfolioPreview(selectedFiles);
}
