import { NextResponse } from "next/server";
import getDataFromToken from "@/helper/getDataFromToken";
import UserProduct from "@/models/userProductModel";
import connectDatabase from "@/database/db";

export async function GET(nextRequest) {
    try {
        const decoded = getDataFromToken(nextRequest);
        
        const { searchParams } = new URL(nextRequest.url);
        const categoryId = searchParams.get("categoryId");

        await connectDatabase();

        const selectedProducts = await UserProduct.find({
            userId: decoded.id,
            categoryId,
        }).select("productId -_id");

        return NextResponse.json({
            success: true,
            selectedProductIds: selectedProducts.map(p => p.productId),
        });
    } catch (error) {
        console.error("Get user products error:", error);

        return NextResponse.json(
            { success: false, message: "Unable to retrieve selected products" },
            { status: 500 }
        );
    }
}


export async function POST(req) {
    try {
        const decoded = getDataFromToken(req);
        //console.log ("999 in save products route decoded= ", decoded);

        const { productIds, categoryId } = await req.json();
        if ( categoryId === undefined ||
             categoryId === null ||
             !Array.isArray(productIds) ) {

            return NextResponse.json(
                { success: false, message: "Invalid categoryId or ProductIds must be an array" },
                { status: 400 }
            );
        }

        //console.log("9999 User:", decoded, "CategoryId: ", categoryId);
        //console.log("9999 Products:", productIds);

        await connectDatabase();

        // Remove products not included in the submitted selection
        await UserProduct.deleteMany({
            userId: decoded.id,
            categoryId,
            productId: { $nin: productIds },
        });

        // Add missing products without modifying existing ones
        if (productIds.length > 0) {
            await UserProduct.bulkWrite(
                [...new Set(productIds)].map(productId => ({
                    updateOne: {
                        filter: {
                            userId: decoded.id,
                            categoryId,
                            productId,
                        },
                        update: {
                            $setOnInsert: {
                                userId: decoded.id,
                                categoryId,
                                productId,
                            },
                        },
                        upsert: true,
                    },
                }))
            );
        }


        // Save productIds for decoded.id
        // for (const productId of productIds) {
        //     const userProduct = await UserProduct.updateOne(
        //         { userId: decoded.id, productId: productId },
        //         {
        //             $setOnInsert: {
        //             userId: decoded.id,
        //             productId: productId,
        //           },
        //         },
        //         {
        //           upsert: true,
        //           runValidators: true,
        //         }
        //       );
        // }

        return NextResponse.json({
            success: true,
            message: "User Product Selection Synchronized"
        });

    } catch (error) {
        console.log("User Product Synchronize error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to Synchronize User Product Selection" },
            { status: 500 }
        );
    }
    
}