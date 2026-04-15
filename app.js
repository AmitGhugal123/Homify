if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const mongoose = require("mongoose");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const User = require("./models/user.js");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const wishlistRouter = require("./routes/wishlist.js");

const PORT = process.env.PORT || 8080;
const isProduction = process.env.NODE_ENV === "production";
const sessionSecret = process.env.SESSION_SECRET || "dev-fallback-secret-change-me";

// Use your Atlas connection string (stored in .env)
const dbUrl = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/homify";

//  MongoDB connection
async function main() {
    await mongoose.connect(dbUrl);
    console.log("Connected to DB:", dbUrl);
}
main().catch((err) => console.log("MongoDB connection error:", err));

// App config
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

if (isProduction) {
    // Required for secure cookies behind managed proxies (Render/Railway/etc.)
    app.set("trust proxy", 1);
}

// Security Middleware
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net"],
        styleSrc: ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net", "fonts.googleapis.com"],
        fontSrc: ["'self'", "cdnjs.cloudflare.com", "fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:", "via.placeholder.com", "res.cloudinary.com"],
    }
}));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login attempts per windowMs
    message: "Too many login attempts, please try again later.",
    skipSuccessfulRequests: true,
});

app.use(limiter); // Apply rate limiting globally

// Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));


// Session Config (MongoDB session store)
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: sessionSecret,
    },
    touchAfter: 24 * 60 * 60 // time period in seconds (update session once per day)
});

store.on("error", function (e) {
    console.log("SESSION STORE ERROR:", e);
});

// session configs
const sessionConfig = {
    store,
    name: "homifySession", 
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false, // Don't create unnecessary sessions for anonymous users
    cookie: {
        httpOnly: true,
        sameSite: isProduction ? "lax" : "strict",
        secure: isProduction,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

app.use(session(sessionConfig));
app.use(flash());

//  Passport setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({ usernameField: "email" }, User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//  Flash & current user middleware
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// Health check endpoint for Render monitoring
app.get("/health", (req, res) => {
    // Check MongoDB connection
    const isDbConnected = mongoose.connection.readyState === 1;
    const status = isDbConnected ? 200 : 503;
    res.status(status).json({
        status: isDbConnected ? "healthy" : "unhealthy",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        database: isDbConnected ? "connected" : "disconnected"
    });
});

// Routes
app.get("/", (req, res) => {
    res.render("home.ejs");
});
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/wishlist", wishlistRouter);
app.use("/", userRouter);

//  404 handler
app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

//  Global error handler
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong!" } = err;
    if (statusCode >= 500) {
        console.error("ERROR CAUGHT:", err);
    }
    res.status(statusCode).render("error.ejs", { err });
});

// Server start
const server = app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

// Graceful shutdown for clean restarts (important for Render)
process.on("SIGTERM", () => {
    console.log("SIGTERM signal received: closing HTTP server");
    server.close(async () => {
        console.log("HTTP server closed");
        try {
            await mongoose.disconnect();
            console.log("MongoDB disconnected");
        } catch (err) {
            console.error("Error disconnecting MongoDB:", err);
        }
        process.exit(0);
    });
});

process.on("SIGINT", () => {
    console.log("SIGINT signal received: closing HTTP server");
    server.close(async () => {
        console.log("HTTP server closed");
        try {
            await mongoose.disconnect();
            console.log("MongoDB disconnected");
        } catch (err) {
            console.error("Error disconnecting MongoDB:", err);
        }
        process.exit(0);
    });
});
