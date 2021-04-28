import React, { Component } from "react";
import DashboardHeader from "./DashboardHeader/DashboardHeader";
import axios from "axios";
import config from '../../config.json';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


class Dashboard extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      custDetails: this.props.custDetails,
      appPodDtls: this.props.appPodDtls,
      selectedAppId: 0,
      selectedPodId: 0,
      metricData: [],
      metricDataFlag: false

    };
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
    if (prevProps.custDetails !== this.props.custDetails) {
      const changedCustDetails = this.props.custDetails;
      this.setState({
        custDetails: changedCustDetails
      })
    }
  }

  fetchDashboardDtls = () => {
  }
  appSelected = (e) => {

    const appId = Number(e.target.value);
    this.setState({
      selectedAppId: appId,
      selectedPodId: 0
    })
  }
  podSelected = (e) => {
    const podId = Number(e.target.value);
    console.log('podId:', podId)
    this.setState({
      selectedPodId: podId
    })
    console.log('asdf')
    this.fetchMetrics(podId);
    //fetch app pod real time data
  }
  fetchMetrics = (podId) => {
    console.log('metrics:')
    console.log('app id:', this.state.selectedAppId);
    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
    let metricsReq = {
      appId: this.state.selectedAppId,
      custId: this.state.custDetails.custId,
      nodeMetrics: false,
      podId: podId
    };


    axios
      .post(
        config.backEndURL + "/users/metrics", metricsReq
      )
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log(response);
          this.setState({
            metricData: response.data,
            metricDataFlag: true
          })

        }
      })
      .catch(error => {
        console.log(error.response);

      });
    //  }
    //  else{
    //      alert("Please select atleast one application");
    //  }
  }
  render() {
    let appList = null;
    let podList = null;
    let graph = null;
    console.log('pod id:', this.state.selectedPodId)
    if (this.state.metricDataFlag && this.state.metricData.length > 0) {
      graph = (<LineChart
        width={850}
        height={500}
        data={this.state.metricData}
        margin={{
          top: 35,
          right: 30,
          left: 250,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="cpu" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="memory" stroke="#82ca9d" />
      </LineChart>)
    }
    else {
      graph = (
        <div style={{ marginLeft: 250, marginTop: 35, marginRight: 30, marginBottom: 5, textAlignVertical: "center", textAlign: "center", }}>
          <h4 style={{ color: 'grey' }}>  No Metrics to Show </h4>
        </div>
      )
    }
    if (this.state.appPodDtls.length > 0) {
      console.log('appod')
      appList = this.state.appPodDtls.map(appPod => {
        return (
          <option value={appPod.appId}>{appPod.appName}</option>
        );
      })
    }
    if (this.state.selectedAppId > 0) {
      const appPodList = this.state.appPodDtls;
      console.log(appPodList)
      let podDtls = null;
      const appPodIndex = appPodList.findIndex(appPod => appPod.appId === this.state.selectedAppId);
      if (appPodIndex > -1) {
        podDtls = appPodList[appPodIndex].pods;
        podList = podDtls.map(pod => {
          return (
            <option value={pod.podId}>{pod.podName}</option>
          );
        })
      }
      else {

      }
    }
    return (
      <div className="dashboard">

        <section>

          <div className="appList">
            <h4>Select Application</h4>
            <select name="appName" value={this.state.selectedAppId} onChange={this.appSelected}>
              <option value="0">Select Application</option>
              {appList}
            </select>
          </div>
          <br />
          <div className="podList">
            <h4>Select Pod</h4>
            <select name="podName" value={this.state.selectedPodId} onChange={this.podSelected}>
              <option value="0">Select Pod</option>
              <br />
              {podList}
            </select>
          </div>
        </section>
        <section>
          <br />
          <br />
          {graph}
        </section>
      </div>
    );
  }
}
export default Dashboard;
