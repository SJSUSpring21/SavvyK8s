import React, { Component } from "react";
import { Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import HomePage from "./components/HomePage/HomePage";
import AppRegistration from "./components/AppRegistration/AppRegistration";



class Main extends Component {
  render() {
    return (
      <div>
        {/*Render Different Component based on Route*/}
        <Route path="/" component={LandingPage} exact />
        <Route path="/Signup" component={Signup} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/appRegistration" component={AppRegistration} exact />
        <Route path="/home" component={HomePage} exact />

      </div>
    );
  }
}
export default Main;
