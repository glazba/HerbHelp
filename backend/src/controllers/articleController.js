const { pool } = require("../config/database");

//! GET ALL ARTICLES
const getAllArticles = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT
                id,
                title,
                description,
                content,
                created_at,
                updated_at
            FROM articles
            ORDER BY created_at DESC
            `);

        res.status(200).json({
            succes: true,
            count: rows.length,
            data: rows
        });
    } catch (error) {
        console.error("Error fetching article:", error);

        res.status(500).json({
            success: false,
            message: "Failed to retrieve articles."
        });
    }
};


//! GET ARTICLE BY ID

const getArticleById = async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await pool.query(
            `
            SELECT
                id,
                title,
                description,
                content,
                created_at,
                updated_at
            FROM articles
            WHERE id = ?
            `,
            [id]
        );

        //! CHECK IF ARTICLE EXISTS
        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Article not found."
            });
        }

        res.status(200).json({
            success: true,
            data: rows[0]
        });

    } catch (error) {
        console.error("Error fetching article:", error);

        res.status(500).json({
            success: false,
            message: "Failed to retrieve article."
        });
    }
};


//! CREATE ARTICLE
const createArticle = async (req, res) => {
    const { title, description, content } = req.body;

    //! VALIDATION
    if (
        !title || typeof title !== "string" || !title.trim() ||
        !description || typeof description !== "string" || !description.trim() ||
        !content || typeof content !== "string" || !content.trim()
    ) {
        return res.status(400).json({
            success: false,
            message: "Title, desctiption and content are required."
        });
    }

    try {
        //! INSERT ARTICLE
        const [result] = await pool.query(
            `
            INSERT INTO articles (title, description, content)
            VALUES (?, ?, ?)
            `,
            [
                title.trim(),
                description.trim(),
                content.trim()
            ]
        );

        res.status(201).json({
            success: true,
            message: "Article created successfully.",
            data: {
                id: result.insertId,
                title: title.trim(),
                description: description.trim(),
                content: content.trim()
            }
        });

    } catch (error) {
        console.error("Error creating article", error);

        res.status(500).json({
            success: false,
            message: "Failed to create article."
        });
    }
}


//! UPDATE ARTICLE
const updateArticle = async (req, res) => {
    const { id } = req.params;
    const { title, description, content } = req.body;

    //! VALIDATION
    if (
        !title || typeof title !== "string" || !title.trim() ||
        !description || typeof description !== "string" || !description.trim() ||
        !content || typeof content !== "string" || !content.trim()
    ) {
        return res.status(400).json({
            success: false,
            message: "Title, description and content are required."
        });
    }

    try {
        //! CHECK IF ARTICLE EXISTS
        const [existingArticles] = await pool.query(
            "SELECT id FROM articles WHERE id = ?",
            [id]
        );

        if (existingArticles.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Article not found."
            });
        }

        //! UPDATE ARTICLE
        await pool.query(
            `
            UPDATE articles
            SET
                title = ?,
                description = ?,
                content = ?,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
            `,
            [
                title.trim(),
                description.trim(),
                content.trim(),
                id
            ]
        );

        res.status(200).json({
            success: true,
            message: "Article updated successfully.",
            data: {
                id: Number(id),
                title: title.trim(),
                description: description.trim(),
                content: content.trim()
            }
        });

    } catch (error) {
        console.error("Error updating article:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update article."
        });
    }
};


//! DELETE ARTICLE
const deleteArticle = async (req, res) => {
    const { id } = req.params;

    try {
        //! CHECK IF ARTICLE EXISTS
        const [existingArticles] = await pool.query(
            "SELECT id FROM articles WHERE id = ?",
            [id]
        );

        if (existingArticles.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Article not found."
            });
        }

        //! DELETE ARTICLE
        await pool.query(
            "DELETE FROM articles WHERE id = ?",
            [id]
        );

        res.status(200).json({
            success: true,
            message: "Article deleted successfully."
        });

    } catch (error) {
        console.error("Error deleting article:", error)

        res.status(500).json({
            success: false,
            message: "Failed to delete article."
        });
    }
};

//! EXPORTS
module.exports = {
    getAllArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle
};
