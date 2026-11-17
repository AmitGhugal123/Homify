# 🏠 HOMIFY - Complete Project Overview & Interview Guide

---

## 📌 **Executive Summary**

**Homify** is a **full-stack rental property web application** inspired by Airbnb. It's a production-ready Node.js application that enables users to browse property listings, upload properties, manage their profile, leave reviews with ratings, and maintain a wishlist of favorite properties. The application demonstrates modern web development practices with secure authentication, cloud-based image storage, and scalable deployment architecture.

**Live Demo:** https://homify-mtkz.onrender.com/  
**Repository:** GitHub available  
**Status:** Production-ready with Docker and Render deployment support  

---

## 🛠️ **Technology Stack**

### **Backend**
- **Node.js v22.x** - JavaScript runtime environment
- **Express.js v5.1.0** - Web application framework
- **MongoDB** - NoSQL database (Cloud Atlas or Local)
- **Mongoose v8.17.1** - MongoDB object modeling

### **Frontend**
- **EJS (Embedded JavaScript)** - Server-side template engine
- **HTML5** - Markup language
- **CSS3** - Styling with Bootstrap integration
- **JavaScript (ES6+)** - Client-side interactivity
- **Bootstrap** - Responsive UI framework

### **Authentication & Authorization**
- **Passport.js v0.7.0** - Authentication middleware
- **Passport-Local** - Username/password strategy
- **Passport-Local-Mongoose** - MongoDB integration with password hashing
- **express-session** - Session management
- **connect-mongo** - MongoDB session store

### **File & Image Management**
- **Cloudinary** - Cloud-based image storage and CDN
- **Multer v2.0.2** - File upload middleware
- **multer-storage-cloudinary** - Multer adapter for Cloudinary

### **Security & Infrastructure**
- **Helmet** - HTTP headers security
- **express-rate-limit** - API rate limiting
- **dotenv** - Environment variable management
- **method-override** - HTTP method override (PUT/DELETE support)
- **connect-flash** - Flash message system for user feedback

### **Utilities**
- **joi** - Data schema validation
- **ejs-mate** - EJS layout engine

### **Deployment**
- **Docker** - Containerization (multi-stage build)
- **Render** - Cloud hosting platform

---

## 🏗️ **Application Architecture**

### **High-Level Architecture**
```
┌─────────────────────┐
│   CLIENT (Browser)  │  ← EJS Templates + Bootstrap + JS
├─────────────────────┤
│   Express Server    │  ← Node.js + Passport
│  (Routes/Handlers)  │
├─────────────────────┤
│   Controllers       │  ← Business Logic
├─────────────────────┤
│   Mongoose Models   │  ← Data Models
├─────────────────────┤
│   MongoDB Database  │  ← Data Persistence
└─────────────────────┘
     ↕ (Cloud Storage)
   Cloudinary (Images)
```

### **MVC Pattern Implementation**

#### **Models (models/)**
- **Listing.js** - Property listings schema
- **User.js** - User accounts with authentication
- **Review.js** - Reviews and ratings system

#### **Controllers (controllers/)**
- **listing.js** - CRUD operations for listings
- **user.js** - Authentication and user management
- **review.js** - Review and rating management

#### **Routes (routes/)**
- **listing.js** - Property listing endpoints
- **user.js** - Authentication endpoints
- **review.js** - Review endpoints
- **wishlist.js** - Wishlist functionality

#### **Views (views/)**
- **EJS templates** with Bootstrap styling
- **Layouts** using ejs-mate for consistency
- **Includes** for reusable components (navbar, footer, flash messages)

---

## 📊 **Database Schema**

### **1. User Schema**
```javascript
{
  username: String (required),
  email: String (required, unique),
  password: String (hashed by Passport-Local-Mongoose),
  isAdmin: Boolean (default: false)
}
```
**Authentication:** Passport-Local-Mongoose handles password hashing and verification

### **2. Listing Schema**
```javascript
{
  title: String (required) - searchable,
  description: String - searchable,
  image: {
    url: String (Cloudinary URL),
    filename: String
  },
  price: Number,
  location: String - searchable,
  country: String - searchable,
  reviews: [ObjectId] (array of Review references),
  owner: ObjectId (User reference),
  createdAt: Date (auto),
  amenities: Array (optional)
}
```
**Relationships:** 
- One User owns many Listings
- One Listing has many Reviews
- Cascade delete: Deleting listing removes all reviews

### **3. Review Schema**
```javascript
{
  comment: String,
  rating: Number (1-5, validated),
  createdAt: Date (default: now),
  author: ObjectId (User reference)
}
```
**Relationships:** Many reviews for one Listing, many reviews by one User

---

## 🎯 **Key Features & Functionality**

### **1. Authentication & Authorization**
- **Signup** - New user registration with email validation
- **Login** - Secure password authentication via Passport
- **Logout** - Session termination
- **Protected Routes** - Middleware ensures authenticated access
- **Admin Dashboard** - Role-based access control (ADMIN_EMAIL env var)
- **Redirect After Login** - Saves intended destination before login

### **2. Listing Management**
- **View All Listings** - Browse all properties
- **Search Functionality** - Search by title, location, country, description (regex-based, case-insensitive)
- **Price Filtering** - Min/max price range filtering
- **Create Listing** - Upload property with images (Cloudinary)
- **Edit Listing** - Modify property details
- **Delete Listing** - Remove property (cascade deletes reviews)
- **Listing Details** - View full property info + reviews

### **3. Review System**
- **Add Reviews** - Leave comments and ratings (1-5 stars)
- **View Reviews** - See all reviews for a property
- **Author Info** - Display reviewer name with each review
- **Timestamp** - Review creation date tracking

### **4. Wishlist Feature**
- **Save to Wishlist** - Client-side localStorage storage
- **View Wishlist** - Dedicated wishlist page
- **Persistent Storage** - Wishlist survives browser refresh
- **Cross-Tab Sync** - localStorage events sync across tabs
- **Quick Toggle** - Heart icon toggle for adding/removing

### **5. User Experience Features**
- **Flash Messages** - User feedback for actions
- **Responsive Design** - Mobile-friendly Bootstrap layout
- **Error Handling** - Custom error pages with messages
- **Input Validation** - Both client and server-side (joi schemas)
- **Rate Limiting** - Prevent abuse (100 requests/15min general, 5 login attempts)

---

## 🔐 **Security Features**

### **1. Authentication**
- Passport.js authentication with local strategy
- Password-local-mongoose handles secure password hashing (bcrypt)
- Session-based authentication with secure cookies

### **2. Authorization**
- `isLoggedIn` middleware - Requires authentication
- `isOwner` middleware - Ensures user owns resource
- `isAdmin` middleware - Admin-only access control
- Redirect URL preservation for post-login navigation

### **3. Data Validation**
- Joi schema validation for listing and review data
- MongoDB ObjectId validation
- Input sanitization through middleware

### **4. Security Headers**
- Helmet.js implements HTTP security headers
- Content Security Policy (CSP) configured for:
  - Script sources (self, unsafe-inline, CDN)
  - Style sources (self, unsafe-inline, Google Fonts)
  - Font sources (Cloudinary, Google)
  - Image sources (self, data, https, Cloudinary)

### **5. Network Security**
- Express-rate-limit prevents DDoS and brute force
  - General limit: 100 requests per 15 minutes
  - Auth limit: 5 login attempts per 15 minutes
- HTTPS ready (trust proxy for Render)
- Secure session cookies (production environment)

### **6. Cloud Security**
- Cloudinary handles image security and CDN distribution
- Non-root Docker user for container security
- Environment variables for sensitive data (.env)

---

## 📁 **Project Directory Structure & Purpose**

```
Major project/
├── app.js                          # Express server entry point
├── middleware.js                   # Authentication & authorization middleware
├── schema.js                       # Joi validation schemas
├── package.json                    # Dependencies & scripts
├── Dockerfile                      # Multi-stage Docker build
├── docker-compose.yml              # Docker services orchestration
├── render.yaml                     # Render deployment config
├── .env                            # Environment variables (not tracked)
│
├── models/                         # Mongoose schemas
│   ├── listing.js                  # Listing model with reviews ref
│   ├── user.js                     # User model with Passport plugin
│   └── review.js                   # Review model with ratings
│
├── controllers/                    # Business logic handlers
│   ├── listing.js                  # CRUD operations for listings
│   ├── user.js                     # Authentication handlers
│   ├── review.js                   # Review handlers
│   └── wishlist.js                 # Wishlist handlers
│
├── routes/                         # API endpoints
│   ├── listing.js                  # GET/POST/PUT/DELETE listings
│   ├── user.js                     # Signup/Login/Logout
│   ├── review.js                   # Add/Delete reviews
│   └── wishlist.js                 # Wishlist endpoints
│
├── utils/                          # Helper functions
│   ├── cloudConfig.js              # Cloudinary configuration
│   ├── ExpressError.js             # Custom error class
│   └── wrapAsync.js                # Async error wrapper
│
├── views/                          # EJS templates
│   ├── home.ejs                    # Landing page
│   ├── error.ejs                   # Error pages
│   ├── layouts/
│   │   └── boilerplate.ejs         # Master layout template
│   ├── includes/
│   │   ├── navbar.ejs              # Navigation bar
│   │   ├── footer.ejs              # Footer
│   │   └── flash-modern.ejs        # Flash messages UI
│   ├── listings/
│   │   ├── index.ejs               # All listings view
│   │   ├── show.ejs                # Single listing detail
│   │   ├── new.ejs                 # Create listing form
│   │   └── edit.ejs                # Edit listing form
│   ├── users/
│   │   ├── login.ejs               # Login page
│   │   └── signup.ejs              # Signup page
│   ├── wishlist/
│   │   └── index.ejs               # Wishlist page
│   ├── admin/
│   │   └── index.ejs               # Admin dashboard
│   └── legal/
│       ├── terms.ejs               # Terms of service
│       └── privacy.ejs             # Privacy policy
│
├── public/                         # Client-side assets
│   ├── css/
│   │   ├── app.css                 # Main styles
│   │   ├── pages.css               # Page-specific styles
│   │   ├── rating.css              # Rating component styles
│   │   └── shell.css               # Base shell styles
│   └── js/
│       ├── app.js                  # Main client script
│       ├── wishlist.js             # Wishlist manager
│       └── wishlist-page.js        # Wishlist page logic
│
├── init/                           # Database initialization
│   ├── data.js                     # Sample data
│   └── index.js                    # Seed script
│
├── tests/                          # Test files (reserved)
│
├── docs/                           # Documentation
│   ├── core/
│   │   ├── ARCHITECTURE_GUIDE.md
│   │   ├── COMPLETE_SUMMARY.md
│   │   ├── DEPLOYMENT.md
│   │   └── PRODUCTION_CHECKLIST.md
│   └── internal/
│       ├── DEVELOPERS_QUICK_REFERENCE.md
│       └── TESTING_GUIDE.md
│
└── uploads/                        # Local file uploads (deprecated, using Cloudinary)
```

---

## 🔄 **Data Flow Examples**

### **Flow 1: User Signup & Login**
```
1. User submits signup form (email, password)
   ↓
2. Route: POST /users/register
   ↓
3. Passport-Local-Mongoose hashes password
   ↓
4. User saved to MongoDB
   ↓
5. User automatically logged in (Passport)
   ↓
6. Redirect to /listings (authenticated)
   ↓
7. Session created and stored in MongoDB (connect-mongo)
```

### **Flow 2: Create Listing with Image**
```
1. User fills listing form and selects image
   ↓
2. Route: POST /listings (with multer middleware)
   ↓
3. multer-storage-cloudinary uploads image
   ↓
4. Gets Cloudinary URL and filename
   ↓
5. validateListing middleware validates data (Joi)
   ↓
6. listingController.createListing saves to MongoDB
   ↓
7. Sets current user as owner
   ↓
8. Redirect to listing detail page
   ↓
9. Flash success message
```

### **Flow 3: Search Listings**
```
1. User types in search bar: "villa in bali"
   ↓
2. URL changes: /listings?search=villa%20in%20bali
   ↓
3. Route: GET /listings (listingController.index)
   ↓
4. Extract search query and create regex: /villa in bali/i
   ↓
5. MongoDB query finds matching documents:
   {
     $or: [
       { title: /villa in bali/i },
       { location: /villa in bali/i },
       { country: /villa in bali/i },
       { description: /villa in bali/i }
     ]
   }
   ↓
6. Results render in listings/index.ejs
   ↓
7. User sees filtered properties
```

### **Flow 4: Add Review**
```
1. Authenticated user on listing detail page
   ↓
2. Submits review form with comment and rating (1-5)
   ↓
3. Route: POST /listings/:id/reviews
   ↓
4. validateReview middleware validates schema
   ↓
5. Create Review document with:
   - comment, rating, author (_id), createdAt
   ↓
6. Add review _id to listing.reviews array
   ↓
7. Save both documents to MongoDB
   ↓
8. Populate reviews on page with author info
   ↓
9. Display new review with timestamp
```

### **Flow 5: Wishlist Management**
```
1. User clicks heart icon on listing card
   ↓
2. wishlist.js client script intercepts click
   ↓
3. Checks if listing already in localStorage wishlist
   ↓
4. If not present: Add listing ID to array
   ↓
5. If present: Remove listing ID from array
   ↓
6. Save updated array to localStorage key 'homify-wishlist'
   ↓
7. Update heart icon appearance (filled/empty)
   ↓
8. Show toast notification: "Added/Removed from wishlist"
   ↓
9. /wishlist page loads wishlist items via fetch:
   POST /wishlist/get-items with stored IDs
   ↓
10. Controller returns Listing documents
   ↓
11. Render wishlist cards
```

---

## 🚀 **Deployment & DevOps**

### **Development**
```bash
npm install              # Install dependencies
npm run dev              # Start with --watch flag (hot reload)
# Server runs on http://localhost:8080
```

### **Docker Deployment**
```dockerfile
# Multi-stage build for optimization
FROM node:22-alpine AS builder  # Stage 1: Install deps
FROM node:22-alpine             # Stage 2: Production
# Non-root user for security
# Health checks enabled
# Exposes port 8080
```

**Key Features:**
- Alpine Linux (minimal image size)
- Non-root nodejs user for security
- Health checks every 30 seconds
- Multi-stage build reduces final image size

### **Render Deployment**
- **render.yaml** configuration for Render platform
- Environment variables configured:
  - `MONGO_URL` - MongoDB Atlas connection string
  - `SESSION_SECRET` - Session encryption key
  - `ADMIN_EMAIL` - Admin user email
  - `NODE_ENV` - Set to "production"
  - `CLOUDINARY_*` - Image upload credentials

### **Environment Variables**
```
NODE_ENV=production          # production or development
MONGO_URL=mongodb+srv://...  # MongoDB connection
PORT=8080                    # Server port
SESSION_SECRET=...           # Session encryption key
ADMIN_EMAIL=...              # Admin user email
CLOUDINARY_NAME=...          # Cloudinary account
CLOUDINARY_KEY=...           # Cloudinary API key
CLOUDINARY_SECRET=...        # Cloudinary API secret
```

---

## 🧪 **Testing Strategy**

### **Manual Testing Areas**
1. **Authentication**
   - Signup with new email
   - Login with credentials
   - Logout session termination
   - Protected routes redirect

2. **Listings**
   - Create listing with/without image
   - Search by different criteria
   - Price range filtering
   - Edit own listings
   - Delete own listings

3. **Reviews**
   - Add review with rating
   - View all reviews on listing
   - Delete own reviews

4. **Wishlist**
   - Add/remove items
   - Persistence after refresh
   - Cross-tab sync

5. **Security**
   - Rate limiting (100 requests/15min)
   - Admin access (isAdmin middleware)
   - Owner verification (isOwner middleware)

---

## 📈 **Scalability Considerations**

### **Current Architecture**
- Single Express server
- MongoDB database (can use Atlas for scaling)
- Cloudinary handles image scaling

### **Future Optimization**
1. **Caching** - Redis for session and query caching
2. **Load Balancing** - Multiple server instances
3. **Database Indexing** - Indexes on search fields (title, location)
4. **CDN** - Cloudinary already handles this
5. **API Pagination** - Implement for large datasets
6. **Microservices** - Separate auth, listings, reviews services

---

## 💡 **Interview Talking Points**

### **Technical Highlights**
1. **Full-Stack Development** - End-to-end web application
2. **Authentication** - Passport.js with secure password handling
3. **Cloud Integration** - Cloudinary for image management
4. **Security** - Helmet, rate limiting, validation, CSRF
5. **Database Design** - Relationships, references, cascade deletes
6. **Error Handling** - Custom error classes, async wrapper
7. **DevOps** - Docker containerization, cloud deployment
8. **User Experience** - Flash messages, responsive design

### **Problem-Solving Demonstrated**
1. How did you handle image uploads? → Cloudinary
2. How do you secure authentication? → Passport + bcrypt
3. How do you prevent abuse? → Rate limiting + validation
4. How do you manage user sessions? → MongoDB session store
5. How do you prevent unauthorized access? → Middleware checks

### **Design Patterns Used**
1. **MVC** - Models, Controllers, Views separation
2. **Middleware** - Request pipeline processing
3. **Error Handling** - Async wrapper, custom errors
4. **Validation** - Schema validation with Joi
5. **Cascade Operations** - Mongoose post hooks for cleanup

---

## ✅ **Production Checklist**

- ✅ Environment variables configured
- ✅ HTTPS ready (Render handles SSL)
- ✅ Security headers (Helmet)
- ✅ Rate limiting implemented
- ✅ Input validation (server & client)
- ✅ Error handling and logging
- ✅ Database persistence (MongoDB)
- ✅ Session security (MongoDB store)
- ✅ Image security (Cloudinary CDN)
- ✅ Docker containerization
- ✅ Health checks configured
- ✅ Non-root user in container

---

## 🔗 **Key Dependencies Explained**

| Package | Purpose | Version |
|---------|---------|---------|
| Express | Web framework | 5.1.0 |
| Mongoose | MongoDB ODM | 8.17.1 |
| Passport | Authentication | 0.7.0 |
| Cloudinary | Image storage | 1.41.3 |
| Helmet | Security headers | 7.1.0 |
| express-rate-limit | API throttling | 7.1.5 |
| Joi | Schema validation | 18.0.0 |
| EJS | Template engine | 3.1.10 |
| Multer | File uploads | 2.0.2 |

---

## 🎓 **Learning Outcomes**

This project demonstrates mastery of:
1. **Backend**: Node.js, Express routing, middleware
2. **Database**: MongoDB, Mongoose, relationships
3. **Authentication**: Passport.js, session management
4. **Frontend**: EJS templates, Bootstrap, vanilla JavaScript
5. **Cloud Services**: Cloudinary integration
6. **DevOps**: Docker, deployment configuration
7. **Security**: Best practices and vulnerability prevention
8. **Software Architecture**: MVC pattern, separation of concerns
9. **Error Handling**: Custom errors, async patterns
10. **Production Ready**: Rate limiting, validation, monitoring

---

## 📝 **Quick Reference**

**Starting the app:**
```bash
npm install
npm run dev
```

**Database seeding:**
```bash
node init/index.js
```

**Docker:**
```bash
docker build -t homify .
docker run -p 8080:8080 homify
```

**Live URL:** https://homify-mtkz.onrender.com/

**Key Routes:**
- GET `/` - Home page
- GET `/listings` - All listings
- POST `/users/register` - Signup
- POST `/users/login` - Login
- POST `/listings` - Create listing
- POST `/listings/:id/reviews` - Add review

---

**Author:** Amit Ghugal  
**License:** ISC  
**Node Version:** 22.x  
**Created:** 2024-2025
