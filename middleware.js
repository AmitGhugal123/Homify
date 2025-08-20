const Listing = require("./models/listing");
const Review = require("./models/review.js")
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema,reviewSchema } = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must be logged in to create listing!");
        return res.redirect("/login");
    }
    next();
};

//purpose : to newListing > first login > redirect: newlisting 
// reason : the passport delete the redirectUrl: undefine

module.exports.saveRedirectUrl = (req, res, next) => {
    // safe check
    if (!req.session) {
        throw new Error("Session is not initialized. Make sure express-session is used before this middleware.");
    }
    res.locals.redirectUrl = req.session.redirectUrl || "/listings";
    next();
};

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner.equals(res.locals.currUser._id)) {
        req.flash("error", "You don't have permission to edit");
        return res.redirect(`/listings/${id}`);
    }
            next();
        
};

// Schema validation for creating/updating listings
module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

// schema validation function for review listings (middleware)
module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.isReviewAuthor = async (req, res, next) => {
let { id, reviewId }= req.params;
let review = await Review.findById(reviewId);
if (!review.author.equals(res.locals.currUser._id)) {
req.flash("error", "You are not the author of this review");
return res.redirect(`/listings/${id}`);
}
next();
};