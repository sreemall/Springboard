import mongoose from "mongoose";

const userProductSchema = new mongoose.Schema ({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    categoryId: {
        type: Number,
        ref: "Category",
        required: true,
    },
    productId: {
        type: String,
        ref: "Product",
        required: true,
    }
});
    userProductSchema.index (
        {userId: 1, productId: 1},
        {unique: true}
    );


const UserProduct = mongoose.models.UserProduct ||
                                mongoose.model ("UserProduct", userProductSchema, "userProducts");

export default UserProduct;
