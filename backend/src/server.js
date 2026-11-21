const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

require("dotenv").config();

const { testConnection } = require("./config/database");

const herbRoutes = require("./routes/herbRoutes");

//! APP
const app = express();

//! MIDDLEWARE
app.use(helmet());
app.use(cors());
app.use(express.json());

//! ROUTES
app.use("/api/herbs", herbRoutes);

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Herbhelp API is running."
    });
});

//! SERVER
const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await testConnection();

        app.listen(PORT, () => {
            console.log(`HerbHelp API running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed.");
        process.exit(1);
    }
}

startServer();
