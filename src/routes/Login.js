//Login form that is provided to user to add their username and password.
//This child component will send data to parent to check if they can be logged in or not.
//If unsuccessful, they will be told there is a problem.

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../styling/Login.css";

const Login = ({ loginUser }) => {

    const INITIAL_STATE = {
        username: '',
        password: ''
    }

    const [formData, setFormData] = useState(INITIAL_STATE);
    const history = useHistory();
    const [hasLoginErrors, setHasLoginErrors] = useState(false);

    //This handles the inputs as they are entered in by the user and saves to state. 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    };

    //This handles the submission by the user and will either be successful or not. 
    const handleSubmit = async (e) => {

        e.preventDefault();
        let response = await loginUser({ ...formData });
        if (response.message === "success") {
            history.push("/companies");
        }
        else {
            setHasLoginErrors(true);
        }
        setFormData(INITIAL_STATE);
    }

    return (
        <div className="login-div">
            <h2>User Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                {hasLoginErrors
                    ? <h3>Oh, oh! <br></br>Incorrect username or password.</h3>
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
                <button onSubmit={handleSubmit}>Login</button>
            </form>

        </div>
    )
}

export default Login;