# � BeverHub - Service Marketplace Platform

[![GitHub Pages](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge&logo=github)](https://abhishekdrager-coder.github.io/task1/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

A comprehensive service marketplace connecting customers with skilled service providers. Competitor to TaskRabbit, Sitly, and Urban Company.

> **⚠️ Note**: This is a frontend demo/prototype for portfolio and learning purposes. Not production-ready. See [SECURITY.md](SECURITY.md) for details.

## ✨ Features

### For Customers
- Browse 100+ service categories (Home Services, Beauty, Tutoring, etc.)
- Search for specific services
- View provider profiles, ratings, and reviews
- Secure booking and payment system
- Track service status in real-time

### For Service Providers
- Dedicated provider registration portal
- Flexible work schedule
- Set your own rates
- Access to large customer base
- Insurance coverage

## Services Offered

- **Home Services**: Cleaning, Plumbing, Electrical, Carpentry, Painting, AC Repair
- **Personal Care**: Beauty & Salon, Fitness Training
- **Education**: Tutoring, Skills Training
- **Childcare**: Babysitting, Nanny Services
- **Maintenance**: Pest Control, Moving & Packing

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Design**: Responsive, Mobile-First, Dark Mode Support
- **Storage**: LocalStorage (client-side only)
- **Hosting**: GitHub Pages
- **Icons**: Font Awesome 6.4.0

## 📱 Pages

### Customer Portal
- `index.html` - Main landing page with service categories
- `services.html` - Browse all services
- `customer-dashboard.html` - Customer dashboard
- `customer-bookings.html` - Booking management
- `customer-profile.html` - Profile settings
- `customer-settings.html` - Preferences and settings

### Provider Portal
- `service-provider-login.html` - Provider registration and login
- `provider.html` - Provider dashboard
- `provider-bookings.html` - Booking management
- `provider-services.html` - Service management
- `provider-earnings.html` - Earnings and analytics
- `provider-settings.html` - Settings with dark mode
- `provider-availability.html` - Schedule management
- `provider-profile.html` - Profile editing

### Information Pages
- `about.html` - About us
- `contact.html` - Contact information
- `help.html` - Help center
- `terms.html` - Terms of service
- `safety.html` - Safety guidelines
- `careers.html` - Career opportunities

## 🚀 Getting Started

### Local Development

#### Option A – One-command launcher (auto-detects port)
```bash
# Start the server and get your launch link in one step
./launch.sh
```
The script checks whether a server is already listening and prints the exact URL to paste in your browser. If no server is running it starts one automatically on the first available port (default 8000).

#### Option B – Manual terminal commands
```bash
# Clone the repository
git clone https://github.com/abhishekdrager-coder/task1.git
cd task1

# Start a local server
python3 -m http.server 8000

# Open in browser – paste this link
echo "http://localhost:8000"
```

#### Check which port is already listening
```bash
# List all locally listening ports (pick the one serving this project)
lsof -iTCP -sTCP:LISTEN -P | grep python
# or
ss -tlnp | grep python
```
Then open `http://localhost:<PORT>` in your browser.

### GitHub Pages Deployment
See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## 🔒 Security

**This is a demo application** - See [SECURITY.md](SECURITY.md) for:
- Current security measures
- Known limitations
- Production requirements
- Best practices

**Safe for GitHub Pages**: No API keys, passwords, or secrets in code.

## 🗺️ Development Roadmap

### Phase 1: Frontend (Current) ✅
- [x] Responsive landing page
- [x] Service categories and search
- [x] Provider and customer dashboards
- [x] Settings with dark mode
- [x] Profile management UI
- [x] Booking UI mockups

### Phase 2: Backend (Required for Production)
- [ ] Node.js/Python backend API
- [ ] PostgreSQL/MongoDB database
- [ ] JWT authentication
- [ ] Real-time booking system
- [ ] Payment gateway (Stripe/PayPal)
- [ ] Email notifications
- [ ] SMS alerts

### Phase 3: Advanced Features
- [ ] Rating and review system
- [ ] Real-time chat
- [ ] Video consultations
- [ ] AI-powered provider matching
- [ ] Mobile app (React Native)
- [ ] Admin panel
- [ ] Analytics dashboard

### Phase 4: Scaling
- [ ] Multi-language support
- [ ] Multi-currency support
- [ ] Subscription plans
- [ ] Loyalty rewards program
- [ ] API for third-party integrations

## 🎨 Features Showcase

### ⭐ Dark Mode
Complete dark theme support with instant toggle, persists across sessions.

### 📊 Analytics Dashboard
Provider earnings tracking with visual charts and insights.

### 📅 Smart Scheduling
Advanced availability management with recurring schedules.

### 🔔 Notification System
Customizable notification preferences for all user types.

### 💾 Export/Import Settings
Backup and restore settings across devices.

## 📸 Screenshots

> Add screenshots of your application here

## 🤝 Contributing

This is a personal portfolio project. Feel free to fork and customize for your own use.

## 📄 License

This project is open source for educational purposes. Not licensed for commercial use without proper backend implementation.

## 👨‍💻 Author

**Abhishek Drager**
- GitHub: [@abhishekdrager-coder](https://github.com/abhishekdrager-coder)

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Inspiration from TaskRabbit, Urban Company, and similar platforms

## 📞 Support

For questions or issues:
1. Check [SECURITY.md](SECURITY.md) for security concerns
2. See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment help
3. Open an issue on GitHub

---

**⚠️ Disclaimer**: This is a demo/prototype for portfolio purposes. Not suitable for production use without significant backend development and security implementation.

© 2026 BeverHub. Educational Project.

