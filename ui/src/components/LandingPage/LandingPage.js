import React, { Component } from "react";
import "./LandingPage.css";
import LoginHeader from "../Login/Header/LoginHeader";
import kubernetes from "../../assets/images/metrices.png";
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
          <h1>K8s Monitoring</h1>
          <h1> and </h1>
          <h1>Handling Tool</h1>

          <h2> Less stress when knowing metrics about your applications</h2>
        </div>

        <div className="landingContent">

          <img
            height="250"
            width="250"
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
