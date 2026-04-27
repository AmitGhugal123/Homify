<div align="center">

# Homify

### A modern full-stack property listing platform for discovering, managing, and reviewing short-term stays.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Homify-2563eb?style=for-the-badge)](https://homify-mtkz.onrender.com/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-111827?style=for-the-badge&logo=github)](https://github.com/AmitGhugal123/Homify)

**Live Project:** [https://homify-mtkz.onrender.com/](https://homify-mtkz.onrender.com/)

</div>

---

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-Templates-B4CA65)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Image%20Uploads-3448C5?logo=cloudinary&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-blue.svg)

</div>

---

## Overview

**Homify** is a full-stack rental property web application inspired by modern stay-booking platforms. Users can browse listings, create and manage properties, upload images, leave reviews, and save favorite stays to a wishlist.

The project is built with a production-minded Express architecture, MongoDB persistence, Passport.js authentication, Cloudinary media uploads, reusable EJS layouts, and deployment support for Render and Docker.

---

## Highlights

- Full-stack property listing and review platform
- Secure signup, login, logout, and session handling
- Create, update, and delete property listings
- Cloudinary-powered image upload workflow
- Review and rating system for listings
- Wishlist feature with persistent saved listings
- Admin dashboard protected by configured admin email
- Responsive EJS and Bootstrap user interface
- Docker and Render deployment support

---

## Demo Preview

<div align="center">

![Homify App Preview](https://via.placeholder.com/1000x500?text=Homify+App+Preview)

Replace this placeholder with a real screenshot of your deployed Homify homepage.

</div>

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Backend | Node.js, Express 5 |
| Database | MongoDB, Mongoose |
| Frontend | EJS, ejs-mate, Bootstrap |
| Authentication | Passport.js, Passport Local Mongoose |
| File Uploads | Multer, Cloudinary |
| Sessions | express-session, connect-mongo |
| Validation | Joi |
| Security | Helmet, express-rate-limit |
| Deployment | Render, Docker |

---

## Live Usage

1. Open the live app: [homify-mtkz.onrender.com](https://homify-mtkz.onrender.com/)
2. Sign up or log in to your account.
3. Browse available property listings.
4. Create your own listing with images.
5. Add reviews, ratings, and wishlist items.

---

## Features

### Listings

- Browse all available properties
- View detailed listing pages
- Create new listings as an authenticated user
- Edit and delete listings as the owner
- Upload listing images to Cloudinary

### Reviews

- Add reviews to property listings
- Rate listings with star ratings
- Delete reviews with ownership protection
- Display listing feedback directly on detail pages

### Wishlist

- Save favorite listings
- Remove saved listings
- Access wishlist items from a dedicated page
- Persist wishlist selections for a smoother user experience

### Admin

- Admin-only dashboard available at `/admin`
- Displays username, email, role, and protected password status
- Controlled through the `ADMIN_EMAIL` environment variable

---

## Installation

### Prerequisites

- Node.js 22.x
- npm
- MongoDB local instance or MongoDB Atlas database
- Cloudinary account

### Setup

```bash
git clone https://github.com/AmitGhugal123/Homify.git
cd Homify
npm install
cp .env.example .env
```

Add your environment variables in `.env`:

```env
MONGO_URL=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret
ADMIN_EMAIL=your_admin_email@example.com
NODE_ENV=development
PORT=8080
```

Start the app:

```bash
npm run dev
```

Open the local server:

```text
http://localhost:8080
```

---

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the app with Node watch mode |
| `npm start` | Start the app normally |
| `npm test` | Run the configured test script |

---

## Project Structure

```text
Homify/
|-- app.js
|-- middleware.js
|-- schema.js
|-- controllers/
|-- routes/
|-- models/
|-- views/
|-- public/
|-- utils/
|-- init/
|-- docs/
|-- tests/
|-- Dockerfile
|-- docker-compose.yml
|-- render.yaml
`-- package.json
```

---

## Key Workflows

### Creating a Listing

```text
Login -> New Listing -> Add details -> Upload image -> Submit -> Listing goes live
```

### Adding a Review

```text
Open listing -> Add rating and comment -> Submit review -> Listing feedback updates
```

### Saving to Wishlist

```text
Browse listings -> Click wishlist action -> Listing is saved -> Revisit from Wishlist
```

---

## API Overview

### Listings

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/listings` | View all listings |
| `GET` | `/listings/:id` | View listing details |
| `POST` | `/listings` | Create a listing |
| `PUT` | `/listings/:id` | Update a listing |
| `DELETE` | `/listings/:id` | Delete a listing |

### Reviews

| Method | Route | Purpose |
| --- | --- | --- |
| `POST` | `/listings/:id/reviews` | Add a review |
| `DELETE` | `/listings/:id/reviews/:reviewId` | Delete a review |

### Users

| Method | Route | Purpose |
| --- | --- | --- |
| `POST` | `/signup` | Register a user |
| `POST` | `/login` | Log in a user |
| `GET` | `/logout` | Log out a user |
| `GET` | `/admin` | View admin dashboard |

---

## Deployment

Homify is deployed on Render:

[https://homify-mtkz.onrender.com/](https://homify-mtkz.onrender.com/)

Docker support is also included:

```bash
docker-compose up --build
```

For more deployment notes, see [docs/core/DEPLOYMENT.md](docs/core/DEPLOYMENT.md).

---

## Documentation

- [Architecture Guide](docs/core/ARCHITECTURE_GUIDE.md)
- [Complete Summary](docs/core/COMPLETE_SUMMARY.md)
- [Deployment Guide](docs/core/DEPLOYMENT.md)
- [Quick Test Guide](docs/core/QUICK_TEST_GUIDE.md)
- [Production Checklist](docs/core/PRODUCTION_CHECKLIST.md)

---

## Author

**Amit Ghugal**

- GitHub: [@AmitGhugal123](https://github.com/AmitGhugal123)
- Project: [Homify](https://github.com/AmitGhugal123/Homify)
- Live Demo: [homify-mtkz.onrender.com](https://homify-mtkz.onrender.com/)

---

## License

This project is licensed under the **ISC License**.

---

<div align="center">

If you like this project, consider giving it a star on GitHub.

**Built with Node.js, Express, MongoDB, EJS, and Cloudinary.**

</div>
