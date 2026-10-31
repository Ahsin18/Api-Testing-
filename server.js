
// Loading environment variables
require('dotenv').config();

const express = require("express");
const connectDB = require("./database");

const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.status(200).send("Student API is running");
});

// Authentication routes
app.use("/api/auth", authRoutes);

// Student routes
app.use("/api/students", studentRoutes);

// Handling invalid JSON requests
app.use((error, req, res, next) => {
    if (
        error instanceof SyntaxError &&
        error.status === 400 &&
        'body' in error
    ) {
        return res.status(400).json({
            message: "Invalid JSON Request!"
        });
    }

    next(error);
});

// Unknown Routes
app.use((req, res) => {
    res.status(404).json({
        message: "API Endpoint not found!"
    });
});

// Start server only after DB connection is established
async function startServer() {
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is missing in .env file");
        }

        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
}

startServer();
