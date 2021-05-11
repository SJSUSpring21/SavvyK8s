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
          <nav id="sidebar" style={{height:'800px'}}>
                 {/* <div class="sidebar-header">
                  <h3>DASHBOARD</h3>
                </div> */}

                <ul class="list-unstyled components">
                    <li>
                      <NavLink to="/" activeClassName="active">
                      <DashboardIcon fontSize="large"/>
                        <label className="ml-4" > Dashboard</label>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/metrics" activeClassName="active">
                        <span><i className="fa fa-bar-chart" style={{fontSize:'20px'}}></i></span>
                        <label className="ml-4" > Node Metrics</label>
                      
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/myapplications" activeClassName="active">
                        <span><i className="fa fa-tasks" style={{fontSize:'20px'}}></i> </span>
                        <label className="ml-4" > My Applications</label>
                      </NavLink>
                    </li>
                    <li>
                        <NavLink to="/myprofile" activeClassName="active">
                          <span><i style={{'font-size': '25px'}} className="fa fa-user"></i></span>
                           <label className="ml-4" > My Profile</label>
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
