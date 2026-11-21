const { pool } = require("../config/database");

//! GET ALL HERBS
const getAllHerbs = async (req, res) => {
    try {
        const [herbs] = await pool.query(`
            SELECT
                herbs.id,
                herbs.name,
                herbs.description,
                herbs.usage_text AS "usage",
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
        console.error("Error fetching herbs", error);

        res.status(500).json({
            success: false,
            message: "Failed to retrieve herbs."
        });
    }
};

//! EXPORTS
module.exports = {
    getAllHerbs
};
