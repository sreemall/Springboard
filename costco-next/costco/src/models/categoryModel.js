import mongoose from "mongoose";

const categorySchema = new mongoose.Schema ({
    categoryId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: [true, "Please Provide a name"],
    },
    image: {
        type: String
    },
    createdTs: {
        type: Date,
        default: Date.now,
    }
});

const Category = mongoose.models.Category ||
                                mongoose.model ("Category", categorySchema, "categories");

export default Category;
