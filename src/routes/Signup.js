import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../UserContext";
import Alerts from "./Alerts";
import "../styling/Signup.css";

const Signup = ({ registerUser }) => {

    const { isLoggedIn } = useContext(UserContext);
    const history = useHistory();

    const INITIAL_STATE = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: ''
    }

    const [formData, setFormData] = useState(INITIAL_STATE);
    const [hasErrors, setHasErrors] = useState(false);
    const [formErrors, setFormErrors] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        let response = await registerUser({ ...formData });
        if (response.message === "success") {
            history.push("/companies");
        }
        else {
            setHasErrors(true);
            let newErrors = response.message;
            setFormErrors(newErrors.map(n => n));
        }
        setFormData(INITIAL_STATE);
    }


    return (
        <div className="signup-div">
            <h2>Sign Up</h2>
            <form className="signup-form" onSubmit={handleSubmit}>
                {hasErrors
                    ? (<div>We have a problem Houston!
                        <ul>
                            {formErrors.map(m => <li>{m}</li>)}
                        </ul>
                    </div>)
                    : null
                }
                <label htmlFor="username">Username </label>
                <input
                    id="username"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
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
                <button type="submit" onSubmit={handleSubmit}>Signup</button>
            </form>

        </div >
    )

}

export default Signup;