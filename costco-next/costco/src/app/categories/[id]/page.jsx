import ProductsSelection from "@/components/ProductsSelection";
import "@/app/Pages.css";
import fetchCostcoData from "@/helper/Costco_rapidapi";
import Product from "@/models/productModel";
import connectDatabase from "@/database/db";


export default async function ProductsByCategory({ params, searchParams }) {
  await connectDatabase();
  const { id } = await params;
  const { name } = await searchParams;
  console.log("9999 Category Id= ", id, name);
  let products = [];

  // 2. Fetch products belonging to this category ID
  try {
    products = await Product.find({ categoryId: id }).lean ();
    products = JSON.parse(JSON.stringify(products));
    console.log("9999 Products length =", products?.length);
  }
  catch (error) {
    console.error("Error saving Costco products:", error);
  }
  
  

  return (
    <div className="container">
      <h2>{name}</h2>
      {/* <p>Category ID: {id}</p> */}

      <ProductsSelection products={products} categoryId={id} />
    </div>
  );
}
