import React, { useContext } from "react";
import "./NavBar.css";
import { NavLink, useHistory } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import UserContext from "./UserContext";

function NavBar({ logOut }) {

    const { isLoggedIn } = useContext(UserContext);
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
                <Nav expand="md">
                    {/* NavBar now includes nav links to Drinks */}
                    <div className="navbar-nav">
                        <NavItem>
                            <NavLink to="/companies">Companies</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/jobs">Jobs</NavLink>
                        </NavItem>
                        {isLoggedIn
                            ? (<>
                                <NavItem>
                                    <NavLink to="/profile">Profile</NavLink><span></span>
                                </NavItem>
                                <NavItem>
                                    <button onClick={handleClick}>Logout</button>
                                </NavItem>
                            </>)
                            : (<><NavItem>
                                <NavLink to="/login">Login</NavLink>
                            </NavItem>
                                <NavItem>
                                    <NavLink to="/signup">Signup</NavLink>
                                </NavItem>
                            </>)
                        }

                    </div>
                </Nav>
            </Navbar>
        </div>
    );
}

export default NavBar;