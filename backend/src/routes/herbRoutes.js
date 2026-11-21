const express = require("express");
const router = express.Router();

const {
    getAllHerbs
} = require("../controllers/herbController");

//! GET ALL HERBS
router.get("/", getAllHerbs);

//! EXPORTS
module.exports = router;