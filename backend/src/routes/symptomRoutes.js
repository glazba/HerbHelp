const express = require("express");
const router = express.Router();

const {
    getAllSymptoms,
    getSymptomById,
    createSymptom,
    updateSymptom,
    deleteSymptom
} = require("../controllers/symptomController");

const { authMiddleware } = require("../middleware/authMiddleware");

//! GET ALL SYMPTOMS
router.get("/", getAllSymptoms);

//! GET SYMPTOM BY ID
router.get("/:id", getSymptomById);

//! CREATE SYMPTOM
router.post("/", authMiddleware, createSymptom);

//! UPDATE SYMPTOMS
router.put("/:id", authMiddleware, updateSymptom);

//! DELETE SYMPTOMS
router.delete("/:id", authMiddleware, deleteSymptom);

//! EXPORTS
module.exports = router;
