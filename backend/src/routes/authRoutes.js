const express = require("express");

const {
    login,
    logout
} = require("../controllers/authController");

//! ROUTER
const router = express.Router();

//! ROUTES
router.post("/login", login);
router.post("/logout", logout);

//! EXPORTS
module.exports = router;
