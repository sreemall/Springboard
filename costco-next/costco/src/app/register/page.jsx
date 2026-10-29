"use client";
import { useState } from "react";
import "@/app/Pages.css";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RegisterUserPage () {

    const [formData, setFormData] = useState ({firstName: "", lastName: "", email: "", password: ""});
    const [errors, setErrors] = useState ({firstName: "", lastName: "", email: ""});
    const nextRouter = useRouter ();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
          });
    }

    const validEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
      };
    
      const validPassword = (password) => {
        const regex = /^[A-Za-z0-9]{8,12}$/;
        return regex.test(password);
      }

      const validText = (text) => {
        const regex = /^[A-Za-z]+$/;
        return regex.test (text);
      }

    const  handleSubmit = async (e) => {
        e.preventDefault ();

        //Validate data
        if ((formData.firstName.length != 0) && !validText(formData.firstName)) {
            setErrors ((prev) => ({...prev, firstName: "Should contain only letters"}));
        }
        else {
            setErrors ((prev) => ({...prev, firstName: ""}));
        }

        if ((formData.lastName.length != 0) && !validText(formData.lastName)) {
            setErrors ((prev) => ({...prev, lastName: "Should contain only letters"}));
        }
        else {
            setErrors ((prev) => ({...prev, lastName: ""}));
        }

        if (!validEmail (formData.email)) {
            setErrors ((prev) => ({...prev, email: "(user@example.com)"}));
        }
        else {
            setErrors ((prev) => ({...prev, email: ""}));
        }

        if(!validPassword (formData.password)) {
            setErrors ((prev) => ({...prev, password: "Invalid Password!"}));
        }
        else {
            setErrors ((prev) => ({...prev, password: ""}));
        }
        
        try {
            const response = await axios.post ("/api/users/register", formData, {headers: {"Content-Type" : "application/json"}});
            console.log ("Response from backend signup=", response.data);
            
            nextRouter.push ("/login");
        }
        catch (error) {
            console.error (error.message);
        }

    }

    return (      
        <div className="container">
            <div className="register-card">
                <h2>User Details</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="firstName">First Name </label>
                        <input
                            id="firstName"
                            type="text"
                            name="firstName"
                            placeholder="Enter First Name"
                            value={FormData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {errors.firstName && (
                            <div className="error">
                                <p> {errors.firstName} </p>
                            </div>
                    )} 
                    
                    <div className="input-group">
                        <label htmlFor="lastName">Last Name </label>
                        <input
                            id="lastName"
                            type="text"
                            name="lastName"
                            placeholder="Enter Last Name"
                            value={FormData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {errors.lastName && (
                            <div className="error">
                                <p> {errors.lastName} </p>
                            </div>
                    )} 
                    
                    <div className="input-group">
                        <label htmlFor="email">Email </label>
                        <input
                            id="email"
                            type="text"
                            name="email"
                            placeholder="Enter Email"
                            value={FormData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {errors.email && (
                            <div className="error">
                                <p> {errors.email} </p>
                            </div>
                    )} 

                    <div className="input-group">
                        <label htmlFor="password">Password </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            value={FormData.password}
                            onChange={handleChange}
                            required
                        />
                        <p style={{color:"blue", fontSize:"12px"}}>8-12 characters, letters & numbers only</p>
                    </div>
                    {errors.password && (
                            <div className="error">
                                <p> {errors.password} </p>
                            </div>
                    )} 

                    <div className="button-group">
                        <button type="submit" className="register-btn">Register</button>
                        <button type="reset" className="reset-btn">Clear</button>
                    </div>
                </form> 
            </div>
        </div>
    )
}