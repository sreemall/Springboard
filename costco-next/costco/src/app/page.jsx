//import categories from "@/data/categories";
import CategoryCard from "@/components/CategoryCard";
import connectDatabase from "@/database/db";
import Category from "@/models/categoryModel";
import mongoose from "mongoose";
import "@/app/Pages.css";



export default async function HomePage() {
  console.log ("9999 In HOME PAGE");
  let categories = [];
  try {
    await connectDatabase();
    categories = await Category.find();
  } catch (error) {
    console.error("Error saving Costco products:", error);
  }
  // finally {
  //   await mongoose.disconnect();
  // }

  return (
    <div className="container">
        <h2>Choose Products to watch by Category</h2>
        <div className="categories">
            {categories.map((category) => (
              <CategoryCard
                  key={category.categoryId}
                  category={category}
              />
            ))}
        </div>
    </div>
  );
}