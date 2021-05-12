import React, { Component } from "react";
import axios from "axios";
import config from '../../config.json';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

class MyApplications extends Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            custDetails: this.props.custDetails,
            appPodDtls: this.props.appPodDtls,
            applications: []
        }
    }

    async componentDidMount() {
        await this.getAllApps()


    }
    getAllApps = () => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
        axios
            .get(
                config.backEndURL + "/users/allAppPodDtls"
            )
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log(response);
                    this.setState({
                        applications: response.data,
                    });

                }
            })
            .catch(error => {
                console.log(error.response);

            });
    }
    appSelected = (e, app) => {

        // const deletedAppIds=[];
        //   const addedAppIds=[];
        const appPodDtls = this.state.appPodDtls;
        const appPodIndex = appPodDtls.findIndex(appPod => appPod.appId === app.appId);
        if (appPodIndex > -1) {
            //      deletedAppIds.push(app.appId);
            console.log(appPodIndex)
            appPodDtls.splice(appPodIndex, 1);

        }
        else if (appPodIndex == -1 && e.target.checked) {
            //      addedAppIds.push(app.appId);
            appPodDtls.push(app)
        }
        this.setState({
            appPodDtls: appPodDtls
        })
        console.log(appPodDtls)
        console.log(app);
        console.log(e.target.checked);

    }
    updateApplications = () => {
        console.log('in update')
        if (this.state.appPodDtls.length > 0) {
            const appIds = this.state.appPodDtls.map(appPod => appPod.appId);
            let custAppReq = {
                appIds: appIds,
                custId: this.state.custDetails.custId,
                custName: this.state.custDetails.custName
            }
            console.log(custAppReq)
            axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
            axios
                .put(
                    config.backEndURL + "/users/custApp", custAppReq
                )
                .then(response => {
                    console.log("Status Code : ", response.status);
                    if (response.status === 200) {
                        console.log(response);

                        alert("Successfully Updated")
                        this.props.history.push("/");

                    }
                })
                .catch(error => {
                    console.log(error.response);

                });
        }
        else
            alert("Please select atleast one application to update")
    }
    render() {
        let appsSelected = null;
        let checkedApps = null;
        let checked = false;
        if (this.state.applications.length > 0) {
            appsSelected = this.state.applications.map(app => {
                checked = false;
                if (this.state.appPodDtls.length > 0) {
                    this.state.appPodDtls.map(regAppPod => {
                        if (regAppPod.appId === app.appId) {
                            checked = true;
                        }
                    })
                }
                if (checked)
                    return (

                        <span>
                        <FormControlLabel
                          control={
                            <Checkbox
                               checked={checked}
                              onChange={(e) => this.appSelected(e, app)}
                              name="checkedB"
                              color="primary"
                              style={{ height: 30, width: 30, color: "royalblue" }}
                            />
                          }
                          // label={app.applicationName}
                          label={
                            <span style={{ fontSize: "3rem" }}>{app.appName}</span>
                          }
                        />
                        {/* <input type="checkbox" style = {{height : 30 , width:30 , color : "royalblue"}} value={app._id} onChange={(e)=>this.appSelected(e,app)} />{app.applicationName}  */}
                        {/* <br /> */}
                      </span>
                    );
                else
                    return (

                        <span>

<FormControlLabel
                          control={
                            <Checkbox
                              //  checked={checked}
                              onChange={(e) => this.appSelected(e, app)}
                              name="uncheckedB"
                              color="primary"
                              style={{ height: 30, width: 30, color: "royalblue" }}
                            />
                          }
                          // label={app.applicationName}
                          label={
                            <span style={{ fontSize: "3rem" }}>{app.appName}</span>
                          }
                        />
                            {/* <input type="checkbox" value={app.appId} onChange={(e) => this.appSelected(e, app)} /> &nbsp;{app.appName}  */}
                            {/* <br /> */}
                        </span>
                    );
            })
        }
        return (
            <div className="padded-section">
                <div className="card-header text-white bg-primary pt-2 pb-2 "><h2>Applications Registered</h2></div>
                <br />
                <div className="row">
                    <div className="col-lg-6" style={{'font-size': '2rem'}}>{appsSelected}</div>
                    <div className="col-lg-6" style={{'font-size': '2rem'}}>{checkedApps}</div>
                </div>
                <br />
                <button className="btn btn-lg saveBtn" onClick={this.updateApplications}>Save</button>
            </div>
        );
    }
}
export default MyApplications;