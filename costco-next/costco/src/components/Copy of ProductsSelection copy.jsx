"use client";

import {useState, useEffect} from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ProductSelection ({products, categoryId}) {
    const [selectedProdIds, setSelectedProdIds] = useState ([]);
    const [loadingSelection, setLoadingSelection] = useState(true);
    
    const nextRouter = useRouter ();

    const handleProductSelected = (productId) => {
        console.log ("9999 Selected clicked - prodId: ", productId);
        setSelectedProdIds ((prev) => {
            if (prev.includes (productId)) {
                //remove from selectedProdIds
                return prev.filter ((id) => id !== productId)
            }
            else {
                //add prodId to selectedProdIds
                return [...prev, productId];
            }
        });
    }

    const handleSaveSelection = async () => {
        //save all products in selectedProdIds into database for a given user
        
        console.log ("999 In handleSaveSelection");
        try {
            const response = await axios.post( "/api/users/me/products",
                                                {productIds: selectedProdIds,categoryId: categoryId},
                                                {headers: {"Content-Type" : "application/json"}}
                                            );

    
            const data = await response.data;
    
            console.log("9999 response from POST req to save Selected products: ", data);
            
            nextRouter.push ("/");

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
    
        async function loadSelection() {
            setLoadingSelection(true);
    
            try {
                const response = await axios.get(
                    `/api/users/me/products?categoryId=${encodeURIComponent(categoryId)}`,
                    {headers: {"Content-Type" : "application/json"}}
                );
                // const response = await fetch(
                //     `/api/users/me/products?categoryId=${encodeURIComponent(categoryId)}`
                // );
    
                const data = await response.data;
    
                setSelectedProdIds(data.selectedProductIds ?? []);
    
            } catch (error) {
                console.log("Loading selection failed:", error.message);
            }
            finally {
                setLoadingSelection(false);
            }
            
        }
    
        loadSelection();

    }, []);

    return (
        <div className="products-selection">
            <div className="products">
                {products.map((product) => (
                    <ProductCard className="product-card"
                        key={product._id}
                        product={product}
                        onSelect={() => handleProductSelected(product.productId)}
                        isSelected={selectedProdIds.includes(product.productId)}
                    />
                ))}
          </div>
          <button className="save-selection-btn" 
                    onClick={handleSaveSelection}
                    disabled={loadingSelection}>
            {loadingSelection ? "Loading selections..." : "Save Selection"}
          </button>
        </div>
    )
}