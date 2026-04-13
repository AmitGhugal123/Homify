const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");

// Wishlist page - render the wishlist view
router.get("/", (req, res) => {
    res.render("wishlist/index.ejs");
});

// API: Get wishlist items (returns listing details for server-side rendering if needed)
router.post("/get-items", wrapAsync(async (req, res) => {
    const { listingIds } = req.body;
    
    if (!Array.isArray(listingIds) || listingIds.length === 0) {
        return res.json([]);
    }

    try {
        const listings = await Listing.find({ _id: { $in: listingIds } });
        res.json(listings);
    } catch (err) {
        res.status(400).json({ error: "Failed to fetch listings" });
    }
}));

// API: Add to wishlist (for server-side tracking if needed)
router.post("/add/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    
    // Verify listing exists
    const listing = await Listing.findById(id);
    if (!listing) {
        throw new ExpressError(404, "Listing not found");
    }
    
    res.json({ success: true, message: "Added to wishlist" });
}));

// API: Remove from wishlist
router.post("/remove/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    
    res.json({ success: true, message: "Removed from wishlist" });
}));

module.exports = router;
