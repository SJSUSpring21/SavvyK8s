import React, { Component } from "react";
import splitwisewhite from "../../../assets/images/splitwisewhite.svg";
import "./Header.css";
import kube from "../../../assets/images/kube.PNG";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import config from '../../../config.json';
import cookie from "react-cookies";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      custDetails: this.props.custDetails,
      loggedIn: this.props.loggedIn
    };
  }
  logout = () => {
    console.log("inside logout");
    this.props.logOut(!this.state.loggedIn);
  };
  render() {

    return (
      <div className="header">
        <div className="headerContainer">
          <div className="left-side-header">
        <img
          height="60px"
          width="60px"
          className="login-img"
          alt="kube"
          src={kube}
        />
        <span className="headerName" ><b>&nbsp;&nbsp;Savvy K8s</b>
       </span>
       </div>
      <div className="center-area-header">
        <section style={{float:'right'}}>
            <b className="mr-3" style={{ color: 'white' }}><i style={{'font-size': '3rem'}} className="mt-3 fa fa-user fa-fw"></i> {this.state.custDetails.custName}</b>
            <button className=" btn btn-info btn-md mr-3 mb-2 login" onClick={this.logout}>
              Log out
            </button>
        </section>
        </div>
        </div>
      </div>
    );
  }
}

export default Header;
