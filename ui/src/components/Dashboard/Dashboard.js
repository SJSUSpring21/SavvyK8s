import React, { Component } from "react";
import DashboardHeader from "./DashboardHeader/DashboardHeader";
import axios from "axios";
import config from '../../config.json';
import { LineChart,AreaChart, Line, Area,XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import NestedGrid from './Grid.js';
class Dashboard extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      custDetails:this.props.custDetails,
      appPodDtls:this.props.appPodDtls,
      selectedAppId:1,
      selectedPodId:1,
      selectedGraphId:2,
      selectedMetricId:1,
      metricType:"cpu",
      metricData:[],
      metricDataFlag:false
     
    };
  }

  componentDidMount() {
    this.fetchMetrics(this.state.selectedPodId);
     const podId=console.log('default pod:',this.state.selectedPodId)
    this.timer =setInterval(()=>{
      this.fetchMetrics(this.state.selectedPodId)}, 500000);
  }
  componentWillUnmount() {
    this.timer = null; 
  }

  componentDidUpdate(prevProps,prevState) {
    if (prevProps.custDetails !== this.props.custDetails) {
      const changedCustDetails = this.props.custDetails;
      this.setState({
        custDetails: changedCustDetails
      })
    }
    if (prevState.metricData !== this.state.metricData) {
      console.log('updated')
      const metricData = this.state.metricData;
      this.setState({
        metricData: metricData
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
  graphSelected=(e)=>{
    const graphId=Number(e.target.value);
    this.setState({
      selectedGraphId:graphId
    })
  }
  metricSelected=(e)=>{
    const metricId=Number(e.target.value);
   let metricType;
    if(metricId===1)
    metricType="cpu";
    else
    metricType="memory";
    this.setState({
      selectedMetricId:metricId,
      metricType:metricType
    })
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
     console.log(this.state);
   let appList=null;
   let podList=null;
   let graph=null;
   let graph1=null;
   let metricList=null;
   console.log('pod id:',this.state.selectedPodId)
  //  if(this.state.selectedGraphId===2 )
  //  {
  //   metricList=( <div className="graph Type">
  //   <h4>Select Graph</h4><select name="metricName"  value={this.state.selectedMetricId} onChange={this.metricSelected}>
  //   <option value="0">Select Metric Type</option>
  //   <option value="1">CPU</option>
  //   <option value="2">Memory</option>
  // </select></div>)
  //  }
   if(this.state.metricDataFlag&&this.state.metricData.length>0&&this.state.selectedGraphId===1)
   {
    graph=( <LineChart
      width={500}
      height={300}
      data={this.state.metricData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
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
   else if(this.state.metricDataFlag&&this.state.metricData.length>0&&this.state.selectedGraphId===2/*&&this.state.selectedMetricId>0*/)
   {
  
  
    graph=( <AreaChart
      width={500}
      height={400}
      data={this.state.metricData}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="cpu" stroke="#8884d8" fill="#8884d8" />
    </AreaChart>
    
    )
    graph1=( <AreaChart
      width={500}
      height={400}
      style={{marginLeft:"500px",marginTop:"-400px"}}
      data={this.state.metricData}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="memory" stroke="#8884d8" fill="#8884d8" />
    </AreaChart>)
   }
   else{
     graph=(<h4>No Metrics to Show</h4>)
     graph1=null;
   }
    if(this.state.appPodDtls.length>0)
    {
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
        <section className="padded-section">
          <div className="row">
            <div className="col-lg-4">
              <div className="appList">
                <h4>Select Application</h4>
                <select className="select_" name="appName" value={this.state.selectedAppId} onChange={this.appSelected}>
                  <option value="0">Select Application</option>
                  {appList}
                </select>
              </div>
            </div>
            <br />
            <div className="col-lg-4">
              <div className="podList">
                <h4>Select Pod</h4>
                <select className="select_"  name="podName" value={this.state.selectedPodId} onChange={this.podSelected}>
                  <option value="0">Select Pod</option>
                  <br />
                  {podList}
                </select>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="graph Type">
                <h4>Select Graph</h4>
                <select className="select_" name="podName"  value={this.state.selectedGraphId} onChange={this.graphSelected}>
                  <option value="0">Select Graph</option>
                  <option value="1">Line Charts</option>
                  <option value="2">Area Chart</option>
                </select>
                </div>
                {metricList}
              </div>
            </div>
          </section>
        <br/>
        <section className="padded-section">
          <span>{graph} {graph1}</span>
        </section>
        <section className="padded-section">
          <NestedGrid/>
        </section>
      </div>
      
    );
  }
}
export default Dashboard;
