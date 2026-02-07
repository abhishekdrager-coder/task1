# HomeServe - 0% Commission Marketplace

A complete marketplace website connecting home service providers with service seekers. Built with HTML, CSS, and JavaScript.

## 🌟 Features

- **0% Commission**: Completely free platform for both buyers and sellers
- **Separate Login Pages**: Dedicated login pages for buyers and sellers
- **Buyer Dashboard**: Browse and search for home services
- **Seller Dashboard**: Add and manage service offerings
- **Service Marketplace**: View and connect with service providers
- **Beautiful UI**: Light purple and light maroon themed design
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 🎨 Color Theme

The website uses a light purple and light maroon color scheme:
- Light Purple: #e6d5f0, #c9a3dc, #9370db
- Light Maroon: #f5d5d8, #d8949e, #a0424d

## 🚀 How to Test Locally

### Method 1: Using Python (Recommended)

If you have Python installed:

```bash
# For Python 3.x
python3 -m http.server 8000

# For Python 2.x
python -m SimpleHTTPServer 8000
```

Then open your browser and navigate to: `http://localhost:8000`

### Method 2: Using Node.js

If you have Node.js installed:

```bash
# Install http-server globally (one-time)
npm install -g http-server

# Run the server
http-server -p 8000
```

Then open your browser and navigate to: `http://localhost:8000`

### Method 3: Using VS Code Live Server

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Method 4: Direct File Access

Simply open `index.html` in your web browser. However, some features may not work properly without a server.

## 📁 File Structure

```
task1/
├── index.html              # Homepage with 0% commission banner
├── buyer-login.html        # Login page for buyers
├── seller-login.html       # Login page for sellers
├── buyer-dashboard.html    # Buyer dashboard for browsing services
├── seller-dashboard.html   # Seller dashboard for managing services
├── services.html          # Service listing page
├── about.html             # About page
├── styles.css             # All styles with purple/maroon theme
├── script.js              # JavaScript functionality
└── README.md              # This file
```

## 🧪 Testing the Website

### Test as a Buyer:
1. Open `http://localhost:8000` in your browser
2. Click "Buyer Login" or "Find Services"
3. Enter any email and password (e.g., buyer@test.com / password)
4. Explore the buyer dashboard and browse services
5. Try contacting service providers

### Test as a Seller:
1. Open `http://localhost:8000` in your browser
2. Click "Seller Login" or "Offer Services"
3. Enter any email and password (e.g., seller@test.com / password)
4. Add new services through the seller dashboard
5. View your listed services

### Features to Test:
- ✅ Homepage with 0% commission messaging
- ✅ Separate login pages for buyers and sellers
- ✅ Buyer dashboard functionality
- ✅ Seller dashboard with service management
- ✅ Service browsing and listing
- ✅ Add/Delete services as a seller
- ✅ Contact providers as a buyer
- ✅ Light purple and maroon color theme
- ✅ Responsive design on different screen sizes

## 💡 Notes

- This is a frontend-only implementation for testing purposes
- Data is stored in browser's localStorage
- No backend or database is required for testing
- Login credentials can be anything (no validation for testing)
- The website emphasizes the "0% commission" model throughout

## 🎯 Key Highlights

- **FREE FOREVER**: No commission fees for service providers
- **Direct Connection**: Buyers and sellers connect directly
- **Easy to Use**: Simple, intuitive interface
- **Verified Services**: All service providers are verified
- **Secure Platform**: Safe and trusted marketplace

## 💻 Development with GitHub Codespaces

Working in GitHub Codespaces? See [CODESPACES_GUIDE.md](./CODESPACES_GUIDE.md) for:
- Managing context window limits
- Creating fresh Codespace environments
- Best practices for development workflow
- Troubleshooting common issues

## 📞 Support

For questions or issues, please refer to the project documentation or contact the development team.

---

**Remember**: This platform charges 0% commission! Service providers keep 100% of their earnings. 🎉
