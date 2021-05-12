import cookie from "react-cookies";
import React, { Component } from "react";
import splitwisewithoutname from "../../assets/images/kubernetes.svg";
import "./Signup.css";
import axios from "axios";
import LoginHeader from "../Login/Header/LoginHeader";
import config from '../../config.json';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      custName: "",
      custEmail: "",
      custPasswd: "",
      custId: 0,
      custPhoneNumber:"",
      countryCode:0,
      signUpDone: false,
      token:"",
      image:""
    };
  }
  custNameChanged = e => {
    const name = e.target.value;
    this.setState({
      custName: name
    });
  };
  custEmailChanged = e => {
    const email = e.target.value;
    this.setState({
      custEmail: email
    });
  };
  custPasswordChanged = e => {
    const passwd = e.target.value;
    this.setState({
      custPasswd: passwd
    });
  };
  custPhnNumberChanged=e=>{
    const phnNumber=e.target.value;
    this.setState({
      custPhoneNumber: phnNumber
    });
  }
countryCodeChanged  =e=>{
    const countryCode=Number(e.target.value);
    this.setState({
      countryCode: countryCode
    });
  }
  signUp = e => {
    var headers = new Headers();
    e.preventDefault();
    const signupDetails = {
      custName: this.state.custName,
      custEmail: this.state.custEmail,
      custPassword: this.state.custPasswd,
      custPhoneNumber:this.state.custPhoneNumber,
      countryCode:this.state.countryCode
    };
    axios.defaults.withCredentials = true;
    axios
      .post(config.backEndURL+"/users/signup", signupDetails)
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 201) {
          console.log(response);
          const custDetails={
             custId: response.data._id,
            custName: response.data.custName,
            custEmail:response.data.custEmail,
            loginUserId:response.data.custEmail,
            custPhoneNumber:response.data.custPhoneNumber,
            countryCode:response.data.countryCodeId,
            image:"",
          
           
           token:response.data.token
          }
          sessionStorage.setItem("custDetails", JSON.stringify(custDetails));
          this.setState({
            signUpDone: true,
            custId: response.data._id,
            token:response.data.token
          });
        } else {
          this.setState({
            signUpDone: false
          });
        }
      })
      .catch(error => {
        console.log(error.response);
        alert(error.response.data.desc)
        this.setState({
          signUpDone: false,
          errorMsg: error.response.data.errorDesc
        });
      });
  };

  render() {
   if (this.state.token.length>0) {
      sessionStorage.setItem("token",this.state.token);
      const custDetails = {
        custId: this.state.custId,
        custName: this.state.custName,
        custEmail:this.state.custEmail,
        loginUserId:this.state.custEmail,
        custPhoneNumber:this.state.custPhoneNumber,
        countryCode:this.state.countryCode,
        image:this.state.image
      };
      this.props.history.push("/appRegistration", {
        custDetails:  custDetails
      });
    }
    let emailAndPasswd = null;
    if (this.state.custName.length > 0) {
      emailAndPasswd = (
        <div className="signup-email-passwd">
          Here's my <strong>email address</strong>
          <input
            type="email"
            name="custEmail"
            placeholder="Email"
            className="signup-email"
            onChange={this.custEmailChanged}
          ></input>
          Here's my <strong>password</strong>
          <input
            type="password"
            name="custPasswd"
            placeholder="Password"
            onChange={this.custPasswordChanged}
          ></input>
          Here's my <strong>Country Code</strong>
          <select name="countryCodes" value={this.state.countryCode} onChange={this.countryCodeChanged}>
          <option value="0">Select Country Code </option>
            <option value="1">United States(+1)</option>
            <option value="2">India(+91)</option>
          </select>
          <br/>
          Here's my <strong>Phone Number</strong>
      
           <input
            type="text"
            name="custPhoneNumber"
            placeholder="Phone Number"
            onChange={this.custPhnNumberChanged}
          ></input>

          <button className="signup-btn" type="submit">
            Sign me up
          </button>
        </div>
      );
    }
    return (
        
          <div className="main-container">
            <LoginHeader />
            <form onSubmit={this.signUp}>
              <div className="signup-container">
                <img
                  height="200"
                  width="200"
                  className="signup-img"
                  alt="splitwise"
                  src={splitwisewithoutname}
                />
                <div className="signup-content">
                  <h2>Introduce Yourself</h2>
                  <div className="signup-name-label">Hi there! My name is</div>

                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={this.custNameChanged}
                  />
                  {emailAndPasswd}
                </div>
              </div>
            </form>
          </div>
    );
  }
}

export default Signup;
