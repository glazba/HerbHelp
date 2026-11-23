const express = require("express");
const router = express.Router();

const {
    getAllHerbs,
    getHerbById,
    createHerb,
    updateHerb,
    deleteHerb
} = require("../controllers/herbController");

//! GET ALL HERBS
router.get("/", getAllHerbs);

//! GET HERB BY ID
router.get("/:id", getHerbById);

//! CREATE HERB
router.post("/", createHerb);

//! UPDATE HERB
router.put("/:id", updateHerb);

//! DELETE HERB
router.delete("/:id", deleteHerb);

//! EXPORTS
module.exports = router;