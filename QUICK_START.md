# HomeServe - Quick Start Guide

## 🚀 How to Run the Website Locally

### Step 1: Navigate to the project directory
```bash
cd /home/runner/work/task1/task1
```

### Step 2: Start a local web server

#### Option A: Using Python (Recommended)
```bash
# For Python 3.x
python3 -m http.server 8000

# For Python 2.x
python -m SimpleHTTPServer 8000
```

#### Option B: Using Node.js
```bash
# Install http-server (one-time)
npm install -g http-server

# Run the server
http-server -p 8000
```

#### Option C: Using PHP
```bash
php -S localhost:8000
```

### Step 3: Open your browser
Navigate to: **http://localhost:8000**

---

## 🧪 Testing the Website

### Test as a Buyer:
1. Click **"Buyer Login"** or **"Find Services"**
2. Enter any email (e.g., `buyer@test.com`) and password (e.g., `password`)
3. Click **"Login as Buyer"**
4. You'll be taken to the buyer dashboard
5. Click **"View All Services"** to browse services
6. Click **"Contact"** on any service to test the contact feature

### Test as a Seller:
1. Click **"Seller Login"** or **"Offer Services"**
2. Enter any email (e.g., `seller@test.com`) and password (e.g., `password`)
3. Click **"Login as Seller"**
4. You'll be taken to the seller dashboard
5. Fill out the **"Add New Service"** form:
   - Service Name: e.g., "Professional Plumbing"
   - Category: Select from dropdown (Plumbing, Electrical, etc.)
   - Price: e.g., 50
   - Description: Enter service details
6. Click **"Add Service"** to add the service
7. Your service will appear in the **"Your Services"** section
8. Click **"Delete"** to remove a service

---

## 🎨 Features to Explore

### Homepage
- 0% Commission banner (animated)
- Feature cards explaining benefits
- Popular service categories
- How It Works section
- Beautiful purple and maroon gradient theme

### Login Pages
- Separate login pages for buyers and sellers
- Both emphasize the 0% commission model
- Links to switch between buyer/seller login

### Buyer Dashboard
- Browse services button
- Track service requests
- Saved providers section
- Messages section

### Seller Dashboard
- Add new services form
- View and manage your services
- Service requests section
- Earnings summary with 0% commission reminder

### Services Page
- Browse all available services
- Contact providers directly
- Sample services included for testing

---

## 💡 Key Features

✅ **0% Commission** - Highlighted throughout the site
✅ **Separate Login Systems** - Buyers and sellers have dedicated experiences
✅ **Service Management** - Add, view, and delete services
✅ **Responsive Design** - Works on all devices
✅ **Interactive UI** - Notifications and smooth transitions
✅ **LocalStorage** - Data persists in your browser for testing

---

## 🎨 Color Theme

The website uses a light purple and maroon color scheme:
- Light Purple: #e6d5f0, #c9a3dc, #9370db
- Light Maroon: #f5d5d8, #d8949e, #a0424d
- Gradient backgrounds throughout

---

## 📝 Notes

- This is a **frontend-only** implementation
- No backend or database required
- Login accepts **any email and password** for testing
- Data is stored in **browser localStorage**
- Perfect for testing and demonstration
- Ready for backend integration when needed

---

## 🔗 Test URL
After starting the server: **http://localhost:8000**

Enjoy testing your 0% commission marketplace! 🎉
