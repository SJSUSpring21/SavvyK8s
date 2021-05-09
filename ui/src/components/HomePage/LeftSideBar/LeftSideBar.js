import React, { Component } from "react";
import { Link, NavLink, Route } from "react-router-dom";
import "./LeftSideBar.css";
import DashboardIcon from '@material-ui/icons/Dashboard';


//import { Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'


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
          <nav id="sidebar" style={{height:'1500px'}}>
                 {/* <div class="sidebar-header">
                  <h3>DASHBOARD</h3>
                </div> */}

                <ul class="list-unstyled components">
                    <li>
                      <NavLink to="/dashboard" activeClassName="active">
                      <DashboardIcon fontSize="large"/>
                        <label > Dashboard</label>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/metrics" activeClassName="active">
                        <span></span>
                        <label > Node Metrics</label>
                      
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/myapplications" activeClassName="active">
                        <span></span>
                        <label > My Applications</label>
                      </NavLink>
                    </li>
                    <li>
                        <NavLink to="/myprofile" activeClassName="active">
                          <span></span>
                          <i style={{'font-size': '3rem'}} className="mt-3 fa fa-user fa-fw"></i> <label > My Profile</label>
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
