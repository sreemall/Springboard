"use client";
import React, { useState } from "react";
import "@/app/Pages.css";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  //const [errors, setErrors] = useState({email: "", password: ""});
  const nextRouter = useRouter();

  const handleChange = (e) => {
    // setFormData({
    //   ...formData,
    //   [e.target.name]: e.target.value,
    // });
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log("handlechange formData=", formData);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    //console.log ("handleLogin ", formData);

    // Call API here
    try {
      const response = await axios.post("/api/users/login", formData);
      console.log(
        "9999 Response from backend login=",
        response,
        response.data,
        response.status
      );
      // nextRouter.push ("/");
      window.location.href = "/";
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container">
      <div className="login-card">
        <h2>Sign In</h2>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="user@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          {/* {errors.email && (
                <div className="error">
                    <p> {errors.email} </p>
                </div>
          )}  */}

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              minLength={8}
              maxLength={12}
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <p style={{ color: "blue", fontSize: "12px" }}>
              8-12 characters, letters & numbers only
            </p>
          </div>
          {/* {errors.password && (
                  <div className="error">
                      <p> {errors.password} </p>
                  </div>
          )}  */}

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="footer-text">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}

// import {useState} from "react";
// import "./Pages.css"

// export default function LoginPage () {

//     const INITIAL_STATE = {username:"", password: ""}
//     const [formData, setFormData] = useState (INITIAL_STATE);

//     function handleChange (event) {
//         event.preventDefault ();
//         const { name, value } = event.target;
//         setFormData ((formData) => ({...formData, [name]: value}));
//     }

//     const handleSubmitForm = (event) => {
//         event.preventDefault (event);

//     }
//     return (
//         <>
//             <h2>Login Page</h2>

//             <form  onSubmit={handleSubmitForm}>
//                 <div className="form-row">
//                     <label htmlFor="username">username</label>
//                     <input type="text"
//                         id="username"
//                         name="username"
//                         placeholder="username"
//                         value={formData.username}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div className="form-row">
//                 <label htmlFor="password">password</label>
//                 <input type="password"
//                     id="password"
//                     name="password"
//                     placeholder="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                 />
//                 </div>
//                 <div className="form-row">
//                 <button type="submit">Login</button>
//                 </div>
//             </form>
//         </>
//     )
// }

// app/categories/[id]/page.jsx

// export default async function ProductsPage({ params }) {
//     const { id } = await params;

//     const products = await db.product.findMany({
//         where: {
//             categoryId: id
//         }
//     });

//     return (
//         <ProductSelection products={products} />
//     );
// }

// "use client";

// export default function ProductSelection({ products }) {
//     const [selectedProdIds, setSelectedProdIds] = useState([]);

//     // selection logic...
// }

// This gives you a very clean division:

//                  SERVER
//                    │
//        ┌───────────┴───────────┐
//        │                       │
//    Categories               Products
//        │                       │
//        └───────────┬───────────┘
//                    ↓
//                  CLIENT
//                    │
//             Selection state
//                    │
//           Select / Unselect

// export default async function ProductsByCategory({ params }) {
//     const { id } = await params;

//     const products = await fetchProductsByCategory(id);

//     return (
//         <ProductsSelection
//             products={products}
//             categoryId={id}
//         />
//     );
// }

// "use client";

// import { useState } from "react";
// import ProductCard from "@/components/ProductCard";

// export default function ProductsSelection({ products }) {
//     const [selectedProdIds, setSelectedProdIds] = useState([]);

//     const handleProductSelected = (event, prodId) => {
//         setSelectedProdIds((prev) =>
//             prev.includes(prodId)
//                 ? prev.filter((id) => id !== prodId)
//                 : [...prev, prodId]
//         );
//     };

//     return (
//         <div className="container">
//             <h2>Choose Products to Watch</h2>

//             <div className="products">
//                 {products.map((product) => (
//                     <ProductCard
//                         key={product.id}
//                         product={product}
//                         onSelect={handleProductSelected}
//                         isSelected={selectedProdIds.includes(product.id)}
//                     />
//                 ))}
//             </div>

//             <button className="done-btn">
//                 Done Selection
//             </button>
//         </div>
//     );
// }

// Server Component
//       │
//       ├── await params
//       ├── fetch products
//       │
//       ↓
// Client Component
//       │
//       ├── useState()
//       ├── handle selection
//       └── render ProductCard
