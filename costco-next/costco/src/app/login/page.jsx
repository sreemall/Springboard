"use client";
import React, { useState } from "react";
import "@/app/Pages.css";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  //const [errors, setErrors] = useState({email: "", password: ""});
  const nextRouter = useRouter();
  console.log ("999 In login Page");

  const handleChange = (e) => {
    // setFormData({
    //   ...formData,
    //   [e.target.name]: e.target.value,
    // });
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    //console.log("handlechange formData=", formData);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log ("handleLogin ", formData);

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
