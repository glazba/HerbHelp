const express = require("express");
const { rateLimit } = require("express-rate-limit");

const {
    login,
    getMe,
    logout
} = require("../controllers/authController");

const { authMiddleware } = require("../middleware/authMiddleware");

//! ROUTER
const router = express.Router();

//! LOGIN RATE LIMITER
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many login attempts. Please try again later."
    }
});

//! ADMIN LOGIN ROUTE
router.post("/login", loginLimiter, login);

//! GET CURRENT ADMIN
router.get("/me", authMiddleware, getMe);

//! ADMIN LOGOUT ROUTE
router.post("/logout", logout);

//! EXPORTS
module.exports = router;
