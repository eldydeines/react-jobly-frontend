import React from "react";
import { Route, Switch } from "react-router-dom";
import JobsList from "./routes/JobsList";
import CompaniesList from "./routes/CompaniesList";
import CompanyDetail from "./routes/CompanyDetail";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Profile from "./routes/Profile";

const Router = ({ loginUser, registerUser }) => {
    return (
        <Switch>
            {/* Added route drink menu */}
            <Route exact path="/companies">
                <CompaniesList />
            </Route>
            {/* Added route drink items */}
            <Route exact path="/companies/:handle">
                <CompanyDetail />
            </Route>
            <Route exact path="/jobs">
                <JobsList />
            </Route>
            <Route exact path="/login">
                <Login loginUser={loginUser} />
            </Route>
            <Route exact path="/signup">
                <Signup registerUser={registerUser} />
            </Route>
            <Route exact path="/profile">
                <Profile />
            </Route>
            <Route exact path="/">
                <Home />
            </Route>
            {/* This handles paths that don't exist. */}
            <Route>
                <NotFound />
            </Route>

        </Switch>
    )
}

export default Router;