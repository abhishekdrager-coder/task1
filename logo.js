// Beverhub Logo Manager
// Swaps logo to provider variant when a professional is logged in
(function() {
    var isProvider = localStorage.getItem('providerLoggedIn') === 'true';
    
    function updateLogos() {
        var logos = document.querySelectorAll('.beverhub-logo');
        logos.forEach(function(logo) {
            if (isProvider) {
                // Provider logo: house with people
                logo.classList.add('provider-logo');
                var mascot = logo.querySelector('.logo-mascot');
                var tagline = logo.querySelector('.logo-tagline');
                if (mascot) mascot.textContent = '🏠';
                if (tagline) {
                    tagline.textContent = 'Home Help Marketplace';
                    tagline.style.display = 'block';
                }
            } else {
                // Default logo: beaver mascot
                logo.classList.remove('provider-logo');
                var mascot = logo.querySelector('.logo-mascot');
                var tagline = logo.querySelector('.logo-tagline');
                if (mascot) mascot.textContent = '🦫';
                if (tagline) tagline.style.display = 'none';
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateLogos);
    } else {
        updateLogos();
    }
})();
