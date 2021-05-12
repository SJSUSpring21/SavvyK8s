import React, { Component } from "react";
import splitwisewhite from "../../../assets/images/splitwisewhite.svg";
import landing from "../../../assets/images/landing-2.png";
import kube from "../../../assets/images/kube.PNG";
import { Link } from "react-router-dom";
import "./LoginHeader.css";
class LoginHeader extends Component {
  constructor(props) {
    super(props);
  }
  signup = () => {
    this.props.history.push("/signup");
  };
  render() {
    return (
      <div className="header">
        <div className="headerContainer">
          <div className="left-side-header">
            <img
             height="60px"
             width="230px"
              className="login-img"
              alt="landing"
              src={landing}
            />
            {/* <span className="headerName" ><b>&nbsp;&nbsp;Savvy K8s</b>
            </span> */}
          </div>
          <div className="login-header">
            <Link to="/">
            </Link>
            <div className="loginLinks">
              <Link to="/login">
                <button className="login">Log in</button>
              </Link>
              <span style={{ color: "white" }}>or</span>
              <Link to="/Signup">
                <button className="signup">Sign up</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default LoginHeader;
