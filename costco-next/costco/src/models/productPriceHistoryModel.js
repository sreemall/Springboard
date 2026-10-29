import mongoose from "mongoose";

const productPriceHistorySchema = new mongoose.Schema ({
    productId: {
        type: String,
        required: true
    },
    createdTs: {
        type: Date,
        default: Date.now,
    },
    price: {
        type: Number,
        required: [true, "Please Provide a Price"],
        min: [0, "Price cannot be Negative"],
    }
});

const ProductPriceHistory = mongoose.models.ProductPriceHistory ||
                                mongoose.model ("ProductPriceHistory", productPriceHistorySchema, "productPriceHistories");

export default ProductPriceHistory;
