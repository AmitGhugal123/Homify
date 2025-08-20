const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError");
const { cloudinary } = require("../utils/cloudConfig");


// Index route
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

// New Route
module.exports.renderNewForm = async (req, res) => {
    res.render("listings/new.ejs");
};

// Show Route
module.exports.showListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
        .populate("owner")
        .populate({
            path: "reviews",
            populate: { path: "author" }
        });

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }
    res.render("listings/show", { listing });
};

// Create Route
module.exports.createListing = async (req, res) => {
    const listing = new Listing(req.body.listing);

    // Set the logged-in user as owner
    listing.owner = req.user._id;

    // If image uploaded via multer-cloudinary
    if (req.file) {
        listing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }

    await listing.save();
    req.flash("success", "New listing created!");
    res.redirect(`/listings/${listing._id}`);
};

// Edit Route
module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("owner");
    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("listings/edit", { listing, originalImageUrl });
};

// Update Route
module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    const listingData = req.body.listing;

    if (!listingData) {
        throw new ExpressError(400, "Invalid form data submitted");
    }

    // prepare updated data
    let updatedData = { ...listingData };

    // handle image if uploaded
    if (req.file) {
        updatedData.image = {
            url: req.file.path,
            filename: req.file.filename,
        };
    }

    // update in DB
    const listing = await Listing.findByIdAndUpdate(id, updatedData, { new: true });

    if (!listing) {
        throw new ExpressError(404, "Listing not found");
    }

    req.flash("success", "Listing updated successfully!");
    res.redirect(`/listings/${listing._id}`);  
};


// Delete Route
module.exports.deleteListing = async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    // If listing has an image in Cloudinary, delete it
    if (listing.image && listing.image.filename) {
        try {
             await cloudinary.uploader.destroy(listing.image.filename); 
        }catch (err) {
        console.error("Cloudinary deletion failed:", err);
        }
      
    }

    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted successfully!");
    res.redirect("/listings");
};
