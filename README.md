# 🏪 Kamal Dallasheh - Premium Health Supplements Store

A modern, full-stack e-commerce platform for health supplements built with React, TypeScript, and Express.js. Features an intelligent AI chatbot, comprehensive product management, and a seamless shopping experience.

![Project Banner](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-18-green?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green?style=for-the-badge&logo=mongodb)

## 📋 Table of Contents

- [🚀 Features](#-features)
- [🛠️ Technology Stack](#️-technology-stack)
- [📁 Project Structure](#-project-structure)
- [⚡ Quick Start](#-quick-start)
- [🔧 Installation](#-installation)
- [🎯 Core Concepts](#-core-concepts)
- [🤖 AI Chatbot Features](#-ai-chatbot-features)
- [🛒 Shopping Features](#-shopping-features)
- [📱 UI/UX Features](#-uiux-features)
- [🔌 API Endpoints](#-api-endpoints)
- [🗄️ Database Schema](#️-database-schema)
- [🎨 Design System](#-design-system)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## 🚀 Features

### 🛒 **E-commerce Core**
- ✅ **Product Catalog** - Comprehensive product listings with categories
- ✅ **Smart Search** - Real-time product search with filters
- ✅ **Shopping Cart** - Persistent cart with quantity management
- ✅ **User Authentication** - Secure login/register system
- ✅ **Favorites System** - Save and manage favorite products
- ✅ **Product Ratings** - Star ratings and review system
- ✅ **Category Navigation** - Dynamic category-based browsing

### 🤖 **AI-Powered Chatbot**
- ✅ **Intelligent Responses** - ChatGPT-like fitness advice
- ✅ **Body Fat Calculator** - US Navy method calculations
- ✅ **BMI Calculator** - Body mass index analysis
- ✅ **Personalized Workout Plans** - Beginner to advanced programs
- ✅ **Nutrition Guidance** - Comprehensive meal planning
- ✅ **Supplement Recommendations** - AI-powered product suggestions
- ✅ **Motivational Messages** - Encouraging fitness coaching

### 📱 **Modern UI/UX**
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Sticky Header** - Always accessible navigation
- ✅ **Smooth Animations** - CSS animations and transitions
- ✅ **Dark/Light Mode** - Theme switching capability
- ✅ **Loading States** - Skeleton screens and spinners
- ✅ **Toast Notifications** - User feedback system

### 🔧 **Technical Excellence**
- ✅ **TypeScript** - Full type safety
- ✅ **Performance Optimized** - Lazy loading and code splitting
- ✅ **SEO Friendly** - Meta tags and structured data
- ✅ **Accessibility** - WCAG compliant
- ✅ **Error Handling** - Comprehensive error management
- ✅ **Security** - JWT authentication, input validation

## 🛠️ Technology Stack

### **Frontend**
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Beautiful component library
- **React Router DOM** - Client-side routing
- **React Query** - Server state management
- **Axios** - HTTP client for API calls
- **Lucide React** - Beautiful icons

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration

### **AI Integration**
- **OpenAI API** - GPT-3.5-turbo integration
- **Custom Logic** - Fallback responses when API unavailable

### **Development Tools**
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Git** - Version control
- **npm** - Package management

## 📁 Project Structure

```
shop-protien/
├── 📁 client/                          # Frontend React application
│   ├── 📁 src/
│   │   ├── 📁 components/              # Reusable UI components
│   │   │   ├── Header.tsx              # Navigation header
│   │   │   ├── HeroBanner.tsx          # Hero section
│   │   │   ├── ProductCard.tsx         # Product display card
│   │   │   ├── CategoryCards.tsx       # Category navigation
│   │   │   ├── BestSellers.tsx         # Featured products
│   │   │   ├── Chatbot.tsx             # AI chatbot interface
│   │   │   ├── ChatbotButton.tsx       # Floating chat button
│   │   │   └── ShareProduct.tsx        # Social sharing modal
│   │   ├── 📁 pages/                   # Page components
│   │   │   ├── Index.tsx               # Homepage
│   │   │   ├── ProductDetail.tsx       # Product details
│   │   │   ├── Cart.tsx                # Shopping cart
│   │   │   ├── Favorites.tsx           # User favorites
│   │   │   ├── CategoryProducts.tsx    # Category listings
│   │   │   ├── Login.tsx               # User authentication
│   │   │   └── Register.tsx            # User registration
│   │   ├── 📁 contexts/                # React Context providers
│   │   │   ├── SearchContext.tsx       # Search state management
│   │   │   ├── CartContext.tsx         # Cart state management
│   │   │   └── FavoritesContext.tsx    # Favorites state management
│   │   ├── 📁 hooks/                   # Custom React hooks
│   │   ├── 📁 utils/                   # Utility functions
│   │   ├── 📁 assets/                  # Static assets (images)
│   │   ├── App.tsx                     # Main application component
│   │   ├── main.tsx                    # Application entry point
│   │   └── index.css                   # Global styles
│   ├── 📁 public/                      # Public assets
│   ├── package.json                    # Frontend dependencies
│   ├── vite.config.ts                  # Vite configuration
│   └── tsconfig.json                   # TypeScript configuration
├── 📁 server/                          # Backend Express.js application
│   ├── 📁 models/                      # MongoDB schemas
│   │   ├── Product.js                  # Product data model
│   │   ├── User.js                     # User data model
│   │   └── Cart.js                     # Cart data model
│   ├── 📁 routes/                      # API route handlers
│   │   ├── products.js                 # Product endpoints
│   │   ├── auth.js                     # Authentication endpoints
│   │   ├── cart.js                     # Cart endpoints
│   │   └── chatbot.js                  # AI chatbot endpoints
│   ├── 📁 config/                      # Configuration files
│   │   └── database.js                 # MongoDB connection
│   ├── 📁 seed/                        # Database seeding
│   │   └── seedData.js                 # Initial product data
│   ├── 📁 public/                      # Static file serving
│   │   └── 📁 assets/                  # Product images
│   ├── index.js                        # Server entry point
│   ├── package.json                    # Backend dependencies
│   └── .env                            # Environment variables
├── 📁 docs/                            # Documentation
├── package.json                        # Root package.json
├── tailwind.config.ts                  # Tailwind CSS configuration
├── postcss.config.js                   # PostCSS configuration
├── vite.config.ts                      # Root Vite configuration
└── README.md                           # Project documentation
```

## ⚡ Quick Start

### **Prerequisites**
- Node.js 18+ 
- npm 9+
- MongoDB (local or cloud)

### **1. Clone the Repository**
```bash
git clone <repository-url>
cd shop-protien
```

### **2. Install Dependencies**
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd client && npm install

# Install backend dependencies
cd ../server && npm install
```

### **3. Environment Setup**
```bash
# Create environment file
cd server
cp .env.example .env

# Edit .env with your configuration
MONGODB_URI=mongodb://localhost:27017/shop-protein
PORT=5000
JWT_SECRET=your-secret-key-here
OPENAI_API_KEY=your-openai-api-key-here
```

### **4. Database Setup**
```bash
# Start MongoDB (if local)
mongod

# Seed the database
curl -X POST http://localhost:5000/api/seed
```

### **5. Start Development Servers**
```bash
# Terminal 1: Start backend server
cd server && npm start

# Terminal 2: Start frontend development server
cd client && npm run dev
```

### **6. Access the Application**
- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 🔧 Installation

### **Detailed Setup Instructions**

#### **Backend Setup**
```bash
cd server

# Install dependencies
npm install

# Create environment file
echo "MONGODB_URI=mongodb://localhost:27017/shop-protein
PORT=5000
JWT_SECRET=your-secret-key-here
OPENAI_API_KEY=your-openai-api-key-here" > .env

# Start the server
npm start
```

#### **Frontend Setup**
```bash
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```

#### **Database Setup**
```bash
# Install MongoDB (macOS with Homebrew)
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb/brew/mongodb-community

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in .env with your Atlas connection string
```

## 🎯 Core Concepts

### **1. Monorepo Architecture**
The project uses a monorepo structure with separate `client` and `server` directories, allowing for:
- **Shared configuration** at the root level
- **Independent development** of frontend and backend
- **Unified build process** with root-level scripts
- **Consistent tooling** across the entire project

### **2. State Management**
- **React Context API** for global state (cart, favorites, search)
- **Local State** for component-specific data
- **Server State** managed with React Query for API calls
- **Persistent Storage** using localStorage for user sessions

### **3. Component Architecture**
- **Atomic Design** principles with reusable components
- **Composition over Inheritance** for flexible component reuse
- **Props Interface** definitions for type safety
- **Custom Hooks** for logic extraction and reuse

### **4. API Design**
- **RESTful Architecture** with clear endpoint naming
- **JWT Authentication** for secure user sessions
- **Error Handling** with consistent response formats
- **Input Validation** using Mongoose schemas

## 🤖 AI Chatbot Features

### **Intelligent Responses**
The chatbot provides comprehensive fitness guidance including:

#### **Body Fat Calculation**
- US Navy method for accurate body fat percentage
- Separate formulas for men and women
- Body fat categories and interpretation
- Measurement tips and best practices

#### **BMI Analysis**
- Body Mass Index calculation
- BMI categories and health implications
- Limitations and considerations
- Healthy weight management advice

#### **Personalized Workout Plans**
- **Beginner Programs** (3-6 months experience)
- **Intermediate Programs** (6+ months experience)
- **Advanced Programs** (1+ years experience)
- Exercise selection and progression guidelines

#### **Nutrition Guidance**
- Macro breakdown by fitness goals
- Sample meal plans for muscle building
- Supplement timing and dosages
- Hydration guidelines

#### **Motivational Coaching**
- Random motivational messages
- Progress tracking strategies
- Goal-setting guidance
- Consistency encouragement

### **Technical Implementation**
```javascript
// Example chatbot response structure
{
  response: "Comprehensive fitness advice...",
  products: [/* recommended products */],
  timestamp: "2024-01-01T00:00:00.000Z"
}
```

## 🛒 Shopping Features

### **Product Management**
- **Category-based browsing** (Protein, Creatine, Vegan, etc.)
- **Advanced search** with real-time filtering
- **Product ratings** and review system
- **Detailed product pages** with specifications

### **Shopping Cart**
- **Persistent cart** across browser sessions
- **Quantity management** with real-time updates
- **Cart summary** with totals and shipping
- **Checkout process** (payment integration ready)

### **User Features**
- **User registration** and authentication
- **Favorites system** for saved products
- **Order history** and tracking
- **Profile management**

### **Social Features**
- **Product sharing** on social media
- **WhatsApp integration** for easy sharing
- **Instagram sharing** capabilities
- **Copy link** functionality

## 📱 UI/UX Features

### **Responsive Design**
- **Mobile-first** approach
- **Breakpoint system** for all screen sizes
- **Touch-friendly** interface elements
- **Optimized performance** on all devices

### **Modern Animations**
```css
/* Custom animations in index.css */
@keyframes fade-in { /* ... */ }
@keyframes slide-in-right { /* ... */ }
@keyframes pulse-glow { /* ... */ }
@keyframes float { /* ... */ }
@keyframes sparkle { /* ... */ }
@keyframes typing { /* ... */ }
```

### **Interactive Elements**
- **Hover effects** on buttons and cards
- **Loading states** with skeleton screens
- **Toast notifications** for user feedback
- **Smooth scrolling** between sections

### **Accessibility**
- **WCAG 2.1** compliance
- **Keyboard navigation** support
- **Screen reader** compatibility
- **High contrast** mode support

## 🔌 API Endpoints

### **Authentication**
```http
POST /api/auth/register     # User registration
POST /api/auth/login        # User login
GET  /api/auth/me           # Get current user
PUT  /api/auth/profile      # Update user profile
POST /api/auth/favorites/:productId    # Add to favorites
DELETE /api/auth/favorites/:productId  # Remove from favorites
GET  /api/auth/favorites    # Get user favorites
```

### **Products**
```http
GET    /api/products                    # Get all products
GET    /api/products/:id                # Get product by ID
GET    /api/products/category/:category # Get products by category
POST   /api/products                    # Create product (admin)
PUT    /api/products/:id                # Update product (admin)
DELETE /api/products/:id                # Delete product (admin)
DELETE /api/products/clear/all          # Clear all products
```

### **Cart**
```http
GET    /api/cart                        # Get user cart
POST   /api/cart                        # Add item to cart
PUT    /api/cart/:itemId                # Update cart item
DELETE /api/cart/:itemId                # Remove cart item
DELETE /api/cart                        # Clear cart
GET    /api/cart/count                  # Get cart item count
```

### **Chatbot**
```http
POST /api/chatbot/chat                  # Send message to AI
GET  /api/chatbot/history               # Get chat history
```

### **System**
```http
GET /api/health                         # Server health check
POST /api/seed                          # Seed database
```

## 🗄️ Database Schema

### **Product Schema**
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  price: String,
  originalPrice: String,
  category: {
    type: String,
    enum: ['protein', 'creatine', 'vitamins', 'vegan']
  },
  image: String,
  rating: Number,
  reviewCount: Number,
  nutritionFacts: Object,
  createdAt: Date,
  updatedAt: Date
}
```

### **User Schema**
```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  phone: String,
  favorites: [ObjectId], // Product references
  isAdmin: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### **Cart Schema**
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  items: [{
    productId: ObjectId,
    quantity: Number,
    price: String
  }],
  total: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 Design System

### **Color Palette**
```css
/* Primary Colors */
--primary: 221.2 83.2% 53.3%;        /* Blue */
--primary-foreground: 210 40% 98%;   /* White */

/* Accent Colors */
--accent: 210 40% 96%;               /* Light Blue */
--accent-foreground: 222.2 84% 4.9%; /* Dark Gray */

/* Background Colors */
--background: 0 0% 100%;             /* White */
--foreground: 222.2 84% 4.9%;        /* Black */

/* Status Colors */
--destructive: 0 84.2% 60.2%;        /* Red */
--success: 142 76% 36%;              /* Green */
--warning: 38 92% 50%;               /* Yellow */
```

### **Typography**
- **Font Family**: System fonts (San Francisco, Segoe UI, etc.)
- **Font Sizes**: Tailwind's responsive scale
- **Font Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold), 900 (extrabold)

### **Spacing System**
- **Base Unit**: 4px (0.25rem)
- **Scale**: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64

### **Component Library**
Built with **Shadcn/ui** components:
- Button, Input, Card, Badge
- Dialog, Dropdown, Toast
- Form components with validation
- Loading and skeleton components

## 🚀 Deployment

### **Frontend Deployment (Vercel)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from client directory
cd client
vercel

# Or connect GitHub repository for automatic deployments
```

### **Backend Deployment (Railway/Render)**
```bash
# Set environment variables
MONGODB_URI=your-mongodb-atlas-uri
JWT_SECRET=your-secret-key
OPENAI_API_KEY=your-openai-key

# Deploy using platform-specific commands
```

### **Database Deployment (MongoDB Atlas)**
1. Create MongoDB Atlas account
2. Create new cluster
3. Configure network access
4. Create database user
5. Get connection string
6. Update environment variables

### **Environment Variables**
```bash
# Production environment variables
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-super-secret-key
OPENAI_API_KEY=sk-...
CORS_ORIGIN=https://yourdomain.com
```

## 🤝 Contributing

### **Development Workflow**
1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Test** thoroughly
5. **Commit** with descriptive messages
6. **Push** to your branch
7. **Create** a pull request

### **Code Standards**
- **TypeScript** for type safety
- **ESLint** for code quality
- **Prettier** for formatting
- **Conventional commits** for commit messages
- **Component documentation** with JSDoc

### **Testing**
```bash
# Run frontend tests
cd client && npm test

# Run backend tests
cd server && npm test

# Run e2e tests
npm run test:e2e
```

## 📄 License

This project is private and proprietary to Kamal Dallasheh.

---

## 🎯 **Quick Commands Reference**

### **Development**
```bash
# Start both servers
npm run dev

# Start frontend only
cd client && npm run dev

# Start backend only
cd server && npm start

# Build for production
cd client && npm run build
```

### **Database**
```bash
# Seed database
curl -X POST http://localhost:5000/api/seed

# Clear all products
curl -X DELETE http://localhost:5000/api/products/clear/all

# Health check
curl http://localhost:5000/api/health
```

### **Testing**
```bash
# Test chatbot
curl -X POST http://localhost:5000/api/chatbot/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"How do I calculate body fat?"}'
```

---

**Built with ❤️ by Kamal Dallasheh**

*For support and questions, please contact the development team.*
