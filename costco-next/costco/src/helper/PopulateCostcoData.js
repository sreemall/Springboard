import connectDatabase from "@/database/db";
import fetchCostcoData from "@/helper/Costco_rapidapi";
import Product from "@/models/productModel";
import Category from "@/models/categoryModel";
import ProductPriceHistory from "@/models/productPriceHistoryModel";

export default async function PopulateCostcoData() {
  
  try {
    await connectDatabase();

    const categories = await Category.find();
    for (const category of categories) {
      console.log("9999 Category Id= ", category.categoryId);

      // 2. Fetch products belonging to this category ID
      const products = await fetchProductsByCategory(
        category.name,
        category.categoryId
      );
      console.log("9999 Products length =", products?.length);
      //console.log("9999 First product =", products?.[0]);

      //Save products in database
      if (!Array.isArray(products)) {
        throw new Error("Costco API did not return a product array");
      }

      console.log(
        "9999 ProductsByCategory for categoryId: ",
        category.categoryId,
        " products len= ",
        products.length
      );

      for (const product of products) {
        //const { name, productId, categoryId, price, discount, imageUrl } = product;
        //console.log("9999 Product received:", product);

        //const newProduct = await Product.create ({name, productId, categoryId, price, discount, imageUrl });

        const newProduct = await Product.findOneAndUpdate(
          { productId: product.productId },
          {
            $set: {
              name: product.name,
              productId: product.productId,
              productNumber: product.productNumber,
              categoryId: product.categoryId,
              price: product.price,
              discount: product.discount,
              imageUrl: product.imageUrl,
            },
          },
          {
            new: true,
            upsert: true,
            runValidators: true,
          }
        );

        //console.log ("9999 Category-id-page after Product.create productId: ", newProduct.productId)

        //Save product price in productsPriceHistory collection
        const productPriceHistory = await ProductPriceHistory.create({
          productId: newProduct.productId,
          price: newProduct.price,
        });
      }
    }
  } catch (error) {
    console.error("Error saving Costco products:", error);
  }
  finally {
    await mongoose.disconnect();
  }

  async function fetchProductsByCategory(name, id) {
    // Replace with your actual DB call or API fetch
    // return [
    // { id: "1", name: "Sample Product A", price: 29.99, image: "/cleaning-supplies.jpeg", onSale: false, discount: 0 },
    // { id: "2", name: "Sample Product B", price: 49.99, image: "/cleaning-supplies.jpeg", onSale: false, discount: 0 }
    // ];

    //return fetchCostcoData("Paper Products", id);
    return fetchCostcoData(name, id);
  }
}
