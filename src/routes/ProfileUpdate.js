import React, { useState } from "react";
import JoblyApi from '../routes/api';
import Alerts from "./Alerts";
import useToggle from "../helpers/useToggle";

const ProfileUpdate = ({ username, email, firstName, lastName, setIsUpdate, setProfile }) => {

    const INITIAL_STATE = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: ""
    }

    const [formData, setFormData] = useState(INITIAL_STATE);
    const [hasErrors, setHasErrors] = useToggle(false);
    const [errors, setErrors] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            let data = await JoblyApi.updateUserProfile({ ...formData }, username);
            setFormData(INITIAL_STATE);
            setIsUpdate();
            setProfile(data);
        }
        catch (e) {
            if (e.message) {
                let formErrors = e.message;
                setErrors(formErrors);
            }
            else {
                setErrors(e);
            }
            setHasErrors();
        }

    };

    return (
        <div>
            <h1>Update Profile for {username} </h1>
            <form onSubmit={handleSubmit}>
                {hasErrors
                    ? <Alerts messages={errors} />
                    : null
                }
                <label htmlFor="password">Password </label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <label htmlFor="firstName">First Name </label>
                <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                />
                <label htmlFor="lastName">Last Name </label>
                <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                />
                <label htmlFor="email">Email </label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <button type="submit" onSubmit={handleSubmit} >Update</button>
            </form>
        </div>
    )
}

export default ProfileUpdate;