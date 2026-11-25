/*
! Tasks:
*   Felhasználónév és jelszó bekérése.
*   Annak ellenőrzése, hogy a felhasználónév még nem foglalt.
*   A jelszó hash-elése bcryptjs segítségével.
*   Az admin mentése az adatbázisba.
*/

const path = require("path");
const readline = require("readline");
const bcrypt = require("bcryptjs");

require("dotenv").config({
    path: path.resolve(__dirname, "../../.env")
});

const { pool } = require("../config/database");

//! TERMINAL INPUT
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//* Ask for username
function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
}

//* Ask for password without displaying input
function askPassword(question) {
    return new Promise((resolve) => {
        const stdin = process.stdin;
        const stdout = process.stdout;

        stdout.write(question);

        stdin.resume();
        stdin.setRawMode(true);

        let password = "";

        function onData(char) {
            const key = char.toString();

            //* Enter
            if (key === "\r" || key === "\n") {
                stdin.setRawMode(false);
                stdin.pause();
                stdin.removeListener("data", onData);
                stdout.write("\n");
                resolve(password);
                return;
            }

            //* Backspace
            if (key === "\u007f" || key === "\b") {
                if (password.length > 0) {
                    password = password.slice(0, -1);
                    stdout.write("\b \b");
                }
                return;
            }

            //* Ctrl + C
            if (key === "\u0003") {
                stdout.write("\n");
                process.exit(1);
            }

            //* Allow only letters, numbers and selected special characters
            if (!/^[a-zA-Z0-9'"+!%\/()=#&@$]$/.test(key)) {
                return;
            }

            password += key;
            stdout.write("*");
        }

        stdin.on("data", onData);
    });
}

//! CREATE ADMIN
async function createAdmin() {
    let connection;

    try {
        const username = (await askQuestion("Admin username: ")).trim();

        rl.close();

        if (!username || username.length > 50) {
            throw new Error("Username must contain between 1 and 50 characters.");
        }

        const password = await askPassword("Admin password: ");
        const confirmPassword = await askPassword("Confirm password: ");

        //! VALIDATE PASSWORD
        if (password !== confirmPassword) {
            throw new Error("Passwords do not match.");
        }

        if (password.length < 12) {
            throw new Error("Password must be at least 12 characters long.");
        }

        connection = await pool.getConnection();
        await connection.beginTransaction();

        //! CHECK USERNAME
        const [existingAdmins] = await connection.query(
            "SELECT id FROM admins WHERE username = ?",
            [username]
        );

        if (existingAdmins.length > 0) {
            throw new Error("This username is already taken.");
        }

        //! HASH PASSWORD
        const passwordHash = await bcrypt.hash(password, 12);

        //! INSERT ADMIN
        await connection.query(
            `
            INSERT INTO admins (username, password_hash)
            VALUES (?, ?)
            `,
            [username, passwordHash]
        );

        await connection.commit();

        console.log(`Admin "${username}" created successfully!`);

    } catch (error) {
        if (connection) {
            try {
                await connection.rollback();
            } catch (rollbackError) {
                console.error("Rollback failed:", rollbackError.message);
            }
        }

        console.error("Admin creation failed:", error.message);
        process.exitCode = 1;

    } finally {
        if (connection) {
            connection.release();
        }

        rl.close();
        await pool.end();
    }
}

//! RUN SCRIPT
createAdmin();
