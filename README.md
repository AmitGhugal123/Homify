# Homify

Homify is an Express + EJS property listing app for browsing, creating, editing, and reviewing stays. The project now has a cleaned-up frontend shell, a more consistent UI across the main routes, and a simpler repo structure.

## Run locally

```bash
npm install
npm run dev
```

The app runs on `http://localhost:8080`.

## Current stack

- Node.js
- Express
- EJS with `ejs-mate`
- MongoDB with Mongoose
- Passport for authentication
- Cloudinary + Multer for uploads

## Project structure

```text
Major project/
+- app.js
+- controllers/
+- docs/
+- init/
+- models/
+- public/
�  +- css/
�  �  +- app.css
�  �  +- pages.css
�  �  +- rating.css
�  �  +- shell.css
�  +- js/
�     +- app.js
�     +- wishlist-page.js
�     +- wishlist.js
+- routes/
+- utils/
+- views/
```

## Frontend notes

The active frontend shell is built from:

- `public/css/app.css`
- `public/css/shell.css`
- `public/css/pages.css`
- `public/js/app.js`
- `public/js/wishlist.js`
- `public/js/wishlist-page.js`

Those files replace the older legacy CSS/JS setup that was removed from the live app.

## Documentation

Project guides are split between `docs/core/` for public use and `docs/internal/` for personal notes.

Start here:

- [Documentation Home](/d:/Programming/WebDev%20Projects/Major%20project/docs/core/README.md)
- [Project Owner Guide](/d:/Programming/WebDev%20Projects/Major%20project/docs/core/PROJECT_OWNER_GUIDE.md)
- [Complete Summary](/d:/Programming/WebDev%20Projects/Major%20project/docs/core/COMPLETE_SUMMARY.md)
- [Architecture Guide](/d:/Programming/WebDev%20Projects/Major%20project/docs/core/ARCHITECTURE_GUIDE.md)
- [Quick Test Guide](/d:/Programming/WebDev%20Projects/Major%20project/docs/core/QUICK_TEST_GUIDE.md)
- [Deployment Guide](/d:/Programming/WebDev%20Projects/Major%20project/docs/core/DEPLOYMENT.md)
- [Production Checklist](/d:/Programming/WebDev%20Projects/Major%20project/docs/core/PRODUCTION_CHECKLIST.md)

## Scripts

- `npm run dev` - start with Node watch mode
- `npm start` - start normally

## Status

The main public-facing pages, auth flow, wishlist flow, legal pages, and shared layout have been cleaned up and unified. The documentation set now lives in `docs/core/` for public material and `docs/internal/` for personal notes.
