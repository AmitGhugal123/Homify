const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  isAdmin: { type: Boolean, default: false },
  // Wishlist: store listing ObjectIds the user has saved
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing"
    }
  ]
});

// Tell passport-local-mongoose to use email as the username field
userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = mongoose.model("User", userSchema);
