import React, { useState, useContext } from "react";
import UserContext from "../UserContext";
import { useHistory } from "react-router-dom";
import Alerts from "./Alerts";

const Login = ({ loginUser }) => {

    const INITIAL_STATE = {
        username: '',
        password: ''
    }

    const [formData, setFormData] = useState(INITIAL_STATE);

    const { errors } = useContext(UserContext);
    const history = useHistory();

    const [hasLoginErrors, setHasLoginErrors] = useState(false);

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
            await loginUser({ ...formData });
            history.push("/companies");
        }
        catch (e) {
            setHasLoginErrors(true);
        }
        setFormData(INITIAL_STATE);
    }



    return (
        <div>
            <form onSubmit={handleSubmit}>
                {hasLoginErrors
                    ? <Alerts messages={errors} />
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