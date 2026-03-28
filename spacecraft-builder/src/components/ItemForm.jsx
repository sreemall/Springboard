import { useState, useEffect } from "react";
import "./SpacecraftBuilder.css";


export default function ItemForm ({addToInventory}) {
    const INITIAL_STATE = {id:"", name: "", qty: "", purpose: "", agree: false}
    const [formData, setFormData] = useState (INITIAL_STATE);

    function handleChange (event) {
        // event.preventDefault ();
        const { name, type, checked, value } = event.target;
        setFormData ((formData) => ({...formData, [name]: type === "checkbox" ? checked : value}));
        
        // console.log ("handlechange formData =", formData)
    }

    function handleSubmitForm (event) {
        event.preventDefault ();
        // console.log ("handle Add Item ....event.target.elements", event.target.elements)
        //all fields are required
        if (formData.name === "" || formData.qty === "" || formData.purpose === "") {
            // console.log (event);
            alert ("All Fields are Required!!");
            if (formData.name === "")
                event.target.elements.name.focus();
            else if (formData.qty === "")
                event.target.elements.qty.focus();
            else if (formData.purpose === "")
                event.target.elements.purpose.focus();
        }
        else if (!Number.isInteger(Number(formData.qty)) || Number(formData.qty) <= 0) {
            alert ("Quantity should be integer and > 0");
            event.target.elements.qty.focus ();
        }
        else {
            addToInventory (formData);
            setFormData (INITIAL_STATE);
        }
    }

    // useEffect(() => {
    //     console.log("Updated formData =", formData);
    //   }, [formData]);

    return (
        <>
            <form className="item-form" onSubmit={handleSubmitForm}>
                <label htmlFor="name"></label>
                <input type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <label htmlFor="qty"></label>
                <input type="text"
                    id="qty"
                    name="qty"
                    placeholder="Quantity"
                    value={formData.qty}
                    onChange={handleChange}
                />
                <label htmlFor="purpose"></label>
                <textarea
                    id="purpose"
                    name="purpose"
                    placeholder="Purpose"
                    // cols="50"
                    // rows="10"
                    value={formData.purpose}
                    onChange={handleChange}
                />
                <div className="checkbox-grp">
                    <input type="checkbox"
                        id="agree"
                        name="agree"
                        checked={formData.agree}
                        onChange={handleChange}
                    />
                    <label htmlFor="agree">Agree to Terms</label>
                </div>
                <button className="add-btn" type="submit">Add</button>
            </form>
            
        </>
    )
}