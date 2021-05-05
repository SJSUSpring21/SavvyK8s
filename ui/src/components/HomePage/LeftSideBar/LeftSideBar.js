import React, { Component } from "react";
import { Link, NavLink, Route } from "react-router-dom";
import "./LeftSideBar.css";


import { Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'


class LeftSideBar extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {

      custDetails: this.props.custDetails,

    };

  }

  componentDidUpdate(prevProps) {

  }
  componentDidMount() {

  }


  render() {
    return (

      <div className="left-side-bar">
        <div className="flex-container">
          <nav id="sidebar">
                 <div class="sidebar-header">
                  <h3>KUBERNETES</h3>
                </div>

                <ul class="list-unstyled components">
                    <li>
                      <NavLink to="/" activeClassName="active">
                        <span className="dashboardSelected">
                        </span>
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/metrics" activeClassName="active">
                        <span></span>
                        <label style={{ color: "#FF652F" }}> Node Metrics</label>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/myapplications" activeClassName="active">
                        <span></span>
                        <label style={{ color: "#999" }}> My Applications</label>
                      </NavLink>
                    </li>
                    <li>
                        <NavLink to="/myprofile" activeClassName="active">
                          <span></span>
                          <label style={{ color: "#999" }}> My Profile</label>
                        </NavLink>
                    </li>
                </ul>
            </nav>
          </div>
        </div>
    );
  }
}
export default LeftSideBar;