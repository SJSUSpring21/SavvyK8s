import React, { Component } from "react";
import DashboardHeader from "./DashboardHeader/DashboardHeader";
import axios from "axios";
import { FileSaver } from 'file-saver';
import "./Dashboard.css"
import config from '../../config.json';
import memory from "../../assets/images/memory-white.png"
import cpu from "../../assets/images/cpu-white.png";
import domtoimage from 'dom-to-image';
import fileDownload from "js-file-download";
import GetAppIcon from '@material-ui/icons/GetApp';

import { LineChart,AreaChart, Line, Area,XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    // const [png, ref] = useRechartToPng();
    this.state = {
      custDetails:this.props.custDetails,
      appPodDtls:this.props.appPodDtls,
      selectedAppId:1,
      selectedPodId:1,
      selectedGraphId:2,
      selectedMetricId:1,
      metricType:"cpu",
      metricData:[],
      metricDataFlag:false,
      memory:0,
      cpu:0,
      chart:null,
     
    };
  }

handleDownload=(graph)=>{
  console.log('graph',graph)
  if(graph==='graph1'){
  domtoimage.toBlob(document.getElementById('cpugraph'))
  .then(function (blob) {
     fileDownload(blob, 'cpugraph.png');
  });
}
if(graph==='graph2'){
  domtoimage.toBlob(document.getElementById('memorygraph'))
  .then(function (blob) {
     fileDownload(blob, 'memorygraph.png');
  });
}
if(graph==='graph3'){
  domtoimage.toBlob(document.getElementById('cpumemorygraph'))
  .then(function (blob) {
     fileDownload(blob, 'cpumemorygraph.png');
  });
}
  
}

  componentDidMount() {
    this.fetchMetrics(this.state.selectedPodId);
     const podId=console.log('default pod:',this.state.selectedPodId)
    this.timer =setInterval(()=>{
      this.fetchMetrics(this.state.selectedPodId)}, 15000);
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
      podId: podId,
      nodeId:0
    };


    axios
      .post(
        config.backEndURL + "/users/metrics", metricsReq
      )
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log(response);
          let memory,cpu;
          if(response.data.length>0){
           memory=response.data[response.data.length-1].memory;
           cpu=response.data[response.data.length-1].cpu;
          }
          this.setState({
            metricData: response.data,
            metricDataFlag: true,
            memory:memory,
            cpu:cpu
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
   let graphDesc=null;
   let graph1Desc=null;
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
    graph1Desc = (<span style={{ fontSize: "20px", marginLeft: "200px" }}>CPU-Memory<GetAppIcon fontSize='large' onClick={()=>this.handleDownload('graph3')}/></span>)
    graph=( <LineChart
      width={500}
      height={300}
      data={this.state.metricData}
      style={{
      width: "500px",
      height: "300px",marginRight:"400px",backgroundColor:'white'}}
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
      <Tooltip  wrapperStyle={{ width: 100, backgroundColor: 'red' }}/>
      <Legend />
      <Line type="monotone" dataKey="cpu" stroke="#8884d8" activeDot={{ r: 8 }}  />
      <Line type="monotone" dataKey="memory" stroke="#82ca9d" />
    </LineChart>)
   }
   else if(this.state.metricDataFlag&&this.state.metricData.length>0&&this.state.selectedGraphId===2/*&&this.state.selectedMetricId>0*/)
   {
    graph1Desc = (<span style={{ fontSize: "20px", marginLeft: "375px" }}>Memory(Mi)<GetAppIcon fontSize='large' onClick={()=>this.handleDownload('graph2')}/></span>)
    graphDesc = (<span style={{ fontSize: "20px", marginLeft: "150px" }}>CPU(cores)<GetAppIcon fontSize='large' onClick={()=>this.handleDownload('graph1')}/></span>)
 
    graph=( <div id="cpugraph"><AreaChart
      width={400}
      height={400}
      data={this.state.metricData}
      style={{/*borderRadius: "150px",*/
      /*outline: "1px solid white",*/
      width: "400px",
      height: "400px",marginRight:"400px",backgroundColor:'white'}}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis domain={[0, 200]}/>
      <Tooltip />
      <Area type="monotone" dataKey="cpu" stroke="#8884d8" fill="red" />
    </AreaChart></div>
    
    )
    graph1=(<div id="memorygraph"> <AreaChart
      width={400}
      height={400}
      style={{marginLeft:"500px",marginTop:"-400px",/*,borderRadius: "150px",
      outline: "1px solid white",*/
      width: "400px",
      height: "400px",backgroundColor:'white'}}
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
      <YAxis domain={[0, 200]}/>
      <Tooltip />
      <Area type="monotone" dataKey="memory" stroke="#8884d8" fill="red" />
    </AreaChart>
    </div>
    )
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
    <>
        <section style={{ marginTop:'3rem', marginBottom:'1rem'}}>
          <div style={{display: 'flex', textAlign: 'center'}}>
              <div className="appList">
                <h4>Select Application</h4>
                <select className="select_" name="appName" value={this.state.selectedAppId} onChange={this.appSelected}>
                  <option value="0">Select Application</option>
                  {appList}
                </select>
              </div>
            <br />
              <div className="podList">
                <h4>Select Pod</h4>
                <select className="select_"  name="podName" value={this.state.selectedPodId} onChange={this.podSelected}>
                  <option value="0">Select Pod</option>
                  <br />
                  {podList}
                </select>
              </div>
              <div className="graphType">
                <h4>Select Graph</h4>
                <select className="select_" name="podName"  value={this.state.selectedGraphId} onChange={this.graphSelected}>
                  <option value="0">Select Graph</option>
                  <option value="1">Line Charts</option>
                  <option value="2">Area Chart</option>
                </select>
                </div>
                {metricList}
              </div>
          </section>
          <br/>
          <section className="graphs">
            <span >{graph}{graph1}</span>
            {graphDesc}{graph1Desc}
          </section>
          <section className="padded-section" >
            <span className="currMetrics">Current Metrics</span>
            <span className="thresholdMetrics"> Threshold Metrics</span>
       
            <div className="grid-container-metric">
              <div className="memory common">
                <img className="mt-2" style={{float:'left'}} height="50px" width="50px" src={memory}/>
                <center><b>Memory</b></center>
                <span className="memoryData">{this.state.memory? this.state.memory:0}</span>
                <br/>
                <span style={{marginLeft:'75px'}}>Mi</span>
              </div>
              <div className="cpu common">
                <img className="mt-2" style={{float:'left'}} height="60px" width="50px" src={cpu}/>
                <center><b>CPU</b></center>
                <span className="cpuData">{this.state.cpu?this.state.cpu:0}</span><br/>
                <span style={{marginLeft:'75px'}}>cores</span>
              </div>
              <div className="thresholdMemory common">
              <img style={{float:'left'}} className="mt-4" height="50px" width="50px" src={memory}/>
              <center><b >Memory</b></center>
                <span className="thresholdMemoryData">200</span>
                <br/>
                <span style={{marginLeft:'75px'}}>Mi</span>
              </div>
              <div className="thresholdCPU common">
              <img style={{float:'left'}} className="mt-3" height="60px" width="50px" src={cpu}/>
              <center><b >CPU</b></center>
                <span className="thresholdCPUData">200</span><br/>
               <span style={{marginLeft:'75px'}}>cores</span>
              </div>
            </div>
          </section>
      </>
      
    );
  }
}
export default Dashboard;
