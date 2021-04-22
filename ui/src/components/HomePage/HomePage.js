import React, { Component } from "react";
import Header from "./Header/Header";
import "./HomePage.css";
import { Link, Route } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import LeftSideBar from "./LeftSideBar/LeftSideBar";

import { Switch } from "@material-ui/core";
import { Redirect } from "react-router";
import cookie from "react-cookies";
import { connect } from "react-redux";

import { reset, updateCustDetails, updateUserGrpList, saveProfDtls } from "../../redux/actions/index";
import { BrowserRouter, HashRouter } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";

import MyProfile from "../MyProfile/MyProfile";
import Metrics from "../Metrics/Metrics";
import config from '../../config.json';
class HomePage extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      loggedIn: true,
      //custDetails: this.props.location.custDetails,
      custDetails: {},

      // custDetails: {
      //   loggedInUserId: this.props.location.loginUserId,
      //   custId: this.props.custId,
      //   custName: this.props.custName
      // }
    };
  }
  logOut = loggedin => {
    console.log("logged in", loggedin);
    console.log(this.state.loggedIn);
    this.setState({
      loggedIn: loggedin
    });

  };
  componentWillMount() {
    console.log('will mount')
    const custDetails = JSON.parse(sessionStorage.getItem("custDetails"));
    this.setState({
      custDetails: custDetails
    });
    if (sessionStorage.getItem("userGroupDetailsList") !== null) {
      const userGroupDetailsList = JSON.parse(sessionStorage.getItem("userGroupDetailsList"));
      this.setState({
        userGroupDetailsList: userGroupDetailsList
      })
    }

  }

  componentDidMount() {

    const custDetails = JSON.parse(sessionStorage.getItem("custDetails"));
    if (custDetails != null)
      this.setState({
        custDetails: custDetails
      })

  }

  componentDidUpdate(prevProps, prevState) {
  }

  changedCustDetails = (newDetails) => {
    console.log('changed cust details', newDetails)
    const custDetails = this.state.custDetails;
    console.log(newDetails.updatedCustdetails.currencyId)
    custDetails.currencyId = newDetails.updatedCustdetails.currencyId;
    custDetails.timezoneId = newDetails.updatedCustdetails.timezoneId
    custDetails.phnNumber = newDetails.updatedCustdetails.custPhnNmbr;
    custDetails.languageId = newDetails.updatedCustdetails.languageId;
    custDetails.imageId = newDetails.updatedCustdetails.imageId;
    this.setState({
      custDetails: custDetails
    })
    console.log('final custdetails:', custDetails)
    sessionStorage.setItem("custDetails", JSON.stringify(custDetails));
  }

  fetchedProfDtls = (updatedProfDtls) => {
    console.log('updatedProfDtls', updatedProfDtls);
    const profDtls = updatedProfDtls.profDtls;
    this.props.saveProfDtls({ profDtls })
    this.setState({
      profDtls: profDtls
    })

  }
  render() {
    let header = null;
    if (!this.state.loggedIn) {
      console.log("redirect");
      cookie.remove("cookie");
      sessionStorage.clear();
      return <Redirect to="/" />;
    } else
      return (
        <HashRouter>
          <div>
            <Header custDetails={this.state.custDetails} loggedIn={this.state.loggedIn} logOut={this.logOut} />;
            <div className="grid-container">
              <div className="left-side">
                <LeftSideBar
                  custDetails={this.state.custDetails}
                />
              </div>

              <div className="center-area">
                <Route path="/"
                  render={props => (
                    <Dashboard {...props} custDetails={this.state.custDetails}

                    />)}

                  exact />
                <Route
                  path="/metrics"
                  render={props => (
                    <Metrics
                    />
                  )}
                  exact
                />
                <Route
                  path="/myprofile"
                  render={props => (
                    <MyProfile
                      {...props}
                      custDetails={this.state.custDetails}
                      custDetailsUpdated={this.changedCustDetails}

                    />
                  )}
                  exact
                />

              </div>

            </div>
          </div>
        </HashRouter>
      );
  }
}

const mapStateToProps = state => {
  console.log('state', state)
  return {
    custDetails: state.custDetails,
    userGroupDetailsList: state.userGroupDetailsList,
    profDtls: state.profileDtls
  };
};

function mapDispatchToProps(dispatch) {
  console.log('in dispatch')
  return ({
    reset: () => dispatch(reset()),

    updateCustDetails: (custDetails) => dispatch(updateCustDetails(custDetails)),
    updateUserGroupDetailsList: userGroupDetailsList => dispatch(updateUserGrpList(userGroupDetailsList)),
    saveProfDtls: profDtls => dispatch(saveProfDtls(profDtls))

  });
}
const HomePageR = connect(mapStateToProps, mapDispatchToProps)(HomePage);
export default HomePageR;
// export default resetstate;
