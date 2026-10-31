const mongoose = require("mongoose");

async function connectDB() {
    const mongo_uri = process.env.MONGO_URI;

    if (!mongo_uri) {
        throw new Error("MONGO_URI is not defined in the environment variables");
    }

    try {
        await mongoose.connect(mongo_uri, {
            serverSelectionTimeoutMS: 10000,
        });

        console.log("MongoDB connected successfully");
        console.log("Database ", mongoose.connection.name);
        console.log("HOST ", mongoose.connection.host);


    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        console.error("Reason: ", error.reason);
        throw error;
    }
}
mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
});

mongoose.connection.on("connected", () => {
    console.log("MongoDB connected");
});

module.exports = connectDB;