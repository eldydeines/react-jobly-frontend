import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import JobsList from "./routes/JobsList";
import CompaniesList from "./routes/CompaniesList";
import CompanyDetail from "./routes/CompanyDetail";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import { useContext } from "react";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Profile from "./routes/Profile";
import UserContext from "./UserContext";

const Router = ({ loginUser, registerUser, updateUser }) => {

    const { isLoggedIn } = useContext(UserContext);

    return (
        <Switch>

            {isLoggedIn
                ? (<>
                    <Route exact path="/profile">
                        <Profile updateUser={updateUser} />
                    </Route>
                    <Route exact path="/companies">
                        <CompaniesList />
                    </Route>
                    <Route exact path="/companies/:handle">
                        <CompanyDetail />
                    </Route>
                    <Route exact path="/jobs">
                        <JobsList />
                    </Route>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Redirect to="/" />
                </>)
                : (<>
                    <Route exact path="/login">
                        <Login loginUser={loginUser} />
                    </Route>
                    <Route exact path="/signup">
                        <Signup registerUser={registerUser} />
                    </Route>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Redirect to="/" />
                </>)
            }

        </Switch>
    )
}

export default Router;