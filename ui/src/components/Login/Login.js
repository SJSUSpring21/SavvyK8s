import React, { Component } from "react";
import axios from "axios";
import cookie from "react-cookies";
import Header from "./Header/Header";
import splitwisewithoutname from "../../assets/images/kubernetes.svg";
import "./Login.css";
import splitwisewhite from "../../assets/images/splitwisewhite.svg";
import LoginHeader from "./Header/LoginHeader";

import config from '../../config.json';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginUserId: "",
      loginPassword: "",
      loginSuccessful: false,
      custId: "",
      custName: "",
      custPhoneNumber: "",
      countryCode: "",
      imageId: 0,
      token: "",
      image:""
    };
  }
  loginIdChanged = e => {
    const loginEmail = e.target.value;
    this.setState({
      loginUserId: loginEmail
    });
  };
  passwordChanged = e => {
    const loginPasswd = e.target.value;
    this.setState({
      loginPassword: loginPasswd
    });
  };
  checkAuthentication = e => {
    var headers = new Headers();
    e.preventDefault();
    const loginDetails = {
      loginUserId: this.state.loginUserId,
      loginPassword: this.state.loginPassword
    };
    axios.defaults.withCredentials = true;
    console.log(loginDetails);
    console.log(config.backEndURL)
    axios.defaults.withCredentials = true;
    axios
      .post(config.backEndURL + "/users/login", loginDetails)
      .then(response => {
        console.log("Status Code : ", response.status);
        console.log(response);
        // sessionStorage.setItem("custId", response.data.custId);
        //sessionStorage.setItem("custName", response.data.custName);
        if (response.status === 200) {
          console.log(response.data);
          this.setState({
            loginSuccessful: true,
            custId: response.data._id,
            custName: response.data.custName,
            custPhoneNumber: response.data.custPhoneNumber,

            countryCode: response.data.countryCodeId,
            image:response.data.image,

            token: response.data.token
          });


        } else {
          this.setState({
            loginSuccessful: false
          });
        }
      })
      .catch(error => {
        console.log(error.response);
        alert(error.response.data.desc)
        this.setState({
          loginSuccessful: false,
          errorMsg: error.response.data.desc
        });
      });
  };

  render() {

    if (this.state.token.length > 0) {
      sessionStorage.setItem("token", this.state.token);
      console.log("success");
      const phoneNumber = this.state.custPhoneNumber ? this.state.custPhoneNumber : "";
      const custDetails = {
        loginUserId: this.state.loginUserId,
        custId: this.state.custId,
        custName: this.state.custName,
        custPhoneNumber: phoneNumber,
        countryCode: this.state.countryCode,
        image:this.state.image
      };

      sessionStorage.setItem("custDetails", JSON.stringify(custDetails));
      this.props.history.push({
        pathname: "/home",
        custDetails: {
          loginUserId: this.state.loginUserId,
          custId: this.state.custId,
          custName: this.state.custName,
          countryCode: this.state.countryCode,
          image:this.state.image

        }
      });
    }
    //console.log(this.state.loginSuccessful);
    return (
    
      <div className="main-container">
        <LoginHeader />
        <form onSubmit={this.checkAuthentication}>
            <div className="login-container">
              <img
                height="200"
                width="200"
                className="login-img"
                alt="splitwise"
                src={splitwisewithoutname}
              />
              <div className="login-content">
                <h2>WELCOME TO KUBERNETES DASHBOARD</h2>
                <div className="login-email-label">Email address</div>
                <input
                  type="email"
                  name="email"
                  data-testid="email-test"
                  placeholder="Email"
                  onChange={this.loginIdChanged}
                  required
                />
                <div className="login-email-label">Password</div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={this.passwordChanged}
                  required
                />

                <button type="submit">Log in</button>
              </div>
            </div>
        </form>
      </div>
    );
  }
}
export default Login;

