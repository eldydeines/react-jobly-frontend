// Home component is the splash page for the app. 

import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../UserContext";

function Home() {

    const { isLoggedIn } = useContext(UserContext);

    return (
        <section>
            <h1>Jobly</h1>
            <h2>A site for jobseekers!</h2>
            {isLoggedIn
                ? (<>
                    <button><NavLink exact to="/companies">Companies</NavLink></button>
                    <button><NavLink exact to="/jobs">Jobs</NavLink></button>
                </>)
                : (<>
                    <button><NavLink exact to="/login">Login</NavLink></button>
                    <button><NavLink exact to="/signup">Signup</NavLink></button>
                </>)
            }

        </section >
    );
}

export default Home;