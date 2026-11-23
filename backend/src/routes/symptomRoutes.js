const express = require("express");
const router = express.Router();

const {
    getAllSymptoms,
    getSymptomById,
    createSymptom,
    updateSymptom,
    deleteSymptom
} = require("../controllers/symptomController");
const { updateHerb } = require("../controllers/herbController");

//! GET ALL SYMPTOMS
router.get("/", getAllSymptoms);

//! GET SYMPTOM BY ID
router.get("/:id", getSymptomById);

//! CREATE SYMPTOM
router.post("/", createSymptom);

//! UPDATE SYMPTOMS
router.put("/:id", updateSymptom);

//! DELETE SYMPTOMS
router.delete("/:id", deleteSymptom)

//! EXPORTS
module.exports = router;
