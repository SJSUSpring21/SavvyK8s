import React, { Component } from "react";
import { Link, NavLink ,Route} from "react-router-dom";
import "./LeftSideBar.css";

class LeftSideBar extends Component {
  constructor(props) {
    super(props);
console.log(this.props);
    this.state = {
     
      custDetails: this.props.custDetails,
     
    };
    
  }

  componentDidUpdate(prevProps){
   
  }
  componentDidMount() {
    
  }
  
 
  render() {
    return (
      <div className="left-side-bar">
        <div className="flex-container">
          <div className="flex-item">
            <NavLink to="/" activeClassName="active">
              <span className="dashboardSelected">
              </span>
              Dashboard
            </NavLink>
          </div>
          <div className="flex-item">
            <NavLink to="/metrics" activeClassName="active">
              <span></span>
              <label style={{ color: "#FF652F" }}> Node Metrics</label>
            </NavLink>
          </div>
          <div className="flex-item">
            <NavLink to="/myapplications" activeClassName="active">
              <span></span>
              <label style={{ color: "#999" }}> My Applications</label>
            </NavLink>
          </div>

          <div className="flex-item">
            <NavLink to="/myprofile" activeClassName="active">
              <span></span>
              <label style={{ color: "#999" }}> My Profile</label>
            </NavLink>
          </div>
          
          
        </div>
        
      </div>
    );
  }
}
export default LeftSideBar;
