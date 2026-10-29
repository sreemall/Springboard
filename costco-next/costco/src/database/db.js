// const mongoose = require ("mongoose");
import mongoose from "mongoose";

let isConnected = false;
const connectDatabase = async () => {
    if (isConnected)
        return;

    try {
        const dbConnection = await mongoose.connect (`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
        isConnected = dbConnection.connections[0].readyState === 1;
        console.log ("Connected to MongoDB");
    }
    catch (error) {
        console.error (`Error while connecting to database : ${error.message}`);
        // process.exit (1);
        throw new Error("Database connection failed");
    }
}

export default connectDatabase;