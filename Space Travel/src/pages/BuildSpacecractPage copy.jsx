import { useState } from "react";
import SpaceTravelApi from "../services/SpaceTravelApi";
import { useNavigate } from "react-router-dom";


export default function BuildSpacecraftPage () {
    const INITIAL_STATE = {name: "", capacity: "", description: "", pictureUrl: ""};
    const [formData, setFormData] = useState (INITIAL_STATE);
    const navigate = useNavigate ();

    const handleChange = (event) => {
        const {name, value} = event.target;
        // if (name !== "pictureUrl" && value === "") {
        //     alert (`${name} is Required`);
        //     event.target.elements[name].focus();
        // }
        // if ((name === "capacity") && (!Number.isInteger (value) || Number(value) <0)) {
        //     alert ("Capacity should be Integer");
        //     event.target.elements.capacity.focus();
        // } 
        setFormData ((formData) => ({...formData, [name]: value}));
    }

    const handleSubmitForm = async (event) => {
        event.preventDefault ();

        console.log ("handle submit formData=", formData);
        let missingFields = [];
        if (formData.name === "" || formData.capacity === "" || formData.description === "")
            alert ("Name, Capacity, Description are Required");

        if (formData.name === "") {
            event.target.elements.name.focus();
        }
        else if (formData.capacity === "") {
            event.target.elements.capacity.focus();
        }
        else if (formData.description === "") {
            event.target.elements.description.focus();
        }
        else if (!Number.isInteger(Number(formData.capacity)) || Number(formData.capacity) <0) {
            alert ("Capacity should be Integer");
            event.target.elements.capacity.focus();
        }
        else {
            try {
                const response = await SpaceTravelApi.buildSpacecraft (formData);
                if (response.isError) {
                    alert (`Error while building a spacecraft Error: ${response.data}`);
                }
            }
            catch (error) {
                console.error (error);
                alert (`Error: ${error}`);
            }
            finally {
                setFormData(INITIAL_STATE);
            }
        }
    }

    const handleGoBack = (event) => {
        if (window.history.length > 1)
            navigate (-1);
        else
            navigate ("/");
    }

    return (
        <>
            <button className="back-btn" onClick={handleGoBack}>Back</button>
            <form className="add-spacecraft-form" onSubmit={handleSubmitForm}>
                <label htmlFor="name"></label>
                <input type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                />
                <label htmlFor="capacity"></label>
                <input type="text"
                        id="capacity"
                        name="capacity"
                        placeholder="Capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                />
                <label htmlFor="description"></label>
                <textarea rows="4" cols="50"
                        id="description"
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                />
                <label htmlFor="pictureUrl"></label>
                <input type="url"
                        id="pictureUrl"
                        name="pictureUrl"
                        placeholder="Picture URL"
                        value={formData.pictureUrl}
                        onChange={handleChange}
                />
                <button className="build-btn" type="submit">Build</button>
            </form>
            
            
        </>
    )
}