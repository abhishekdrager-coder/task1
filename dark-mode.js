(function() {
    function readSettings(key) {
        try {
            return JSON.parse(localStorage.getItem(key) || '{}');
        } catch (error) {
            return {};
        }
    }

    var customerSettings = readSettings('customerSettings');
    var providerSettings = readSettings('providerSettings');
    var enableDark = customerSettings.darkMode === true || providerSettings.darkMode === true;

    if (!enableDark) return;

    // Apply dark-mode class immediately
    document.documentElement.classList.add('dark-mode');
    if (document.body) {
        document.body.classList.add('dark-mode');
    }

    // Inject comprehensive dark mode CSS (single source of truth for all pages)
    var css = [
        /* === BASE === */
        'body.dark-mode { background: #0a0e1a !important; color: #e0e8ff !important; }',
        'body.dark-mode * { border-color: rgba(102, 126, 234, 0.25) !important; }',

        /* === TYPOGRAPHY (aggressive - override ALL text) === */
        'body.dark-mode h1, body.dark-mode h2, body.dark-mode h3, body.dark-mode h4, body.dark-mode h5, body.dark-mode h6 { color: #ffffff !important; }',
        'body.dark-mode p, body.dark-mode span, body.dark-mode li, body.dark-mode label, body.dark-mode td, body.dark-mode th, body.dark-mode div, body.dark-mode section, body.dark-mode article { color: #e0e8ff !important; }',
        'body.dark-mode small, body.dark-mode strong, body.dark-mode b, body.dark-mode em, body.dark-mode i:not(.fas):not(.far):not(.fab):not(.fa) { color: #e0e8ff !important; }',

        /* === LINKS === */
        'body.dark-mode a { color: #90b0ff !important; }',
        'body.dark-mode a:hover { color: #b0d0ff !important; }',
        'body.dark-mode .btn-login, body.dark-mode .btn-provider, body.dark-mode .btn-cta { color: #ffffff !important; }',

        /* === NAVBAR === */
        'body.dark-mode .modern-navbar, body.dark-mode .navbar, body.dark-mode nav { background: rgba(20, 40, 80, 0.95) !important; border-bottom: 1px solid rgba(102, 126, 234, 0.3) !important; }',

        /* === CARDS, SECTIONS, CONTAINERS === */
        'body.dark-mode .service-card, body.dark-mode .feature-card, body.dark-mode .card, body.dark-mode .profile-section, body.dark-mode .testimonial-card { background: rgba(20, 40, 80, 0.4) !important; border: 1px solid rgba(102, 126, 234, 0.3) !important; }',
        'body.dark-mode .dashboard-grid > div, body.dark-mode .provider-profile, body.dark-mode .stat-card { background: rgba(20, 40, 80, 0.4) !important; box-shadow: 0 4px 20px rgba(102, 126, 234, 0.15) !important; }',
        'body.dark-mode .dashboard-icons .icon-item, body.dark-mode .icon-menu-grid .icon-menu-card { background: rgba(20, 40, 80, 0.4) !important; border: 1px solid rgba(102, 126, 234, 0.3) !important; }',
        'body.dark-mode .dashboard-icons .icon-item h3, body.dark-mode .icon-menu-grid .icon-menu-card h3 { color: #ffffff !important; }',
        'body.dark-mode .dashboard-icons .icon-item p, body.dark-mode .icon-menu-grid .icon-menu-card p { color: #e0e8ff !important; }',
        'body.dark-mode .services-container, body.dark-mode .overview-section { background: rgba(20, 40, 80, 0.4) !important; border: 1px solid rgba(102, 126, 234, 0.3) !important; box-shadow: 0 4px 20px rgba(102, 126, 234, 0.1) !important; }',
        'body.dark-mode .favorites-grid, body.dark-mode .provider-card { background: rgba(20, 40, 80, 0.4) !important; border: 1px solid rgba(102, 126, 234, 0.3) !important; }',
        'body.dark-mode .terms-section, body.dark-mode .about-section, body.dark-mode .contact-section, body.dark-mode .help-section, body.dark-mode .safety-section { background: rgba(20, 40, 80, 0.4) !important; border: 1px solid rgba(102, 126, 234, 0.3) !important; }',
        'body.dark-mode .icon-dashboard-container { background: #0a0e1a !important; }',

        /* === INLINE WHITE/LIGHT BACKGROUNDS (the main fix for invisible text) === */
        'body.dark-mode [style*="background: white"], body.dark-mode [style*="background:white"], body.dark-mode [style*="background-color: white"], body.dark-mode [style*="background-color:white"] { background: rgba(20, 40, 80, 0.5) !important; color: #e0e8ff !important; }',
        'body.dark-mode [style*="background: #fff"], body.dark-mode [style*="background:#fff"], body.dark-mode [style*="background-color: #fff"], body.dark-mode [style*="background-color:#fff"] { background: rgba(20, 40, 80, 0.5) !important; color: #e0e8ff !important; }',
        'body.dark-mode [style*="background: #FFF"], body.dark-mode [style*="background:#FFF"] { background: rgba(20, 40, 80, 0.5) !important; color: #e0e8ff !important; }',
        'body.dark-mode [style*="background: rgb(255"], body.dark-mode [style*="background-color: rgb(255"] { background: rgba(20, 40, 80, 0.5) !important; color: #e0e8ff !important; }',

        /* Near-white grays */
        'body.dark-mode [style*="background: #f8f9fa"], body.dark-mode [style*="background:#f8f9fa"], body.dark-mode [style*="background-color: #f8f9fa"] { background: rgba(25, 45, 85, 0.4) !important; color: #e0e8ff !important; }',
        'body.dark-mode [style*="background: #f9fafb"], body.dark-mode [style*="background:#f9fafb"], body.dark-mode [style*="background-color: #f9fafb"] { background: rgba(25, 45, 85, 0.4) !important; color: #e0e8ff !important; }',
        'body.dark-mode [style*="background: #f9f9f9"], body.dark-mode [style*="background:#f9f9f9"] { background: rgba(25, 45, 85, 0.4) !important; color: #e0e8ff !important; }',
        'body.dark-mode [style*="background: #f5f5f5"], body.dark-mode [style*="background:#f5f5f5"] { background: rgba(25, 45, 85, 0.4) !important; color: #e0e8ff !important; }',
        'body.dark-mode [style*="background: #f0f0f0"], body.dark-mode [style*="background:#f0f0f0"] { background: rgba(30, 50, 90, 0.4) !important; color: #e0e8ff !important; }',
        'body.dark-mode [style*="background: #f0f4ff"], body.dark-mode [style*="background:#f0f4ff"] { background: rgba(30, 50, 100, 0.4) !important; color: #e0e8ff !important; }',
        'body.dark-mode [style*="background: #e0e0e0"], body.dark-mode [style*="background:#e0e0e0"] { background: rgba(40, 60, 100, 0.4) !important; color: #e0e8ff !important; }',
        'body.dark-mode [style*="background: #eee"], body.dark-mode [style*="background:#eee"] { background: rgba(30, 50, 90, 0.4) !important; color: #e0e8ff !important; }',
        'body.dark-mode [style*="background: #ddd"], body.dark-mode [style*="background:#ddd"] { background: rgba(30, 50, 90, 0.4) !important; color: #e0e8ff !important; }',
        'body.dark-mode [style*="background: #e7f3ff"], body.dark-mode [style*="background:#e7f3ff"] { background: rgba(30, 50, 100, 0.35) !important; color: #e0e8ff !important; }',

        /* Alert colors - keep hue but darken */
        'body.dark-mode [style*="background: #fff3cd"], body.dark-mode [style*="background:#fff3cd"] { background: rgba(80, 60, 20, 0.5) !important; color: #ffd !important; border-color: rgba(200, 160, 50, 0.4) !important; }',
        'body.dark-mode [style*="background: #d4edda"], body.dark-mode [style*="background:#d4edda"] { background: rgba(20, 80, 40, 0.4) !important; color: #bfe8c8 !important; border-color: rgba(50, 180, 80, 0.4) !important; }',
        'body.dark-mode [style*="background: #d1ecf1"], body.dark-mode [style*="background:#d1ecf1"] { background: rgba(20, 60, 80, 0.4) !important; color: #b0e0f0 !important; border-color: rgba(50, 140, 200, 0.4) !important; }',
        'body.dark-mode [style*="background: #f8d7da"], body.dark-mode [style*="background:#f8d7da"] { background: rgba(80, 20, 30, 0.4) !important; color: #f0b0b8 !important; border-color: rgba(200, 50, 70, 0.4) !important; }',

        /* == Text color overrides for inline dark text styles == */
        'body.dark-mode [style*="color: #2c3e50"], body.dark-mode [style*="color:#2c3e50"] { color: #ffffff !important; }',
        'body.dark-mode [style*="color: #333"], body.dark-mode [style*="color:#333"] { color: #e0e8ff !important; }',
        'body.dark-mode [style*="color: #444"], body.dark-mode [style*="color:#444"] { color: #d0d8f0 !important; }',
        'body.dark-mode [style*="color: #555"], body.dark-mode [style*="color:#555"] { color: #c0c8e0 !important; }',
        'body.dark-mode [style*="color: #666"], body.dark-mode [style*="color:#666"], body.dark-mode [style*="color: #6c757d"], body.dark-mode [style*="color: #888"] { color: #b0c0e0 !important; }',
        'body.dark-mode [style*="color: #999"], body.dark-mode [style*="color:#999"], body.dark-mode [style*="color: #aaa"], body.dark-mode [style*="color:#aaa"] { color: #9098b0 !important; }',
        'body.dark-mode [style*="color: black"], body.dark-mode [style*="color:black"], body.dark-mode [style*="color: #000"], body.dark-mode [style*="color:#000"] { color: #e0e8ff !important; }',

        /* === DROPDOWNS & NOTIFICATIONS === */
        'body.dark-mode .dropdown-menu, body.dark-mode .notification-dropdown, body.dark-mode .user-dropdown { background: rgba(15, 25, 55, 0.98) !important; border: 1px solid rgba(102, 126, 234, 0.4) !important; box-shadow: 0 8px 32px rgba(0,0,0,0.5) !important; }',
        'body.dark-mode .dropdown-menu a, body.dark-mode .user-dropdown a { color: #e0e8ff !important; }',
        'body.dark-mode .dropdown-menu a:hover, body.dark-mode .user-dropdown a:hover { background: rgba(30, 50, 90, 0.6) !important; }',

        /* === FORMS === */
        'body.dark-mode input, body.dark-mode textarea, body.dark-mode select { background: rgba(30, 50, 90, 0.4) !important; color: #ffffff !important; border: 2px solid rgba(102, 126, 234, 0.4) !important; }',
        'body.dark-mode input:focus, body.dark-mode textarea:focus, body.dark-mode select:focus { border-color: rgba(102, 126, 234, 0.8) !important; background: rgba(30, 50, 90, 0.5) !important; }',
        'body.dark-mode input::placeholder { color: #8090c0 !important; }',
        'body.dark-mode .login-container, body.dark-mode form { background: rgba(20, 40, 80, 0.4) !important; border: 1px solid rgba(102, 126, 234, 0.3) !important; }',

        /* === BUTTONS (light-colored ones) === */
        'body.dark-mode .btn-secondary, body.dark-mode button[style*="background: #e0e0e0"], body.dark-mode button[style*="background: #f0f0f0"], body.dark-mode button[style*="background: #f8f9fa"] { background: rgba(40, 60, 100, 0.5) !important; color: #e0e8ff !important; }',

        /* === TABS === */
        'body.dark-mode .tab-btn { background: rgba(20, 40, 80, 0.4) !important; color: #e0e8ff !important; }',
        'body.dark-mode .tab-btn.active { background: rgba(102, 126, 234, 0.3) !important; color: #ffffff !important; }',
        'body.dark-mode .settings-tab-content, body.dark-mode .settings-tab { background: rgba(20, 40, 80, 0.4) !important; }',

        /* === METRICS & QUICK ACTIONS === */
        'body.dark-mode .metric-item, body.dark-mode .quick-action-btn { background: rgba(30, 50, 90, 0.4) !important; }',
        'body.dark-mode .quick-action-btn:hover { background: rgba(30, 50, 90, 0.6) !important; border-color: rgba(102, 126, 234, 0.5) !important; }',

        /* === TABLES === */
        'body.dark-mode table { border-color: rgba(102, 126, 234, 0.3) !important; }',
        'body.dark-mode tr, body.dark-mode td, body.dark-mode th { border-color: rgba(102, 126, 234, 0.2) !important; }',
        'body.dark-mode tr:nth-child(even) { background: rgba(20, 40, 80, 0.2) !important; }',
        'body.dark-mode thead, body.dark-mode th { background: rgba(20, 40, 80, 0.5) !important; color: #ffffff !important; }',

        /* === HERO === */
        'body.dark-mode .hero, body.dark-mode .hero-section { background: linear-gradient(135deg, rgba(20, 40, 80, 0.8) 0%, rgba(30, 50, 90, 0.8) 100%) !important; }',

        /* === FOOTER === */
        'body.dark-mode .footer, body.dark-mode footer { background: rgba(15, 30, 60, 0.5) !important; border-top: 1px solid rgba(102, 126, 234, 0.3) !important; }',
        'body.dark-mode .footer h3, body.dark-mode .footer h4, body.dark-mode .footer p, body.dark-mode .footer a, body.dark-mode footer h3, body.dark-mode footer h4, body.dark-mode footer p, body.dark-mode footer a { color: #e0e8ff !important; }',

        /* === MODALS === */
        'body.dark-mode .modal-content { background: #0f1a3a !important; color: #e0e8ff !important; border: 1px solid rgba(102, 126, 234, 0.4) !important; }',
        'body.dark-mode .drop-zone { background: rgba(20, 40, 80, 0.4) !important; border-color: rgba(102, 126, 234, 0.4) !important; }',

        /* === SEARCH === */
        'body.dark-mode .search-bar input { background: rgba(30, 50, 90, 0.4) !important; color: #ffffff !important; }',
        'body.dark-mode #searchSuggestions, body.dark-mode #citySuggestions { background: rgba(15, 25, 55, 0.98) !important; color: #e0e8ff !important; box-shadow: 0 8px 32px rgba(0,0,0,0.5) !important; }',

        /* === CHECKLIST ITEMS === */
        'body.dark-mode .checklist-item { background: rgba(25, 45, 85, 0.4) !important; }',

        /* === SCROLLBAR === */
        'body.dark-mode ::-webkit-scrollbar { background: #0a0e1a; }',
        'body.dark-mode ::-webkit-scrollbar-thumb { background: rgba(102, 126, 234, 0.4); border-radius: 4px; }',
        'body.dark-mode ::-webkit-scrollbar-thumb:hover { background: rgba(102, 126, 234, 0.6); }',

        /* === COMMISSION BADGE (last so it always wins) === */
        'body.dark-mode a.commission-badge, body.dark-mode .commission-badge { background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%) !important; color: #ffffff !important; border: none !important; box-shadow: 0 5px 20px rgba(74, 144, 226, 0.5) !important; }',
        'body.dark-mode .commission-badge .badge-text, body.dark-mode .commission-badge span { color: #ffffff !important; }',
        'body.dark-mode .commission-badge .badge-icon { color: #ffffff !important; }',

        /* === CATCH-ALL: Any remaining white/light backgrounds via broad selectors === */
        'body.dark-mode [style*="background-color: #f"] { background-color: rgba(25, 45, 85, 0.4) !important; color: #e0e8ff !important; }',
        'body.dark-mode [style*="background-color:#f"] { background-color: rgba(25, 45, 85, 0.4) !important; color: #e0e8ff !important; }',
    ].join('\n');

    var style = document.createElement('style');
    style.setAttribute('id', 'dark-mode-global');
    style.textContent = css;
    document.head.appendChild(style);

    // Also apply to body when DOM is ready
    if (!document.body) {
        document.addEventListener('DOMContentLoaded', function() {
            document.body.classList.add('dark-mode');
        });
    }
})();
