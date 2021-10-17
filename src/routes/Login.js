import React, { useState, useContext } from "react";
import UserContext from "../UserContext";
import { useHistory } from "react-router-dom";
import Alerts from "./Alerts";
import "../styling/Login.css";

const Login = ({ loginUser }) => {

    const INITIAL_STATE = {
        username: '',
        password: ''
    }

    const [formData, setFormData] = useState(INITIAL_STATE);

    const { user } = useContext(UserContext);
    const history = useHistory();

    const [hasLoginErrors, setHasLoginErrors] = useState(false);
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
        let response = await loginUser({ ...formData });
        if (response.message === "success") {
            history.push("/companies");
        }
        else {
            setHasLoginErrors(true);
            setFormErrors(["Incorrect Username or Password"]);
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