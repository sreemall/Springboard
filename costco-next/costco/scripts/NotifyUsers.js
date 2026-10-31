import UserProduct from "../src/models/userProductModel.js";
import Product from "../src/models/productModel.js";
import User from "../src/models/userModel.js"
import Category from "../src/models/categoryModel.js";
import sendEmail from "../src/helper/sendEmail.js";
import connectDatabase from "../src/database/db.js";
import categories from "../src/data/categories.js";
import mongoose from "mongoose";

export default async function NotifyUsers () {

    async function emailUsersAboutSaleProducts () {
        //console.log ("999 In emailUsersAboutSaleProducts ....")
        // Find products currently on sale
        const onSaleProducts = await Product.find({
            onSale: true,
        }).lean();
    

        if (onSaleProducts.length === 0) {
            console.log ("9999 No Products are On Sale.  No Notifications are Sent!")
            return;
        }
    
        // Find users interested in those products
        const userProducts = await UserProduct.find({
            $or: onSaleProducts.map(product => ({
                productId: product.productId,
                categoryId: product.categoryId,
            })),
        }).lean();

        // Build a map of product names by productId + categoryId
        const productNameMap = new Map (
                onSaleProducts.map (product => 
                    [`${product.productId}_${product.categoryId}`, product.name]));

        // Fetch category names in ONE query
        const categories = await Category.find().select("categoryId name").lean();

        const categoryNameMap = new Map(
            categories.map(category => [ category.categoryId, category.name ])
        );

        //Add product name to each record of userProducts
        const userProductsWithName = userProducts.map (up => (
                    {   ...up,
                        productName: productNameMap.get (`${up.productId}_${up.categoryId}`)
                    }
        ));
    
        // Group on sale products by user
        const productsByUser = new Map();
        for (const up of userProductsWithName) {
            const userId = String(up.userId);
            if (!productsByUser.has (userId))
                productsByUser.set (userId, []);

            // productsByUser.get(userId).add (up.productName);

            const categoryName = categoryNameMap.get(up.categoryId);

            const returnUrl = `/categories/${up.categoryId}?name=${encodeURIComponent(categoryName)}`;

            const url = `https://springboard-costco-next.vercel.app/login?returnUrl=${encodeURIComponent(returnUrl)}`;

            productsByUser.get(userId).push ({productName: up.productName, url});
        }

        //console.log ("999 productsByUser: ", productsByUser);

    
        // Fetch all corresponding user emails in one query
        const userIds = [...productsByUser.keys()];

        const users = (await User.find ({_id: {$in: userIds}}).select("_id email firstName").lean())
                                            .map (({_id, email, firstName}) => ({userId: String(_id), email, firstName})
                                            );

        //console.log ("999 userIds: ", userIds, " users: ", users);

        // Send one email per user
        for (const user of users) {
            //console.log ("999 Notify User: ", String(user.userId));
            const productNameUrls = productsByUser.get(String(user.userId)) || [];
    
            if (productNameUrls.length != 0) {
                //console.log ("... sending email data: ", productNames);
                await sendEmail (user.firstName, user.email, productNameUrls);
            }
        }
    }

    try {
        //console.log ("999 In NotifyUsers try{} ....");
        await connectDatabase();
        // sendEmail ();
        await emailUsersAboutSaleProducts ();

    }
    catch (error) {
        console.log("Error inserting categories:", error.message);
        console.error("Error inserting categories:", error.message);
    }
    finally {
        await mongoose.disconnect();
    }
    
}

await NotifyUsers();