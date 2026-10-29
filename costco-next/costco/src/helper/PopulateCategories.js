//import connectDatabase from "../database/db.js";
//import mongoose from "mongoose";
import Category from "../models/categoryModel.js";
import categories from "../data/categories.js";
//import mongoose from "mongoose";

export default async function PopulateCategories() {
    try {   
        // await connectDatabase();

        const result = await Category.insertMany(categories, { ordered: true, });

        console.log(`Successfully inserted ${result.length} categories.`);
    }
    catch (error) {
        console.error("Error inserting categories:", error.message);
    }
    // finally {
    //     await mongoose.disconnect();
    // }
}

