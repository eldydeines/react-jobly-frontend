// Home component is the splash page for the app. 

import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../UserContext";
import "../styling/Home.css";

function Home() {

    const { isLoggedIn } = useContext(UserContext);

    return (
        <section className="home">
            <h1>JOBLY</h1>
            <h2>Job App Made for You</h2>
            {isLoggedIn
                ? (<>
                    <button className="home-button"><NavLink exact to="/companies">Companies</NavLink></button>
                    <button className="home-button"><NavLink exact to="/jobs">Jobs</NavLink></button>
                </>)
                : (<>
                    <h2>Please login or sign up to access companies and jobs!</h2>
                    <button className="home-button"><NavLink exact to="/login">Login</NavLink></button>
                    <button className="home-button"><NavLink exact to="/signup">Signup</NavLink></button>
                </>)
            }

        </section >
    );
}

export default Home;