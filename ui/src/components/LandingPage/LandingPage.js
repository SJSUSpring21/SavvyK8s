import React, { Component } from "react";
import "./LandingPage.css";
import LoginHeader from "../Login/Header/LoginHeader";
import kubernetes from "../../assets/images/k8s.png";
class LandingPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <LoginHeader />
        <div className="landingContent">
          <h1>Less stress when knowing</h1><h1>metrics</h1><h1 style={{ color: '#336ce4' }}>about your applications</h1>
        </div>
        <div className="content">

          <img
            class="center"
            height="250"
            width="750"
            className="landingImage"
            alt="splitwise"
            src={kubernetes}
          />

        </div>
      </div>
    );
  }
}
export default LandingPage;
