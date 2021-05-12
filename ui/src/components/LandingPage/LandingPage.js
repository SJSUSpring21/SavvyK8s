import React, { Component } from "react";
import "./LandingPage.css";
import LoginHeader from "../Login/Header/LoginHeader";
import kubernetes from "../../assets/images/metrices.png";
import landing from "../../assets/images/landing-1.png";
class LandingPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <div className="landing">
        <LoginHeader />
      
        {/* <div className="landingContent">
          {/* <h1>K8s Monitoring</h1>
          <h1> and </h1>
          <h1>Handling Tool</h1> 

        
        </div> */}

        <div className="landingContent">
          {/* <img
            height="750"
            width="750"
            className="landingImage"
            alt="splitwise"
            src={landing}
          /> */}

        </div>
        <div className="afterHeader">
        
        </div>
      </div>
    );
  }
}
export default LandingPage;
