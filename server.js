require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const foodRoutes = require("./routes/foodRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Parse incoming JSON request bodies
app.use(express.json());

// Health / home route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Food Ordering Management API is running"
    });
});

// API routes
app.use("/api/foods", foodRoutes);
app.use("/api/orders", orderRoutes);

// Unknown route handler
app.use((req, res) => {
    res.status(404).json({
        message: "API endpoint not found"
    });
});

// Central error handler
app.use((err, req, res, next) => {
    console.error("API error:", err);

    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.status(400).json({ message: "Invalid JSON request body" });
    }

    res.status(err.status || 500).json({
        message: err.message || "Internal server error"
    });
});

// Connect to MongoDB before starting the server
async function startServer() {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
}

startServer();