const { pool } = require("../config/database");

//! GET ALL HERBS
const getAllHerbs = async (req, res) => {
    try {
        const [herbs] = await pool.query(`
            SELECT
                herbs.id,
                herbs.name,
                herbs.description,
                herbs.usage_text AS \`usage\`,
                herbs.warnings,
                herbs.image_url AS image,
                symptoms.id AS symptom_id,
                symptoms.name AS symptom_name
            FROM herbs
            LEFT JOIN herb_symptoms
                ON herbs.id = herb_symptoms.herb_id
            LEFT JOIN symptoms
                ON herb_symptoms.symptom_id = symptoms.id
            ORDER BY herbs.id ASC
        `);

        const formattedHerbs = [];

        for (const row of herbs) {
            let herb = formattedHerbs.find(
                item => item.id === row.id
            );

            if (!herb) {
                herb = {
                    id: row.id,
                    name: row.name,
                    description: row.description,
                    usage: row.usage,
                    warnings: row.warnings,
                    image: row.image,
                    symptoms: []
                };

                formattedHerbs.push(herb);
            }

            if (row.symptom_id !== null) {
                herb.symptoms.push(row.symptom_name);
            }
        }

        res.status(200).json({
            success: true,
            count: formattedHerbs.length,
            data: formattedHerbs
        });

    } catch (error) {
        console.error("Error fetching herbs:", error);

        res.status(500).json({
            success: false,
            message: "Failed to retrieve herbs."
        });
    }
};


//! GET HERB BY ID
const getHerbById = async (req, res) => {
    try {
        const herbId = Number(req.params.id);

        //! ID VALIDATION
        if (!Number.isInteger(herbId) || herbId <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid herb ID."
            });
        }

        const [rows] = await pool.query(
            `
            SELECT
                herbs.id,
                herbs.name,
                herbs.description,
                herbs.usage_text AS \`usage\`,
                herbs.warnings,
                herbs.image_url AS image,
                symptoms.id AS symptom_id,
                symptoms.name AS symptom_name
            FROM herbs
            LEFT JOIN herb_symptoms
                ON herbs.id = herb_symptoms.herb_id
            LEFT JOIN symptoms
                ON herb_symptoms.symptom_id = symptoms.id
            WHERE herbs.id = ?
            `,
            [herbId]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Herb not found."
            });
        }

        const herb = {
            id: rows[0].id,
            name: rows[0].name,
            description: rows[0].description,
            usage: rows[0].usage,
            warnings: rows[0].warnings,
            image: rows[0].image,
            symptoms: rows
                .filter(row => row.symptom_id !== null)
                .map(row => row.symptom_name)
        };

        res.status(200).json({
            success: true,
            data: herb
        });

    } catch (error) {
        console.error("Error fetching herb:", error);

        res.status(500).json({
            success: false,
            message: "Failed to retrieve herb."
        });
    }
};


//! CREATE HERB
const createHerb = async (req, res) => {
    let connection;

    try {
        const {
            name,
            description,
            usage,
            warnings,
            image,
            symptoms
        } = req.body;

        //! VALIDATION
        if (
            typeof name !== "string" || !name.trim() ||
            typeof description !== "string" || !description.trim() ||
            typeof usage !== "string" || !usage.trim() ||
            typeof warnings !== "string" || !warnings.trim() ||
            typeof image !== "string" || !image.trim() ||
            !Array.isArray(symptoms) ||
            symptoms.length === 0 ||
            symptoms.some(symptom =>
                typeof symptom !== "string" || !symptom.trim()
            )
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid or missing herb data."
            });
        }

        //! DATABASE TRANSACTION
        connection = await pool.getConnection();
        await connection.beginTransaction();

        //! INSERT HERB
        const [herbResult] = await connection.query(
            `
            INSERT INTO herbs (
                name,
                description,
                usage_text,
                warnings,
                image_url
            )
            VALUES (?, ?, ?, ?, ?)
            `,
            [
                name.trim(),
                description.trim(),
                usage.trim(),
                warnings.trim(),
                image.trim()
            ]
        );

        const herbId = herbResult.insertId;

        //! INSERT SYMPTOMS AND RELATIONS
        const uniqueSymptoms = [
            ...new Set(symptoms.map(symptom => symptom.trim()))
        ];

        for (const symptomName of uniqueSymptoms) {
            await connection.query(
                "INSERT IGNORE INTO symptoms (name) VALUES (?)",
                [symptomName]
            );

            const [symptomRows] = await connection.query(
                "SELECT id FROM symptoms WHERE name = ?",
                [symptomName]
            );

            const symptomId = symptomRows[0].id;

            await connection.query(
                `
                INSERT INTO herb_symptoms (
                    herb_id,
                    symptom_id
                )
                VALUES (?, ?)
                `,
                [herbId, symptomId]
            );
        }

        //! COMMIT TRANSACTION
        await connection.commit();

        res.status(201).json({
            success: true,
            message: "Herb created successfully.",
            data: {
                id: herbId,
                name: name.trim()
            }
        });

    } catch (error) {
        if (connection) {
            await connection.rollback();
        }

        console.error("Error creating herb:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create herb."
        });

    } finally {
        if (connection) {
            connection.release();
        }
    }
};


//! UPDATE HERB
const updateHerb = async (req, res) => {
    let connection;

    try {
        const herbId = Number(req.params.id);

        const {
            name,
            description,
            usage,
            warnings,
            image,
            symptoms
        } = req.body;

        //! ID VALIDATION
        if (!Number.isInteger(herbId) || herbId <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid herb ID."
            });
        }

        //! DATA VALIDATION
        if (
            typeof name !== "string" || !name.trim() ||
            typeof description !== "string" || !description.trim() ||
            typeof usage !== "string" || !usage.trim() ||
            typeof warnings !== "string" || !warnings.trim() ||
            typeof image !== "string" || !image.trim() ||
            !Array.isArray(symptoms) ||
            symptoms.length === 0 ||
            symptoms.some(symptom =>
                typeof symptom !== "string" || !symptom.trim()
            )
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid or missing herb data."
            });
        }

        //! DATABASE TRANSACTION
        connection = await pool.getConnection();
        await connection.beginTransaction();

        //! CHECK HERB
        const [existingHerbs] = await connection.query(
            "SELECT id FROM herbs WHERE id = ?",
            [herbId]
        );

        if (existingHerbs.length === 0) {
            await connection.rollback();

            return res.status(404).json({
                success: false,
                message: "Herb not found."
            });
        }

        //! UPDATE HERB
        await connection.query(
            `
            UPDATE herbs
            SET
                name = ?,
                description = ?,
                usage_text = ?,
                warnings = ?,
                image_url = ?,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
            `,
            [
                name.trim(),
                description.trim(),
                usage.trim(),
                warnings.trim(),
                image.trim(),
                herbId
            ]
        );

        //! REMOVE OLD SYMPTOM CONNECTIONS
        await connection.query(
            "DELETE FROM herb_symptoms WHERE herb_id = ?",
            [herbId]
        );

        //! INSERT SYMPTOMS
        const uniqueSymptoms = [
            ...new Set(symptoms.map(symptom => symptom.trim()))
        ];

        for (const symptomName of uniqueSymptoms) {
            await connection.query(
                "INSERT IGNORE INTO symptoms (name) VALUES (?)",
                [symptomName]
            );

            const [symptomRows] = await connection.query(
                "SELECT id FROM symptoms WHERE name = ?",
                [symptomName]
            );

            const symptomId = symptomRows[0].id;

            await connection.query(
                `
                INSERT INTO herb_symptoms (
                    herb_id,
                    symptom_id
                )
                VALUES (?, ?)
                `,
                [herbId, symptomId]
            );
        }

        //! COMMIT TRANSACTION
        await connection.commit();

        res.status(200).json({
            success: true,
            message: "Herb updated successfully.",
            data: {
                id: herbId,
                name: name.trim()
            }
        });

    } catch (error) {
        if (connection) {
            await connection.rollback();
        }

        console.error("Error updating herb:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update herb."
        });

    } finally {
        if (connection) {
            connection.release();
        }
    }
};


//! DELETE HERB
const deleteHerb = async (req, res) => {
    try {
        const herbId = Number(req.params.id);

        //! ID VALIDATION
        if (!Number.isInteger(herbId) || herbId <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid herb ID."
            });
        }

        //! DELETE HERB
        const [result] = await pool.query(
            "DELETE FROM herbs WHERE id = ?",
            [herbId]
        );

        //! CHECK IF HERB EXISTS
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Herb not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Herb deleted successfully."
        });

    } catch (error) {
        console.error("Error deleting herb:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete herb."
        });
    }
};


//! EXPORTS
module.exports = {
    getAllHerbs,
    getHerbById,
    createHerb,
    updateHerb,
    deleteHerb
};