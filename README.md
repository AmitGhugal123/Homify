# Homify - Property Listing Platform

A full-stack web application for listing and discovering properties worldwide. Built with Node.js, Express, MongoDB, and EJS.

## 🚀 Features

- **User Authentication**: Secure signup/login with Passport.js
- **Property Listings**: Create, read, update, and delete property listings
- **Image Upload**: Cloudinary integration for reliable image storage
- **Reviews & Ratings**: Users can leave reviews and rate properties
- **Responsive Design**: Mobile-first Bootstrap UI
- **Security**: Helmet.js, rate limiting, and input validation
- **Session Management**: MongoDB-backed sessions

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose ODM
- **View Engine**: EJS + EJS-Mate
- **Authentication**: Passport.js (Local Strategy)
- **File Upload**: Multer + Cloudinary
- **Validation**: Joi
- **Security**: Helmet, Express-Rate-Limit
- **Frontend**: Bootstrap 5, Font Awesome, Custom CSS

## 📋 Prerequisites

- Node.js v22.17.0 or higher
- npm or yarn
- MongoDB Atlas account (for database)
- Cloudinary account (for image storage)

## 🔧 Installation

### 1. Clone or Download the Project

```bash
cd "Major project"
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the project root and copy from `.env.example`:

```bash
cp .env.example .env
```

Update the `.env` file with your actual credentials:

```
MONGO_URL=mongodb+srv://your_username:your_password@cluster.mongodb.net/homify
SESSION_SECRET=your_secret_key_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
```

### 4. Start the Application

**Development Mode:**
```bash
node app.js
```

The app will run on `http://localhost:8080`

## 🌱 Database Setup

### Create MongoDB Atlas Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user with authentication
4. Get your connection string
5. Add your IP address to the IP whitelist
6. Update your `MONGO_URL` in `.env`

### Seed Sample Data

If you want to populate the database with sample listings:

```bash
node init/index.js
```

This will clear existing listings and add 20 sample properties from around the world.

## 📁 Project Structure

```
Major project/
├── app.js                 # Main application file
├── package.json          # Dependencies
├── middleware.js         # Custom middleware (auth, validation)
├── schema.js            # Joi validation schemas
│
├── models/              # Mongoose schemas
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── routes/              # Express routes
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── controllers/         # Route handlers
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── utils/               # Utility functions
│   ├── cloudConfig.js
│   ├── ExpressError.js
│   └── wrapAsync.js
│
├── views/               # EJS templates
│   ├── layouts/
│   ├── includes/
│   ├── listings/
│   ├── users/
│   └── legal/
│
├── public/              # Static files
│   ├── css/
│   ├── js/
│   └── images/
│
└── init/                # Database initialization
    ├── index.js
    └── data.js
```

## 🔐 Security Features

- **Helmet.js**: Sets various HTTP headers for security
- **Rate Limiting**: Prevents brute force attacks
- **Joi Validation**: Server-side input validation
- **CSRF Protection**: Via method-override and session security
- **Password Hashing**: Handled by passport-local-mongoose
- **httpOnly Cookies**: Session cookies are httpOnly by default
- **SameSite Cookie Policy**: Set to 'strict' for CSRF protection

## 📝 API Routes

### Authentication
- `GET /signup` - Signup form
- `POST /signup` - Register new user
- `GET /login` - Login form
- `POST /login` - Authenticate user
- `GET /logout` - Logout user

### Listings
- `GET /listings` - View all listings
- `GET /listings/new` - New listing form (requires auth)
- `POST /listings` - Create listing (requires auth)
- `GET /listings/:id` - View specific listing
- `GET /listings/:id/edit` - Edit form (owner only)
- `PUT /listings/:id` - Update listing (owner only)
- `DELETE /listings/:id` - Delete listing (owner only)

### Reviews
- `POST /listings/:id/reviews` - Add review (requires auth)
- `DELETE /listings/:id/reviews/:reviewId` - Delete review (author only)

### Legal
- `GET /privacy` - Privacy policy
- `GET /terms` - Terms of service

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure your IP is whitelisted in MongoDB Atlas
- Check your `MONGO_URL` is correct
- Verify database user credentials

### Image Upload Issues
- Verify Cloudinary credentials
- Check file size limits (max 5MB by default)
- Ensure file format is supported (jpg, png, jpeg)

### Port Already in Use
- Change the port in `app.js` or set `PORT` variable in `.env`

## 📈 Future Enhancements

- [ ] Search and filter functionality
- [ ] Pagination for listings
- [ ] User profile pages
- [ ] Booking/reservation system
- [ ] Payment integration
- [ ] Message system between users
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Image carousel on listing pages
- [ ] Google Maps integration

## 📄 License

ISC

## 👤 Author

Created by Amit Ghugal

---

**Happy hosting! 🏠**
