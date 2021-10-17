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
                    <NavLink exact to="/companies"><button className="home-button">Companies</button></NavLink>
                    <NavLink exact to="/jobs"><button className="home-button">Jobs</button></NavLink>
                </>)
                : (<>
                    <h2>Please login or sign up to access companies and jobs!</h2>
                    <NavLink exact to="/login"><button className="home-button">Login</button></NavLink>
                    <NavLink exact to="/signup"><button className="home-button">Signup</button></NavLink>
                </>)
            }

        </section >
    );
}

export default Home;