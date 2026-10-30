"use client";

export default function ProductCard ({product, onSelect, isSelected}) {
    //console.log ("9999 ProductCard product: ", product, isSelected);
    
    return (
        <div className="product-card">
            <img className="product-image" src={product.imageUrl} alt={product.name} />
            <div className="product-title">
                <p>Name: {product.name}</p>
            </div>
            <div className="product-title">
                <p>Product Id: {product.productId}</p>
            </div>
            <div className="product-title">
                <p>Price: {product.price}</p>
            </div>
            <div className="product-title">
                <p style={{
                        backgroundColor: product.onSale ? "blue" : "transparent",
                        color: product.onSale ? "white" : "inherit",
                        padding: "5px",
                        borderRadius: "4px",
                    }}
                >
                    Discount: {product.discount}
                </p>
            </div>
            <button className={`select-btn ${isSelected ? "selected-btn" : ""}`}
                        onClick={onSelect}>
                {isSelected ? "UnSelect" : "Select"}
            </button>
            
        </div> 
    )
}