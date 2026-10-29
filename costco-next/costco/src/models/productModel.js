import mongoose from "mongoose";

const productSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, "Please Provide a First Name"],
        unique: false
    },
    productId: {
        type: String,
        required: true,
        unique: true
    },
    categoryId: {
        // type: Schema.Types.ObjectId,

        type: String,
        required: true   
    },
    price: {
        type: Number,
        required: [true, "Please Provide a Price"],
        min: [0, "Price cannot be Negative"],
    },
    discount: {
        type: String,
        default: ""
    },
    imageUrl: {
        type: String
    },
    onSale: {
        type: Boolean,
        default: false
    },
    // createdTs: {
    //     type: Date,
    //     default: Date.now,
    // },
    // updatedTs: {
    //     type: Date,
    //     default: Date.now,
    // }

},
{
    timestamps: {
        createdAt: "createdTs",
        updatedAt: "updatedTs",
    },
});

// Automatically determine whether the product is on sale
productSchema.pre("validate", function () {
    this.onSale =
      typeof this.discount === "string" &&
      /\boff\b/i.test(this.discount);
});

const Product = mongoose.models.Product || mongoose.model ("Product", productSchema, "products");

export default Product;
