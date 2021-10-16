import React, { useContext } from "react";
import "./NavBar.css";
import { NavLink, useHistory } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import UserContext from "./UserContext";

function NavBar({ logOut }) {

    const { username, isLoggedIn } = useContext(UserContext);
    const history = useHistory();
    const handleClick = () => {
        logOut();
        history.push("/");
    }

    return (
        <div>
            <Navbar>
                <div className="navbar-brand">
                    <NavLink exact to="/" className="navbar-brand">
                        Jobly
                    </NavLink>
                </div>
                <div className="navbar-nav">
                    <Nav expand="md">
                        {/* NavBar now includes nav links to Drinks */}
                        {isLoggedIn
                            ? (<>
                                <NavItem>
                                    <NavLink to="/companies">Companies</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="/jobs">Jobs</NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink to="/profile">Profile</NavLink><span></span>
                                </NavItem>
                                <div className="navbar-div">
                                    <span className="navbar-span">Logged In: {username}</span>
                                    <NavItem>
                                        <button onClick={handleClick}>Logout</button>
                                    </NavItem>
                                </div>
                            </>)
                            : (<><NavItem>
                                <NavLink to="/login">Login</NavLink>
                            </NavItem>
                                <NavItem>
                                    <NavLink to="/signup">Signup</NavLink>
                                </NavItem>
                            </>)
                        }


                    </Nav>
                </div>
            </Navbar>
        </div>
    );
}

export default NavBar;