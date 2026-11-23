const { pool } = require("../config/database");

//! GET ALL SYMPTOMS

const getAllSymptoms = async (req, res) => {

    try {
        const [rows] = await pool.query(`
            SELECT
                symptoms.id,
                symptoms.name,
                herbs.id AS herb_id,
                herbs.name AS herb_name
            FROM symptoms
            LEFT JOIN herb_symptoms
                ON symptoms.id = herb_symptoms.symptom_id
            LEFT JOIN herbs
                ON herb_symptoms.herb_id = herbs.id
            ORDER BY symptoms.id ASC, herbs.id ASC
            `);

        //! FORMAT SYMPTOMS
        const formattedSymptoms = [];

        for (const row of rows) {
            let symptom = formattedSymptoms.find(
                item => item.id === row.id
            );

            if (!symptom) {
                symptom = {
                    id: row.id,
                    name: row.name,
                    herbs: []
                };

                formattedSymptoms.push(symptom);
            }

            if (row.herb_id !== null) {
                symptom.herbs.push({
                    id: row.herb_id,
                    name: row.herb_name
                });
            }
        }

        res.status(200).json({
            success: true,
            count: formattedSymptoms.length,
            data: formattedSymptoms
        });

    } catch (error) {
        console.error("Error fetching symptoms:", error);

        res.status(500).json({
            success: false,
            message: "Failed to retrieve symptoms."
        });
    }
};


//! GET SYMPTOM BY ID

const getSymptomById = async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await pool.query(
            `
            SELECT
                symptoms.id,
                symptoms.name,
                herbs.id AS herb_id,
                herbs.name AS herb_name
            FROM symptoms
            LEFT JOIN herb_symptoms
                ON symptoms.id = herb_symptoms.symptom_id
            LEFT JOIN herbs
                ON herb_symptoms.herb_id = herbs.id
            WHERE symptoms.id = ?
            ORDER BY herbs.id ASC
            `,
            [id]
        );

        //! CHECK IF SYMPTOM EXISTS
        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Symptom not found."
            });
        }

        //! FORMAT SYMPTOM
        const symptom = {
            id: rows[0].id,
            name: rows[0].name,
            herbs: []
        };

        for (const row of rows) {
            if (row.herb_id !== null) {
                symptom.herbs.push({
                    id: row.herb_id,
                    name: row.herb_name
                });
            }
        }

        res.status(200).json({
            success: true,
            data: symptom
        });

    } catch (error) {
        console.error("Error fetching symptom:", error);

        res.status(500).json({
            success: false,
            message: "Failed to retrieve symptom."
        });
    }
};


//! CREATE SYMPTOM

const createSymptom = async (req, res) => {
    const { name, herbIds } = req.body;

    //! VALIDATION
    if (!name || typeof name !== "string" || !name.trim()) {
        return res.status(400).json({
            success: false,
            message: "Symptom name is required."
        });
    }

    if (!Array.isArray(herbIds) || herbIds.length === 0) {
        return res.status(400).json({
            success: false,
            message: "At least one herb must be assigned."
        });
    }

    //! VALIDATE HERB IDS
    const uniqueHerbIds = [...new Set(herbIds)];

    if (
        uniqueHerbIds.some(
            id => !Number.isInteger(id) || id <= 0
        )
    ) {
        return res.status(400).json({
            success: false,
            message: "Invalud herb ID."
        });
    }

    let connection;

    try {
        connection = await pool.getConnection();

        await connection.beginTransaction();

        //! CHECK IF SYMPTOM ALREADY EXISTS
        const [existingSymptoms] = await connection.query(
            "SELECT id FROM symptoms WHERE name = ?",
            [name.trim()]
        );

        if (existingSymptoms.length > 0) {
            await connection.rollback();

            return res.status(409).json({
                success: false,
                message: "This symptom already exists."
            });
        }

        //! CHECK IF ALL HERBS EXIST
        const placeholders = uniqueHerbIds.map(() => "?").join(", ");

        const [existingHerbs] = await connection.query(
            `SELECT id FROM herbs WHERE id IN (${placeholders})`,
            uniqueHerbIds
        );

        if (existingHerbs.length !== uniqueHerbIds.length) {
            await connection.rollback();

            return res.status(400).json({
                success: false,
                message: "One or more herbs do not exist."
            });
        }

        //! INSERT SYMPTOM
        const [result] = await connection.query(
            "INSERT INTO symptoms (name) VALUES (?)",
            [name.trim()]
        );

        const symptomId = result.insertId;

        //! INSERT HERB-SYMPTOM RELATIONS
        const relations = uniqueHerbIds.map(herbId => [
            herbId,
            symptomId
        ]);

        await connection.query(
            "INSERT INTO herb_symptoms (herb_id, symptom_id) values ?",
            [relations]
        );

        await connection.commit();

        res.status(201).json({
            success: true,
            message: "Symptom created successfully.",
            data: {
                id: symptomId,
                name: name.trim(),
                herbIds: uniqueHerbIds
            }
        });

    } catch (error) {
        if (connection) {
            await connection.rollback();
        }

        console.error("Error creating symptom:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create symptom."
        });

    } finally {
        if (connection) {
            connection.release();
        }
    }
};


//! UPDATE SYMPTOM

const updateSymptom = async (req, res) => {
    const { id } = req.params;
    const { name, herbIds } = req.body;

    //! VALIDATION
    if (!name || typeof name !== "string" || !name.trim()) {
        return res.status(400).json({
            success: false,
            message: "Symptom name is required."
        });
    }

    if (!Array.isArray(herbIds) || herbIds.length === 0) {
        return res.status(400).json({
            success: false,
            message: "At least one herb must be assigned."
        });
    }

    const uniqueHerbIds = [...new Set(herbIds)];

    if (
        uniqueHerbIds.some(
            herbId => !Number.isInteger(herbId) || herbId <= 0
        )
    ) {
        return res.status(400).json({
            success: false,
            message: "Invalid herb ID."
        });
    }

    let connection;

    try {
        connection = await pool.getConnection();

        await connection.beginTransaction();

        //! CHECK IF SYMPTOM EXISTS
        const [existingSymptoms] = await connection.query(
            "SELECT id FROM symptoms WHERE id = ?",
            [id]
        );

        if (existingSymptoms.length === 0) {
            await connection.rollback();

            return res.status(404).json({
                success: false,
                message: "Symptom not found."
            });
        }

        //! CHECK FOR DUPLICATE NAME
        const [duplicateSymptoms] = await connection.query(
            "SELECT id FROM symptoms WHERE name = ? AND id != ?",
            [name.trim(), id]
        );

        if (duplicateSymptoms.length > 0) {
            await connection.rollback();

            return res.status(409).json({
                success: false,
                message: "This symptom name already exists."
            });
        }

        //! CHECK IF ALL HERBS EXIST
        const placeholders = uniqueHerbIds.map(() => "?").join(", ");

        const [existingHerbs] = await connection.query(
            `SELECT id FROM herbs WHERE id IN (${placeholders})`,
            uniqueHerbIds
        );

        if (existingHerbs.length !== uniqueHerbIds.length) {
            await connection.rollback();

            return res.status(400).json({
                success: false,
                message: "One or more herbs do not exist."
            });
        }

        //! UPDATE SYMPTOM NAME
        await connection.query(
            `UPDATE symptoms
             SET name = ?, updated_at = CURRENT_TIMESTAMP
             WHERE id = ?`,
            [name.trim(), id]
        );

        //! DELETE OLD RELATIONS
        await connection.query(
            "DELETE FROM herb_symptoms WHERE symptom_id = ?",
            [id]
        );

        //! INSERT NEW RELATIONS
        const relations = uniqueHerbIds.map(herbId => [
            herbId,
            Number(id)
        ]);

        await connection.query(
            "INSERT INTO herb_symptoms (herb_id, symptom_id) VALUES ?",
            [relations]
        );

        await connection.commit();

        res.status(200).json({
            success: true,
            message: "Symptom updated successfully.",
            data: {
                id: Number(id),
                name: name.trim(),
                herbIds: uniqueHerbIds
            }
        });

    } catch (error) {
        if (connection) {
            await connection.rollback();
        }

        console.error("Error updating symptom:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update symptom."
        });

    } finally {
        if (connection) {
            connection.release();
        }
    }
};


//! DELETE SYMPTOM
const deleteSymptom = async (req, res) => {
    const { id } = req.params;

    try {
        //! CHECK IF SYMPTOM EXISTS
        const [existingSymptoms] = await pool.query(
            "SELECT id FROM symptoms WHERE id = ?",
            [id]
        );

        if (existingSymptoms.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Symptom not found."
            });
        }

        //! DELETE SYMPTOM
        await pool.query(
            "DELETE FROM symptoms WHERE id = ?",
            [id]
        );

        res.status(200).json({
            success: true,
            message: "Symptom deleted successfully."
        });

    } catch (error) {
        console.error("Error deleting symptom:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete symptom."
        });
    }
};


//! EXPORTS

module.exports = {
    getAllSymptoms,
    getSymptomById,
    createSymptom,
    updateSymptom,
    deleteSymptom
};
