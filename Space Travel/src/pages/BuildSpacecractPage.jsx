import { useContext, useState } from "react";
import SpaceTravelApi from "../services/SpaceTravelApi";
import { useNavigate } from "react-router-dom";
import SpacecraftContext from "../context/spacecraftAPIContext";
import Loading from "../components/Loading";


export default function BuildSpacecraftPage () {
    const INITIAL_STATE = {name: "", capacity: "", description: "", pictureUrl: ""};
    const [formData, setFormData] = useState (INITIAL_STATE);
    const [errors, setErrors] = useState ([]);
    const navigate = useNavigate ();
    const SpacecraftAPI = useContext (SpacecraftContext);

    const handleChange = (event) => {
        const {name, value} = event.target;
    
        setFormData ((formData) => ({...formData, [name]: value}));
    }

    const handleSubmitForm = async (event) => {
        event.preventDefault ();
        setErrors ((prev) => ([]));
        let firstMissingField = null;
        // console.log ("handle submit formData=", formData);

        // if (formData.name === "" || formData.capacity === "" || formData.description === "")
        //     setErrors ((prev) => (["Name is required", "Capacity is required", "Description is required"]))
            // alert ("Name, Capacity, Description are Required");

        if (formData.name === "") {
            setErrors ((prev) => [...prev, "Name is required"]);
            if (!firstMissingField) {
                firstMissingField = "name";
            }
        }
        if (formData.capacity === "") {
            setErrors ((prev) => [...prev, "Capacity is required"]);
            if (!firstMissingField) {
                firstMissingField = "capacity";
            }
            // event.target.elements.capacity.focus();
        }
        if (!Number.isInteger(Number(formData.capacity)) || Number(formData.capacity) <0) {
            setErrors ((prev) => [...prev, "Capacity should be Integer"]);
            if (!firstMissingField) {
                firstMissingField = "capacity";
            }
            // alert ("Capacity should be Integer");
            // event.target.elements.capacity.focus();
        }
        if (formData.description === "") {
            setErrors ((prev) => [...prev, "Description is required"]);
            if (!firstMissingField) {
                firstMissingField = "description";
            }
            // event.target.elements.description.focus();
        }

        if (firstMissingField) {
            event.target.elements[firstMissingField].focus();
        }
        else {
            SpacecraftAPI.buildSpacecraft (formData);
            setFormData(INITIAL_STATE);

            // try {
            //     const response = await SpacecraftAPI.buildSpacecraft (formData);
            //     if (response.isError) {
            //         alert (`Error while building a spacecraft Error: ${response.data}`);
            //     }
            // }
            // catch (error) {
            //     console.error (error);
            //     alert (`Error: ${error}`);
            // }
            // finally {
            //     setFormData(INITIAL_STATE);
            // }
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
            {SpacecraftAPI.loading ? (
                // <p className="loading">Loading ...</p>
                <Loading />
            ) : (
                <div className="bs-build-spacecraft-page">
                    <button className="bs-back-btn" onClick={handleGoBack}>Back</button>
                    <form className="bs-build-spacecraft-form" onSubmit={handleSubmitForm}>
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
                        <button className="bs-build-btn" type="submit">Build</button>
                    </form>
                    <div className="errors">
                        {(errors.length > 0) && 
                            errors.map ((e, index) => <p key={index}>{e}</p>)
                        }
                    </div>     
                </div>
            )}
        </>
    )
}