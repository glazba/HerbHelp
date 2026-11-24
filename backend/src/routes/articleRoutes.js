const express = require("express");
const router = express.Router();

const {
    getAllArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle
} = require("../controllers/articleController");

//! GET ALL ARTICLES
router.get("/", getAllArticles);

//! GET ARTICLE BY ID
router.get("/:id", getArticleById);

//! CREATE ARTICLE
router.post("/", createArticle);

//! UPDATE ARTICLE
router.put("/:id", updateArticle);

//! DELETE ARTICLE
router.delete("/:id", deleteArticle);

//! EXPORTS
module.exports = router;
