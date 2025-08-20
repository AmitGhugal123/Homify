const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require("multer");
const { storage } = require("../utils/cloudConfig");
const upload = multer({ storage });
const ExpressError = require("../utils/ExpressError");

// Middleware to validate MongoDB ObjectId
const validateId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        throw new ExpressError(400, "Invalid Listing ID");
    }
    next();
};

// Index + Create route
router.route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("image"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

// New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Show, Update, and Delete routes
router.route("/:id")
  .get(validateId, wrapAsync(listingController.showListing))
  .put(
    validateId,
    isLoggedIn,
    isOwner,
    upload.single("image"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(
    validateId,
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.deleteListing)
  );

// Edit Route
router.get(
  "/:id/edit",
  validateId,
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.editListing)
);

module.exports = router;
