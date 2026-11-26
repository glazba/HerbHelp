const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { pool } = require("../config/database");

//! ADMIN LOGIN
async function login(req, res) {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Username and password are required."
            });
        }

        //* Find admin by username
        const [rows] = await pool.query(
            `
            SELECT id, username, password_hash
            FROM admins
            WHERE username = ?
            LIMIT 1
            `,
            [username]
        );

        if (rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password."
            });
        }

        const admin = rows[0];

        //* Compare password with stored hash
        const isPasswordValid = await bcrypt.compare(
            password,
            admin.password_hash
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password."
            });
        }

        //* Generate JWT
        const token = jwt.sign(
            {
                id: admin.id,
                username: admin.username
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );

        //* Store JWT in HttpOnly cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: "Login successful.",
            admin: {
                id: admin.id,
                username: admin.username
            }
        });

    } catch (error) {
        console.error("Admin login failed:", error.message);

        return res.status(500).json({
            success: false,
            message: "An internal server error occurred."
        });
    }
}

//! GET CURRENT ADMIN
function getMe(req, res) {
    return res.status(200).json({
        success: true,
        admin: {
            id: req.admin.id,
            username: req.admin.username
        }
    });
}

//! ADMIN LOGOUT
function logout(req, res) {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
    });

    return res.status(200).json({
        success: true,
        message: "Logout successful."
    });
}

//! EXPORTS
module.exports = {
    login,
    getMe,
    logout
};
