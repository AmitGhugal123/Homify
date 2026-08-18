const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { isLoggedIn } = require("../middleware.js");

// Wishlist page - render the wishlist view
router.get("/", (req, res) => {
    res.render("wishlist/index.ejs");
});

// API: return current user's wishlist IDs
router.get("/user", isLoggedIn, wrapAsync(async (req, res) => {
    const user = await User.findById(req.user._id).select('wishlist').lean();
    const ids = (user && Array.isArray(user.wishlist)) ? user.wishlist.map(id => String(id)) : [];
    res.json(ids);
}));

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

// API: Add to wishlist (persist to user's wishlist)
router.post("/add/:id", isLoggedIn, wrapAsync(async (req, res) => {
    const { id } = req.params;
    // verify listing exists
    const listing = await Listing.findById(id);
    if (!listing) {
        throw new ExpressError(404, "Listing not found");
    }
    // add to user's wishlist if not already present
    const user = await User.findById(req.user._id);
    const strId = String(id);
    if (!user.wishlist.map(String).includes(strId)) {
        user.wishlist.push(id);
        await user.save();
    }
    res.json({ success: true, message: "Added to wishlist", wishlist: user.wishlist.map(String) });
}));

// API: Remove from wishlist
router.post("/remove/:id", isLoggedIn, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(req.user._id);
    user.wishlist = user.wishlist.filter(w => String(w) !== String(id));
    await user.save();
    res.json({ success: true, message: "Removed from wishlist", wishlist: user.wishlist.map(String) });
}));

module.exports = router;
