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

import { BrowserRouter, HashRouter } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";

import MyProfile from "../MyProfile/MyProfile";
import Metrics from "../Metrics/Metrics";
import config from '../../config.json';
import MyApplications from "../MyApplications/MyApplications";
class HomePage extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      loggedIn: true,
      custDetails: this.props.location.custDetails,
      appPodDtls: [],
      appPodDtlsLoaded: false

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



  }

  async componentDidMount() {

    const custDetails = JSON.parse(sessionStorage.getItem("custDetails"));
    if (custDetails != null)
      this.setState({
        custDetails: custDetails
      })
    const appPodDtls = await this.getAppPodDtls(custDetails.custId);
    console.log('appPodDtls', appPodDtls)
    this.setState({
      appPodDtls: appPodDtls,
      appPodDtlsLoaded: true
    });

  }


  componentDidUpdate(prevProps, prevState) {
    console.log('component updated')
  }

  changedCustDetails = (newDetails) => {
    console.log('changed cust details', newDetails)
    const custDetails = this.state.custDetails;
    console.log(newDetails.updatedCustdetails.currencyId)
    custDetails.custPhoneNumber = newDetails.updatedCustdetails.custPhoneNumber;
    custDetails.countryCode = newDetails.updatedCustdetails.countryCode;
    custDetails.custName=newDetails.updatedCustdetails.custName;
    custDetails.image=newDetails.updatedCustdetails.image;
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
  getAppPodDtls = () => {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');

      axios
        .get(
          config.backEndURL + "/users/custAppDtls/" +
          this.state.custDetails.custId
        )
        .then(response => {
          console.log("Status Code : ", response.status);
          if (response.status === 200) {
            console.log(response);
            //if(response.data.length>0){


            sessionStorage.setItem("appPodDtls", JSON.stringify(response.data));
            return resolve(response.data);

          }
        })
        .catch(error => {
          console.log(error.response);

        });
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
            <Header custDetails={this.state.custDetails} loggedIn={this.state.loggedIn} logOut={this.logOut} />
            <div className="grid-container">
              <div className="left-side">
                <LeftSideBar
                  custDetails={this.state.custDetails}
                />
              </div>

              <div className="center-area">
                <Route path="/"
                  render={props => (this.state.appPodDtlsLoaded &&
                    <Dashboard {...props}
                      custDetails={this.state.custDetails}
                      appPodDtls={this.state.appPodDtls}
                    />)}

                  exact />
                <Route
                  path="/metrics"
                  render={props => (
                    <Metrics/>
                  )}
                  exact
                />
                <Route
                  path="/myapplications"
                  render={props => (
                    <MyApplications
                      {...props}
                      custDetails={this.state.custDetails}
                      appPodDtls={this.state.appPodDtls}

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




export default HomePage;
