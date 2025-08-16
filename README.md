# 🏋️ Kamal Dallasheh - Premium Health Supplements Store

A high-quality health supplements store with a modern interface and advanced artificial intelligence.

## 🚀 Features

- **Modern Interface**: Beautiful and responsive design
- **Artificial Intelligence**: Smart chatbot for answering questions
- **Product Management**: Different categories (Protein, Creatine, Vegan)
- **Favorites System**: Save your favorite products
- **Shopping Cart**: Manage your purchases
- **Login System**: Secure personal account
- **Muscle Icon**: Distributed throughout the website

## 🛠️ Installation and Setup

### Requirements
- Node.js (v18 or later)
- MongoDB
- npm or yarn

### Installation Steps

1. **Clone the Project**
```bash
git clone <repository-url>
cd shop-protien
```

2. **Install Dependencies**
```bash
# Install main project dependencies
npm install

# Install frontend dependencies
cd client && npm install

# Install server dependencies
cd ../server && npm install
```

3. **Database Setup**
```bash
# Make sure MongoDB is running
mongod

# In the main project folder
curl -X POST http://localhost:5000/api/seed
```

4. **Run the Project**

**Method One (Single Folder):**
```bash
# In the main project folder
npm run dev        # Run frontend
npm run server     # Run server
```

**Method Two (Separate Folders):**
```bash
# Run server
cd server && npm start

# In a new terminal, run frontend
cd client && npm run dev
```

## 🌐 Access the Website

- **Frontend**: http://localhost:8080 (or 8081, 8082 if ports are busy)
- **Server**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 📊 Database

### Available Products

#### 🥛 Protein
- Clear Whey Protein Powder - 174.22 ₪
- Impact Whey Isolate Powder - 153.00 ₪
- Impact Diet Whey - 187.68 ₪

#### ⚡ Creatine
- Impact Creatine - 32.85 ₪
- Creatine Monohydrate Powder - 45.99 ₪
- Creatine HCL Capsules - 67.50 ₪

#### 🌱 Vegan
- Vegan Protein Powder - 89.99 ₪
- Vegan BCAA - 56.99 ₪

#### 📦 Special Bundles
- The Vegan Starter Kit - 199.99 ₪
- LIFELINE Boxes (Performance Box) - 299.99 ₪
- Fitness Supplements (Starter Pack Bundle) - 249.99 ₪

## 🤖 Smart Chatbot

The chatbot can:
- Calculate body fat percentage
- Calculate Body Mass Index (BMI)
- Provide personalized advice
- Create workout plans
- Give nutritional guidance
- Recommend suitable products
- Answer fitness and nutrition questions

## 🔧 Troubleshooting Common Issues

### Issue: Product pages are empty
**Solution:**
1. Make sure the server is running: `cd server && npm start`
2. Make sure MongoDB is running
3. Reload the data: `curl -X POST http://localhost:5000/api/seed`
4. Check browser console for errors

### Issue: Images don't appear
**Solution:**
1. Make sure the `server/public/assets` folder exists
2. Check that the server is running on port 5000
3. Test images: `curl http://localhost:5000/assets/protein-clear.jpg`

### Issue: Chatbot doesn't work
**Solution:**
1. Make sure `.env` file is set up in the `server` folder
2. Add OpenAI API key (optional)
3. Chatbot works without OpenAI API as well

### Issue: Can't log in
**Solution:**
1. Create a new account: `curl -X POST http://localhost:5000/api/auth/register`
2. Or use the test account:
   - Email: kamal@example.com
   - Password: password123

### Issue: Muscle icon doesn't appear
**Solution:**
1. Make sure `muscle-icon.png` is in `client/public/`
2. Refresh the page (Ctrl+F5 or Cmd+Shift+R)
3. Clear browser cache

## 📁 Project Structure

```
shop-protien/
├── client/                 # Frontend (React)
│   ├── src/
│   │   ├── components/     # Components
│   │   ├── pages/         # Pages
│   │   ├── contexts/      # State management
│   │   └── assets/        # Images and static files
│   ├── public/            # Public assets
│   └── package.json
├── server/                 # Backend (Node.js/Express)
│   ├── routes/            # API routes
│   ├── models/            # Database models
│   ├── public/assets/     # Images
│   └── package.json
├── package.json           # Main project settings
└── README.md
```

## 🎨 Visual Features

- **Muscle Icon**: Distributed throughout the website
- **Animations**: Smooth transitions and visual effects
- **Responsive Design**: Works on all devices
- **Consistent Colors**: Unified color system
- **Modern UI**: Clean and professional design

## 🔐 Security

- **JWT Authentication**: Secure login
- **Password Hashing**: Encrypted passwords
- **CORS Protection**: Protection from unauthorized requests
- **Input Validation**: Input verification

## 🛒 Shopping Features

- **Add to Cart**: Easy product addition
- **Favorites**: Save products for later
- **Product Details**: Comprehensive product information
- **Category Filtering**: Browse by category
- **Search Functionality**: Find products quickly
- **Share Products**: Share on social media

## 📱 User Experience

- **Sticky Header**: Always accessible navigation
- **Smooth Scrolling**: Seamless page navigation
- **Loading States**: Visual feedback during operations
- **Error Handling**: User-friendly error messages
- **Responsive Design**: Works on mobile and desktop

## 📈 Future Development

- [ ] Electronic payment system
- [ ] Mobile application
- [ ] Advanced rating system
- [ ] Smart recommendations
- [ ] Loyalty program
- [ ] Inventory management
- [ ] Multi-language support
- [ ] Advanced analytics

## 👨‍💻 Developer

**Kamal Dallasheh**
- High-quality health supplements store
- Modern and easy-to-use interface
- Smart customer support

## 📞 Support

For help or inquiries:
- Open an issue on GitHub
- Or contact the developer directly

## 🚀 Quick Start

```bash
# Clone and setup
git clone <repository-url>
cd shop-protien
npm install
cd client && npm install
cd ../server && npm install

# Start the application
cd ..
npm run dev        # Frontend
npm run server     # Backend

# Access the website
# Frontend: http://localhost:8080
# Backend: http://localhost:5000
```

---

**🏋️ Transform your fitness journey with premium supplements! 💪**
