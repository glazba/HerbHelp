const express = require("express");
const router = express.Router();

const {
    getAllHerbs,
    getHerbById,
    createHerb,
    updateHerb,
    deleteHerb
} = require("../controllers/herbController");

const { authMiddleware } = require("../middleware/authMiddleware");

//! GET ALL HERBS
router.get("/", getAllHerbs);

//! GET HERB BY ID
router.get("/:id", getHerbById);

//! CREATE HERB
router.post("/", authMiddleware, createHerb);

//! UPDATE HERB
router.put("/:id", authMiddleware, updateHerb);

//! DELETE HERB
router.delete("/:id", authMiddleware, deleteHerb);

//! EXPORTS
module.exports = router;