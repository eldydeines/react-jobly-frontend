import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import NavBar from './NavBar';
import Router from './Router';
import UserContext from './UserContext';
import JoblyApi from './routes/api';
import useLocalStorage from './helpers/useLocalStorage';
import jwt from "jsonwebtoken";

function App() {

  const INITIAL_STATE = {
    username: '',
    firstName: '',
    lastName: '',
    errors: '',
    jobs: [],
    isLoggedIn: false
  }
  const [user, setUser] = useState(INITIAL_STATE);
  const [session, setSession] = useLocalStorage("token");


  //on load - if token exists in local storage, persist on site.
  useEffect(() => {
    async function getData(username) {
      let data = await JoblyApi.getUserProfile(username);
      setUser(user => ({
        isLoggedIn: true,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        jobs: data.applications
      }));
    }

    if (session) {
      let user = jwt.decode(session);
      JoblyApi.token = session;
      try {
        getData(user.username);
      }
      catch (e) {
        let errors = e;
        if (e.message) {
          errors = e.message;
        }
        setUser({ errors: errors });
      }
    }

  }, [setUser, session]);

  const registerUser = async (formData) => {

    try {
      await JoblyApi.register(formData);
      setUser(user => ({
        ...user,
        username: formData.username,
        firstName: formData.firstName,
        lastName: formData.lastName,
        isLoggedIn: true
      }));
      console.log("us", user.isLoggedIn);
      setSession(JoblyApi.token);
    }
    catch (e) {
      let formErrors = e;
      if (e.message) {
        formErrors = e.message;
      }
      setUser({ ...user, errors: formErrors });
      console.log("inhere");
    }
  }

  const loginUser = async (formData) => {
    try {
      await JoblyApi.login(formData);
      setUser({
        username: formData.username,
        isLoggedIn: true,
      });
      setSession(JoblyApi.token);
    }
    catch (e) {
      let formErrors = e;
      if (e.message) {
        formErrors = e.message;
      }
      setUser({ errors: formErrors });
    }
  }

  const logOut = () => {
    setUser(INITIAL_STATE);
    setSession(null);
  }

  return (
    <div className="App">
      <UserContext.Provider value={user}>
        <BrowserRouter>
          <NavBar logOut={logOut} />
          <main>
            <Router registerUser={registerUser} loginUser={loginUser} />
          </main>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
