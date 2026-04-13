# 🏗️ HOMIFY - Architecture & System Diagram

## 📊 Application Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     HOMIFY WEBSITE                              │
│                    (http://localhost:8080)                      │
└─────────────────────────────────────────────────────────────────┘

┌──────────────── FRONTEND (User-Facing) ────────────────────────┐
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              EJS TEMPLATES (views/)                     │   │
│  │  ├─ home.ejs (Hero, Statistics, Testimonials)          │   │
│  │  ├─ listings/index.ejs (Cards, Filters)                │   │
│  │  ├─ wishlist/index.ejs (Saved Properties)              │   │
│  │  ├─ includes/navbar.ejs (Navigation, Search)           │   │
│  │  └─ includes/footer.ejs (Links, Newsletter)            │   │
│  └─────────────────────────────────────────────────────────┘   │
│                            ↓                                    │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │           CSS & STYLING (public/css/)                   │   │
│  │  ├─ style.css (600+ lines)                             │   │
│  │  │  ├─ Colors & Variables                              │   │
│  │  │  ├─ Animations & Transitions                        │   │
│  │  │  ├─ Card Styling                                    │   │
│  │  │  ├─ Filter Sidebar                                  │   │
│  │  │  └─ Dark Mode Support                               │   │
│  │  └─ navbar.css (300+ lines)                            │   │
│  │     ├─ Sticky Navigation                               │   │
│  │     ├─ Search Bar Animation                            │   │
│  │     ├─ Dropdown Effects                                │   │
│  │     └─ Scroll Effects                                  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                            ↓                                    │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │        JAVASCRIPT (public/js/)                          │   │
│  │  ├─ wishlist.js (250+ lines)                           │   │
│  │  │  ├─ WishlistManager Class                           │   │
│  │  │  ├─ localStorage Operations                         │   │
│  │  │  ├─ Icon Toggle Logic                               │   │
│  │  │  └─ Notification System                             │   │
│  │  └─ animations.js (300+ lines)                         │   │
│  │     ├─ Scroll Listeners                                │   │
│  │     ├─ Counter Animations                              │   │
│  │     ├─ Keyboard Shortcuts                              │   │
│  │     └─ Toast Notifications                             │   │
│  └─────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘

┌──────────────── BACKEND (Server-Side) ────────────────────────┐
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │        EXPRESS.JS SERVER (app.js)                       │  │
│  │  ├─ Port: 8080                                          │  │
│  │  ├─ Session Management                                 │  │
│  │  ├─ Middleware Stack                                   │  │
│  │  └─ Route Handling                                     │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            ↓                                    │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │          ROUTES (routes/)                               │  │
│  │  ├─ listings.js → /listings (GET all, search)          │  │
│  │  ├─ listing.js → /listings/:id (GET single)            │  │
│  │  ├─ wishlist.js → /wishlist (GET page, POST items)     │  │
│  │  ├─ user.js → /users, /auth                            │  │
│  │  └─ review.js → /reviews                               │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            ↓                                    │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │        CONTROLLERS (controllers/)                        │  │
│  │  ├─ listing.js                                          │  │
│  │  │  ├─ index() - Lists all listings                    │  │
│  │  │  │  └─ NEW: Search with regex filtering             │  │
│  │  │  ├─ show() - Single listing details                 │  │
│  │  │  └─ ... more functions                              │  │
│  │  ├─ review.js                                           │  │
│  │  ├─ user.js                                             │  │
│  │  └─ wishlist.js                                         │  │
│  │     ├─ getWishlist() - /wishlist page                  │  │
│  │     └─ getItems() - POST /wishlist/get-items           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            ↓                                    │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │        DATABASE MODELS (models/)                         │  │
│  │  ├─ Listing                                              │  │
│  │  │  ├─ title (searched)                                 │  │
│  │  │  ├─ description (searched)                           │  │
│  │  │  ├─ location (searched)                              │  │
│  │  │  ├─ country (searched)                               │  │
│  │  │  ├─ price                                            │  │
│  │  │  ├─ image                                            │  │
│  │  │  └─ amenities                                        │  │
│  │  ├─ User                                                 │  │
│  │  └─ Review                                               │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            ↓                                    │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │          DATABASE (MongoDB)                             │  │
│  │  ├─ Optional: MongoDB Atlas (cloud)                     │  │
│  │  ├─ Alternative: Local MongoDB                          │  │
│  │  ├─ Collections: listings, users, reviews              │  │
│  │  └─ Status: Connected ✅                                │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘

┌──────────────── CLIENT-SIDE STORAGE ────────────────────────────┐
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │          LOCALSTORAGE (Browser)                          │  │
│  │  └─ Key: 'homify-wishlist'                              │  │
│  │     ├─ Stores: Array of listing IDs                     │  │
│  │     ├─ Persists: Across sessions                        │  │
│  │     ├─ Syncs: Cross-tab (storage event)                 │  │
│  │     └─ Size: Minimal (~1KB for 50 items)                │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow Diagrams

### Flow 1: Search Functionality
```
USER INPUT (navbar search) "villa"
    ↓
URL CHANGE: /listings?search=villa
    ↓
ROUTE: GET /listings
    ↓
CONTROLLER: listing.js → index()
    │
    ├─ Extract query: search = "villa"
    ├─ Create regex: /villa/i
    ├─ Build query: { $or: [...] with $regex }
    └─ Find listings: Listing.find(query)
    ↓
RESULTS: Array of matching listings
    ↓
TEMPLATE: listings/index.ejs renders with:
    ├─ Search term: "villa"
    ├─ Result count: "3 properties"
    └─ Matching cards displayed
    ↓
USER SEES: Search results page with filtered listings
```

### Flow 2: Wishlist Toggle
```
USER CLICKS: Heart icon on listing card
    ↓
EVENT: wishlist.js → toggleWishlist(e, listingId)
    ↓
CHECK: Is listingId in wishlist array?
    ├─ YES → Remove it
    │   ├─ Show notification: "❌ Removed"
    │   └─ Heart → white outline
    └─ NO → Add it
        ├─ Show notification: "❤️ Added"
        └─ Heart → red solid
    ↓
SAVE: localStorage['homify-wishlist'] = JSON.stringify(array)
    ↓
DISPATCH: Custom event 'wishlistUpdated'
    ↓
NAVBAR: Listens for event
    ├─ Updates badge count
    ├─ Triggers animation
    └─ Shows visual feedback
    ↓
USER SEES: Instant visual feedback + notification
```

### Flow 3: Wishlist Page Load
```
USER CLICKS: Heart icon in navbar (or /wishlist link)
    ↓
NAVIGATE: GET /wishlist
    ↓
ROUTE: Get wishlist page
    ↓
TEMPLATE: wishlist/index.ejs loads
    ↓
JavaScript: WishlistPage class initializes
    │
    ├─ Read localStorage['homify-wishlist']
    ├─ Extract listing IDs: [1, 5, 12]
    └─ Load wishlistManager reference
    ↓
API CALL: POST /wishlist/get-items
    │   Body: { listingIds: [1, 5, 12] }
    ↓
CONTROLLER: Receive listingIds
    │
    ├─ Find listings by IDs
    ├─ Return full property objects
    └─ Include images, titles, prices
    ↓
RESPONSE: Array of listing documents
    ↓
JAVASCRIPT: Render listing cards
    │
    ├─ Loop through listings
    ├─ Create HTML for each
    ├─ Style with CSS classes
    └─ Attach event listeners
    ↓
USER SEES: Wishlist page with saved properties
```

### Flow 4: Responsive Design
```
USER DEVICE: Desktop (1024px+)
    ↓
CSS: @media (min-width: 1024px)
    ├─ Full layout (3 columns)
    ├─ Large navbar
    ├─ 2-column filter + listings
    └─ Full footer with newsletter
    ↓
USER SEES: Professional desktop view with all features

─────────────────────────────────────

USER DEVICE: Tablet (768px)
    ↓
CSS: @media (min-width: 768px)
    ├─ 2-column layout
    ├─ Reduced navbar
    ├─ 1-column filter + listings
    └─ Stacked footer
    ↓
USER SEES: Optimized tablet view

─────────────────────────────────────

USER DEVICE: Mobile (375px)
    ↓
CSS: @media (max-width: 576px)
    ├─ Single column layout
    ├─ Hamburger menu
    ├─ Full-width cards
    ├─ Collapsed filter sidebar
    ├─ Responsive images
    └─ Touch-friendly buttons
    ↓
USER SEES: Perfect mobile experience
```

---

## 🔌 Technology Stack

```
┌─────────────────────────────────────────┐
│        FRONTEND TECHNOLOGIES            │
├─────────────────────────────────────────┤
│ HTML5         - Semantic markup         │
│ CSS3          - Responsive design       │
│ JavaScript    - Vanilla JS (no jQuery)  │
│ Bootstrap 5.3 - Responsive grid         │
│ FontAwesome 7 - Icon library            │
│ EJS           - Template engine         │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│        BACKEND TECHNOLOGIES             │
├─────────────────────────────────────────┤
│ Node.js       - Runtime environment     │
│ Express 5.1   - Web framework           │
│ MongoDB       - NoSQL database          │
│ Mongoose 8.17 - ODM (Object mapper)     │
│ Passport      - Authentication          │
│ EJS           - Template rendering      │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│        DEVELOPMENT TOOLS                │
├─────────────────────────────────────────┤
│ npm           - Package manager         │
│ DevTools      - Browser debugging       │
│ Git           - Version control         │
│ VS Code       - Editor                  │
└─────────────────────────────────────────┘
```

---

## 📍 URL Routing Map

```
┌─────────────────────────────────────────────────────────────────┐
│                         URL ROUTING                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ /                    → home.ejs (Homepage)                      │
│   ├─ Hero section with search                                  │
│   ├─ Statistics section                                         │
│   ├─ How-it-works guide                                         │
│   └─ Testimonials                                               │
│                                                                 │
│ /listings            → listings/index.ejs (Listings Grid)      │
│   ├─ Filter sidebar on left                                    │
│   ├─ Listing cards grid                                        │
│   ├─ Wishlist hearts available                                  │
│   └─ Search results (when ?search=term)                         │
│                                                                 │
│ /listings/:id        → listings/show.ejs (Details)            │
│   ├─ Full property details                                     │
│   ├─ Images gallery                                             │
│   ├─ Reviews section                                            │
│   └─ Booking button                                             │
│                                                                 │
│ /wishlist            → wishlist/index.ejs (Wishlist Page)     │
│   ├─ Saved properties                                           │
│   ├─ Item count                                                 │
│   ├─ Remove functionality                                       │
│   └─ "Continue Browsing" button                                 │
│                                                                 │
│ POST /wishlist/get-items → API (Fetch listing details)        │
│   ├─ Receives: { listingIds: [...] }                           │
│   ├─ Returns: Array of listing documents                       │
│   └─ Used by: Wishlist page JavaScript                         │
│                                                                 │
│ /users/register      → Registration page                        │
│ /users/login         → Login page                               │
│ /listings/:id/reviews/new → Review form                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎨 Design System

```
┌──────────────────────────────────────────┐
│         COLOR PALETTE                    │
├──────────────────────────────────────────┤
│ Primary:     #667eea (Purple)            │
│ Secondary:   #764ba2 (Dark Purple)       │
│ Accent:      #ef7d44 (Orange)            │
│ Light:       #f8f9fa (Off-white)         │
│ Dark:        #2c3e50 (Dark Blue)         │
│ Success:     #10b981 (Green)             │
│ Warning:     #f97316 (Orange)            │
│ Danger:      #ef4444 (Red)               │
│ Wishlist:    #ff5757 (Heart Red)         │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│         TYPOGRAPHY                      │
├──────────────────────────────────────────┤
│ Headings:    Bold, clear hierarchy       │
│ Body:        Readable 16px+              │
│ Buttons:     Medium weight, uppercase    │
│ CTA:         Bold, contrasting colors    │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│         SPACING                          │
├──────────────────────────────────────────┤
│ Base unit:   8px                         │
│ Small:       8px, 16px                   │
│ Medium:      24px, 32px                  │
│ Large:       48px, 64px                  │
│ XL:          80px, 96px                  │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│         ANIMATIONS                       │
├──────────────────────────────────────────┤
│ Duration:    0.3s default                │
│ Easing:      cubic-bezier(0.4, 0, 0.2, 1)│
│ Base:        fadeIn, slideUp              │
│ Interactive: pulse, bounce, glow         │
│ Scroll:      On intersection observe     │
└──────────────────────────────────────────┘
```

---

## 🔐 Security Features

```
┌─────────────────────────────────────────────────────────────────┐
│                    SECURITY IMPLEMENTED                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ ✅ CORS Protection                                              │
│ ✅ Helmet.js (Security headers)                                 │
│ ✅ Password Hashing (Passport)                                  │
│ ✅ Session Management (Express-session)                         │
│ ✅ CSRF Protection (if needed)                                  │
│ ✅ Input Validation (Joi validator)                             │
│ ✅ Rate Limiting (Express-rate-limit)                           │
│ ✅ MongoDB Injection Prevention (Mongoose)                      │
│ ✅ XSS Protection (EJS escaping)                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## ⚡ Performance Optimization

```
┌─────────────────────────────────────────────────────────────────┐
│                  PERFORMANCE FEATURES                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ ✅ Lazy Loading (Images on scroll)                              │
│ ✅ CSS Animations (GPU accelerated)                             │
│ ✅ Efficient localStorage (< 1KB)                               │
│ ✅ Regex search (Fast pattern matching)                         │
│ ✅ CSS media queries (Mobile optimization)                      │
│ ✅ Optimized images (Cloudinary CDN)                            │
│ ✅ Minified CSS/JS (Production ready)                           │
│ ✅ Caching strategies (Browser cache)                           │
│                                                                 │
│ Target Metrics:                                                 │
│ • Page Load: < 2 seconds                                        │
│ • FPS: 60 (smooth animations)                                   │
│ • First Paint: < 1 second                                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📱 Responsive Breakpoints

```
Device Type    Width Range    Layout Pattern    Navigation
───────────────────────────────────────────────────────────────────
Mobile         < 576px        1 Column          Hamburger Menu
Small Tablet   576px - 768px  2 Column          Collapse
Tablet         768px - 992px  2 Column          Partial
Desktop        992px - 1200px 3 Column          Full
Large Desktop  > 1200px       4 Column          Full Max-width
```

---

## 🚀 Deployment Considerations

```
┌─────────────────────────────────────────────────────────────────┐
│              DEPLOYMENT REQUIREMENTS                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Server:          Node.js 16+ with npm                           │
│ Database:        MongoDB (Atlas or local)                       │
│ Port:            8080 (configurable)                            │
│ Environment:     .env file with configuration                   │
│ Static Files:    /public directory served                       │
│ Session Store:   Connect-mongo (MongoDB)                        │
│ File Uploads:    Cloudinary (optional)                          │
│                                                                 │
│ Environment Variables:
│ ├─ MONGO_URL    (MongoDB connection string)
│ ├─ SESSION_KEY  (Session secret)
│ ├─ CLOUDINARY_* (Optional image storage)
│ └─ Other config (As per .env.sample)
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📈 Scalability Roadmap

```
Phase 1 (Current): MVP Features
├─ Basic listings + search ✅
├─ Wishlist with localStorage ✅
├─ Responsive design ✅
└─ Professional UI ✅

Phase 2 (Optional): Enhanced Backend
├─ User accounts with persistence
├─ Server-side wishlist storage
├─ Email notifications
└─ Advanced analytics

Phase 3 (Optional): Advanced Features
├─ Recommendation engine
├─ Dynamic pricing
├─ Payment integration
└─ Booking calendar

Phase 4 (Optional): Enterprise
├─ Multi-language support
├─ Admin dashboard
├─ API for mobile apps
└─ Performance monitoring
```

---

**Architecture Designed For:** Scalability & Performance
**Technology Stack:** Modern & Production-Ready
**Status:** ✅ Complete & Tested
**Next:** Deployment to production ✨
