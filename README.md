# 🏠 Homify

> A modern, full-stack property listing web application for discovering, managing, and reviewing short-term rental properties.

<div align="center">

[![Node.js](https://img.shields.io/badge/Node.js-20.x-green?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-black?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green?logo=mongodb)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

[Architecture](docs/core/ARCHITECTURE_GUIDE.md) • [Documentation](docs/core/README.md) • [Quick Start](#-quick-start)

</div>

---

## ✨ Features

### 🏷️ Core Features
- **Browse & Search** - Explore property listings with keyword search and advanced filtering
- **User Authentication** - Secure signup, login, and session management with Passport.js
- **Listings Management** - Create, edit, update, and delete property listings
- **Real-Time Image Upload** - Seamless image uploads via Cloudinary integration
- **Reviews & Ratings** - Add and view detailed reviews with star ratings
- **Wishlist System** - Save favorite listings locally for future reference
- **Responsive Design** - Mobile-first approach with consistent UI/UX

### 🔐 Security & Quality
- Custom error handling with async wrapper functions
- Secure password hashing and session management
- Input validation and sanitization
- CORS and security middleware configured
- Docker support for containerized deployment

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Backend** | Node.js, Express 5 | Server & API |
| **Database** | MongoDB, Mongoose | Data persistence |
| **Frontend** | EJS, ejs-mate, Bootstrap | UI rendering & styling |
| **Authentication** | Passport.js (Local Strategy) | User authentication |
| **File Storage** | Cloudinary + Multer | Cloud image hosting |
| **Session Management** | Express-session | User session handling |
| **Containerization** | Docker, Docker Compose | Development & deployment |

---

## 📦 Installation

### Prerequisites
- **Node.js** (v20+)
- **npm** or **yarn**
- **MongoDB** (local or Atlas)
- **Cloudinary account** (for image uploads)

### Setup Steps

**1. Clone the repository**
```bash
git clone https://github.com/yourusername/homify.git
cd homify
```

**2. Install dependencies**
```bash
npm install
```

**3. Configure environment variables**
```bash
cp .env.example .env
```

Fill in your `.env` file:
```env
# MongoDB
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/homify

# Session Security
SESSION_SECRET=your_secure_session_key_here

# Cloudinary (Image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret

# Admin access (optional)
# Set this to your own email to unlock the admin dashboard
ADMIN_EMAIL=your_admin_email@example.com

# Server
NODE_ENV=development
PORT=8080
```

**4. Start the development server**
```bash
npm run dev
```

**5. Open in browser**
```
http://localhost:8080
```

---

## 🚀 Quick Start

### Using Docker
```bash
docker-compose up --build
```

### Using Node directly
```bash
npm install
npm run dev
```

Available scripts:
- `npm run dev` - Start with Node watch mode (hot reload)
- `npm start` - Start normally
- `npm test` - Run tests

---

## 📁 Project Structure

```
homify/
├── app.js                    # Express app configuration
├── middleware.js             # Custom middleware
├── schema.js                 # Data validation schemas
│
├── controllers/              # Request handlers
│   ├── listing.js           # Listing operations
│   ├── review.js            # Review operations
│   └── user.js              # User operations
│
├── routes/                   # API/Web routes
│   ├── listing.js
│   ├── review.js
│   ├── user.js
│   └── wishlist.js
│
├── models/                   # Mongoose schemas
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── views/                    # EJS templates
│   ├── layouts/             # Layout templates
│   ├── listings/            # Listing pages
│   ├── user/                # User pages
│   ├── includes/            # Reusable components
│   ├── legal/               # Legal pages (Privacy, Terms)
│   └── wishlist/            # Wishlist pages
│
├── public/                   # Static assets
│   ├── css/                 # Stylesheets
│   │   ├── app.css
│   │   ├── shell.css
│   │   ├── pages.css
│   │   └── rating.css
│   └── js/                  # Client-side scripts
│       ├── app.js
│       ├── wishlist.js
│       └── wishlist-page.js
│
├── utils/                    # Helper functions
│   ├── wrapAsync.js         # Async error handler
│   ├── ExpressError.js      # Custom error class
│   └── cloudConfig.js       # Cloudinary configuration
│
├── init/                     # Database initialization
│   ├── index.js
│   └── data.js              # Sample data seeding
│
├── docs/
│   ├── core/                # Public documentation
│   └── internal/            # Private notes (not in GitHub)
│
├── Dockerfile               # Container configuration
└── package.json             # Dependencies
```

---

## 🔌 API Overview

### Listings
- `GET /listings` - View all listings
- `GET /listings/:id` - View listing details
- `POST /listings` - Create new listing (authenticated)
- `PUT /listings/:id` - Update listing (owner only)
- `DELETE /listings/:id` - Delete listing (owner only)

### Reviews
- `POST /listings/:id/reviews` - Add review
- `DELETE /listings/:id/reviews/:reviewId` - Delete review (owner only)

### Users
- `POST /signup` - User registration
- `POST /login` - User login
- `GET /logout` - User logout
- `GET /admin` - Admin-only user dashboard

### Wishlist
- `GET /wishlist` - View saved listings
- `POST /wishlist/add/:id` - Add to wishlist
- `DELETE /wishlist/remove/:id` - Remove from wishlist

---

## 💾 Database Schema

### User Model
```javascript
{
  email: String (unique),
  password: String (hashed),
  username: String,
  avatar: String,
  listings: [Reference to Listing],
  reviews: [Reference to Review],
  createdAt: Date
}
```

### Listing Model
```javascript
{
  title: String,
  description: String,
  image: [Object] (Cloudinary),
  price: Number,
  location: String,
  country: String,
  owner: Reference to User,
  reviews: [Reference to Review],
  rating: Number,
  createdAt: Date
}
```

### Review Model
```javascript
{
  body: String,
  rating: Number (1-5),
  author: Reference to User,
  listing: Reference to Listing,
  createdAt: Date
}
```

---

## 📚 Documentation

### Admin dashboard

Homify includes an admin-only dashboard at `/admin` that shows:
- username
- email
- role
- password status as hidden/hashed

To enable it, set `ADMIN_EMAIL` to the email address of the account you want to treat as admin. The dashboard is protected by middleware and will return a 403 for non-admin users.

Comprehensive documentation available in `docs/core/`:

- **[Architecture Guide](docs/core/ARCHITECTURE_GUIDE.md)** - System design & data flow
- **[Complete Summary](docs/core/COMPLETE_SUMMARY.md)** - Project walkthrough
- **[Deployment Guide](docs/core/DEPLOYMENT.md)** - Production deployment steps
- **[Quick Test Guide](docs/core/QUICK_TEST_GUIDE.md)** - Testing checklist
- **[Production Checklist](docs/core/PRODUCTION_CHECKLIST.md)** - Pre-launch verification

---

## 🔄 Workflow & Development

### Creating a Listing
1. User signs up/logs in
2. Navigate to "Create Listing"
3. Fill form with property details
4. Upload images (saved to Cloudinary)
5. Submit to MongoDB
6. Listing appears in browse feed

### Adding a Review
1. View a listing
2. Scroll to reviews section
3. Submit rating & feedback
4. Review appears immediately
5. Average rating updates

### Wishlist Management
1. Click heart icon on listings
2. Saved to localStorage
3. Access via Wishlist page
4. Persists across sessions

---

## 🐛 Error Handling

Custom error handling with:
- `ExpressError` - Custom error class for standardized responses
- `wrapAsync()` - Middleware wrapper for async/await functions
- Centralized error routing in `app.js`
- User-friendly error pages

---

## 🚢 Deployment

### Docker
```bash
docker-compose up -d
```

### Traditional Server
See [Deployment Guide](docs/core/DEPLOYMENT.md) for detailed steps.

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see `LICENSE` file for details.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

---

## 🙏 Acknowledgments

- MongoDB & Mongoose documentation
- Express.js community
- Cloudinary for image hosting
- Passport.js authentication

---

<div align="center">

Made with ❤️ by [Your Name]

⭐ If you found this helpful, please give it a star!

</div>
