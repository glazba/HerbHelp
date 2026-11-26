const express = require("express");
const router = express.Router();

const {
    getAllArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle
} = require("../controllers/articleController");

const { authMiddleware } = require("../middleware/authMiddleware");

//! GET ALL ARTICLES
router.get("/", getAllArticles);

//! GET ARTICLE BY ID
router.get("/:id", getArticleById);

//! CREATE ARTICLE
router.post("/", authMiddleware, createArticle);

//! UPDATE ARTICLE
router.put("/:id", authMiddleware, updateArticle);

//! DELETE ARTICLE
router.delete("/:id", authMiddleware, deleteArticle);

//! EXPORTS
module.exports = router;
