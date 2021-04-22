import React, { Component } from "react";
import "./LandingPage.css";
import LoginHeader from "../Login/Header/LoginHeader";
import splitwisewithoutname from "../../assets/images/splitwiselanding.jpg";
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
     <h1>Less Stress When knowing</h1><h1>Metrics</h1><h1 style={{color:'#1CC29F'}}>about your applications</h1>
     </div>
     <div className="content">

 <img
              height="450"
              width="450"
              className="landingImage"
              alt="splitwise"
              src={splitwisewithoutname}
            />
               
     </div>
   </div>   
      );
  }
}
export default LandingPage;
