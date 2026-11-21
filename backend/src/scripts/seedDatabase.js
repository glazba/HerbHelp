const path = require("path");

require("dotenv").config({
    path: path.resolve(__dirname, "../../.env")
});

const { herbs, articles } = require("../../../js/data");
const { pool } = require("../config/database");

//! DATABASE SEED
async function seedDatabase() {
    let connection;

    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        console.log("Starting database migration...");

        //! HERBS
        for (const herb of herbs) {
            await connection.query(
                `
                INSERT INTO herbs (
                    id,
                    name,
                    description,
                    usage_text,
                    warnings,
                    image_url
                )

                VALUES (?, ?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                    name = VALUES(name),
                    description = VALUES(description),
                    usage_text = VALUES(usage_text),
                    warnings = VALUES(warnings),
                    image_url = VALUES(image_url)
                `,
                [
                    herb.id,
                    herb.name,
                    herb.description,
                    herb.usage,
                    herb.warnings,
                    herb.image
                ]
            );

            // Remove old symptom connections before recreating them
            await connection.query(
                "DELETE FROM herb_symptoms WHERE herb_id = ?",
                [herb.id]
            );

            //! SYMPTOMS
            for (const symptomName of herb.symptoms) {
                await connection.query(
                    "INSERT IGNORE INTO symptoms (name) VALUES (?)",
                    [symptomName]
                );

                const [symptomRows] = await connection.query(
                    "SELECT id FROM symptoms WHERE name = ?",
                    [symptomName]
                );

                const symptomId = symptomRows[0].id;

                //! HERB-SYMPTOM CONNECTION
                await connection.query(
                    `
                    INSERT IGNORE INTO herb_symptoms (
                        herb_id,
                        symptom_id
                    )
                    VALUES (?, ?)
                    `,
                    [herb.id, symptomId]
                );
            }
        }

        //! ARTICLES
        for (const article of articles) {
            await connection.query(
                `
                INSERT INTO articles (
                    id,
                    title,
                    description,
                    content
                )
                VALUES (?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                    title = VALUES(title),
                    description = VALUES(description),
                    content = VALUES(content)
                `,
                [
                    article.id,
                    article.title,
                    article.description,
                    article.content
                ]
            );
        }

        await connection.commit();

        console.log("Database migration completed successfully!");
        console.log(`Herbs imported: ${herbs.length}`);
        console.log(`articles imported: ${articles.length}`);

    } catch (error) {
        if (connection) {
            await connection.rollback();
        }

        console.error("Database migration failed:", error.message);
        process.exitCode = 1;
    } finally {
        if (connection) {
            connection.release();
        }

        await pool.end();
    }
}

seedDatabase();
