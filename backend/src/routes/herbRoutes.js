const express = require("express");
const router = express.Router();

const {
    getAllHerbs,
    getHerbById,
    createHerb
} = require("../controllers/herbController");

//! GET ALL HERBS
router.get("/", getAllHerbs);

//! GET HERB BY ID
router.get("/:id", getHerbById);

//! CREATE HERB
router.post("/", createHerb);

//! EXPORTS
module.exports = router;