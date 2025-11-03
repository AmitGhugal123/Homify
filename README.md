

<h1 align="center"> 🏠 HomiFy – Smart Property Listing Web App  </h1>
  <p align="center">
  <img src="https://img.shields.io/badge/Made%20With-💚_Node.js_18+-green?style=for-the-badge&logo=node.js" />
  <img src="https://img.shields.io/badge/Framework-Express.js-000000?style=for-the-badge&logo=express" />
  <img src="https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb" />
  <img src="https://img.shields.io/badge/View_Engine-EJS-yellow?style=for-the-badge&logo=ejs" />
  <img src="https://img.shields.io/badge/Cloud-Cloudinary-00ADEF?style=for-the-badge&logo=cloudinary" />
  <img src="https://img.shields.io/badge/License-MIT-success?style=for-the-badge" />
</p>

 <p align="center"> <b>HomiFy </b> is a full-stack web application that allows users to <b> browse, add, edit, and manage property listings</b> effortlessly.  </p>
 <p align="center"> It provides a clean, responsive interface for viewing detailed property data and includes user authentication for secure access.  
 The goal is to create a smart real estate web platform where users can<b>explore, manage, and interact with property listings</b> easily and securely.  </p>

---

<h3>
 <b> 🚀 1. Features </b> 

🔹 **Property Listings Management** – Add, update, or delete property listings with ease.  
🔹 **User Authentication** – Secure login, signup, and session handling for every user.  
🔹 **Cloud Image Uploads** – Seamless property image uploads via **Cloudinary** integration.  
🔹 **Review & Rating System** – Users can post feedback and rate properties.  
🔹 **Dynamic EJS Views** – Clean and modular templates for responsive web pages.  
🔹 **Error Handling Middleware** – Centralized and elegant Express error control.  
🔹 **MVC Architecture** – Organized structure for scalable backend development.  
🔹 **Database Seeding** – Auto-generate initial property data for testing and demos.

</h3>
<br>

## ⚙️ 2. Tech Stack

| Layer | Technology Used |
|:------|:----------------|
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB with Mongoose ODM |
| **Frontend / View Engine** | EJS (Embedded JavaScript Templates) |
| **Utilities** | Cloudinary, Multer, dotenv |
| **Styling** | CSS, JavaScript |
| **Version Control** | Git + GitHub |

---

## 🧱 3. Project Architecture

The project follows the **MVC (Model-View-Controller)** architecture for modular and scalable development.

---
## 📂 4. File Structure
<pre>

HomiFy/
│
├── 📂 controllers/                 # Contains route logic and core operations
│   ├── listing.js                  # Handles property listing CRUD operations
│   ├── review.js                   # Manages user reviews and ratings
│   └── user.js                     # Handles authentication and user actions
│
├── 📂 init/                        # Initialization and seeding scripts
│   ├── data.js                     # Sample data for database seeding
│   └── index.js                    # Entry point for data setup
│
├── 📂 models/                      # Mongoose schemas for MongoDB collections
│   ├── listing.js                  # Property listing schema
│   ├── review.js                   # Review schema
│   └── user.js                     # User schema
│
├── 📂 public/                      # Static assets (CSS, JS, Images)
│   ├── 📂 css/                     # Stylesheets
│   ├── 📂 js/                      # Client-side JavaScript
│   └── 📂 images/                  # Property or UI images
│
├── 📂 routes/                      # Express routing modules
│   ├── listing.js                  # Routes for listing pages
│   ├── review.js                   # Routes for review pages
│   └── user.js                     # Routes for authentication and profile
│
├── 📂 utils/                       # Helper utilities and configurations
│   ├── cloudConfig.js              # Cloudinary setup and image storage config
│   ├── ExpressError.js             # Custom error class for Express
│   └── wrapAsync.js                # Wrapper for async error handling
│
├── 📂 views/                       # EJS templates for dynamic UI rendering
│   ├── 📂 includes/                # Navbar, footer, and reusable partials
│   ├── 📂 layouts/                 # Main layout structure
│   ├── 📂 listings/                # Pages for listing CRUD operations
│   ├── 📂 user/                    # Authentication-related pages
│   ├── 📂 users/                   # User dashboard and profile pages
│   └── error.ejs                   # Error display template
│
├── 📂 uploads/                     # Stores uploaded property images
│
├── 📄 app.js                       # Main Express server file
├── 📄 middleware.js                # Custom middlewares (auth, validation, etc.)
├── 📄 schema.js                    # Joi validation schemas
├── 📄 package.json                 # Project dependencies and scripts
├── 📄 .env                         # Environment variables (not pushed to GitHub)
└── 📄 README.md                    # Project documentation
</pre>

---

## 🖼️ Application Features & UI Preview

Explore some of **HomiFy’s** powerful and user-friendly features showcased below 👇  
---

### 🏠 Home Page – Property Showcase  
A clean and elegant landing page displaying **featured properties** with quick access to details, ratings, and image previews.  
> ✨ View complete information about each property, including images, price, description, and user reviews.  
> 💬 Interactive and dynamic — powered by **EJS templates** and **Express routes** for real-time updates.
 <img width="1889" height="1191" alt="image" src="https://github.com/user-attachments/assets/dd2af499-4d4f-4874-8cdc-e3b670f8b6b2" />
---

### ➕ Add New Property  
A simple and intuitive form that allows **registered users** to add their own property listings.  
Users can upload multiple images, specify pricing, location, and property details — all stored securely in MongoDB.  
> 🏗️ Integrated with **Cloudinary** for seamless image uploads and storage.
<img width="1888" height="1006" alt="image" src="https://github.com/user-attachments/assets/d33eb87b-12fa-4897-9458-810d9d9c98df" />

---

### 👤 User Authentication  
Secure and session-based **Login / Signup** system for personalized access.  
> 🔐 Managed with **Express-session**, **Passport**, and **Joi** validations to ensure safe user data handling.
<img width="1901" height="1001" alt="image" src="https://github.com/user-attachments/assets/c2940313-7414-428d-b2fa-57708e118487" />

---

### ⭐ Reviews & Ratings  
Users can leave feedback, rate properties, and help others make informed decisions.  
> 💡 Simple and effective review system designed with **nested models** in MongoDB.

---

### ⚙️ Dashboard & Listing Management  
Manage, edit, or delete your property listings from a user-friendly dashboard.  
> 📂 Built with reusable EJS components for a consistent experience across all views.

---

### 🚫 Error Handling  
Custom error pages and smooth navigation for invalid requests or missing data.  
> 🧱 Uses custom **ExpressError.js** and **wrapAsync.js** utilities to keep the app stable.

---

### 🧰 Responsive Design  
Fully optimized for all devices — desktop, tablet, and mobile.  
> 🎨 Built with clean CSS and modular EJS layouts.

✨ *Each screenshot highlights HomiFy’s interactive UI and smooth user experience for property discovery and management.*
---

## 💻 5. Installation Guide

Follow the steps below to set up the project locally 👇

```bash
# 1️⃣ Clone the repository
git clone https://github.com/your-username/homify.git

# 2️⃣ Navigate into the folder
cd homify

# 3️⃣ Install dependencies
npm install

# 4️⃣ Set up environment variables
Create a `.env` file and add:
MONGO_URL=your_mongo_connection_string
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
CLOUDINARY_NAME=your_cloud_name
SECRET=your_session_secret

# 5️⃣ Run the application
npm start
```
Now open 👉 http://localhost:8080
 in your browser.
 ---

 ## 🧩 6. Folder Purpose Summary
Folder	Description:
controllers/	Handles core logic and data manipulation
models/	MongoDB data structure definitions
routes/	Route definitions for app endpoints
views/	Frontend templates (EJS)
public/	Static assets like CSS and JS
utils/	Helper functions and configuration
init/	Initial data setup or DB seeding


## 🧠 8. Future Enhancements

Integrate payment gateways for premium listings

Add chat between buyers and sellers

Implement property location maps using Google Maps API

Deploy on cloud (Render / Vercel / AWS)

---
## 👨‍💻 9. Contributor
Amit R. Ghugal	

## 🪪 10. License

This project is licensed under the MIT License.
---


