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
        username: username,
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
        console.log(e);
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

      setSession(JoblyApi.token);
      return { message: "success" };
    }
    catch (e) {
      let formErrors = e;
      if (e.message) {
        formErrors = e.message;
      }
      return { message: formErrors };
    }
  }

  const updateUser = async (formData, username) => {
    try {
      await JoblyApi.updateUserProfile({ ...formData }, username);
      setUser(user => ({
        ...user,
        username: username,
        firstName: formData.firstName,
        lastName: formData.lastName,
        isLoggedIn: true
      }));
      return { message: "success" };
    }
    catch (e) {
      let formErrors = e.map(er => er);
      if (e.message) {
        formErrors = e.message.map(er => er);
      }
      return { message: formErrors };
    }
  }

  const loginUser = async (formData) => {
    try {
      await JoblyApi.login(formData);
      setUser(user => ({
        username: formData.username,
        isLoggedIn: true,
        ...user
      }));
      setSession(JoblyApi.token);
      return { message: "success" };
    }
    catch (e) {
      let formErrors = e.map(er => er);
      if (e.message) {
        formErrors = e.message.map(er => er);
      }
      return { message: formErrors };
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
            <Router registerUser={registerUser} loginUser={loginUser} updateUser={updateUser} />
          </main>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
