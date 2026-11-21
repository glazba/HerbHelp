const mysql = require("mysql2/promise");

//! CONNECTION POOL

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

//! CONNECTION TEST
async function testConnection() {
    let connection;

    try {
        connection = await pool.getConnection();

        console.log("MySQL database connected successfully.");

        return true;

    } catch (error) {
        console.error("MySQL connection failed:", error.message);

        throw error;

    } finally {
        if (connection) {
            connection.release();
        }
    }
}

//!EXPORTS
module.exports = {
    pool,
    testConnection
};

