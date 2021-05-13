import React, { Component } from "react";

import { LineChart, AreaChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from "axios";
import config from '../../config.json';
import memory from "../../assets/images/memory-white.png"
import cpu from "../../assets/images/cpu-white.png";
import GetAppIcon from '@material-ui/icons/GetApp';

import domtoimage from 'dom-to-image';
import fileDownload from "js-file-download";

class Metrics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodeList: [],
      metricData: [],
      selectedNodeId: 1,
      selectedGraphId: 2,
      metricDataFlag: false,
      memory: 0,
      cpu: 0,
      data: [
        {
          name: '01:30',
          memory: 4000,
          cpu: 2400,

        },
        {
          name: '01:45',
          memory: 3000,
          cpu: 1398,

        },
        {
          name: '02:00',
          memory: 2000,
          cpu: 9800,

        },
        {
          name: '02:15',
          memory: 2780,
          cpu: 3908,

        },
        {
          name: '02:30',
          memory: 1890,
          cpu: 4800,

        },
        {
          name: '02:45',
          memory: 2390,
          cpu: 3800,

        },
        {
          name: '03:00',
          memory: 3490,
          cpu: 4300,

        },
      ]
    }
  }
 
 
  async componentDidMount() {

    await this.fetchNodeList();
   // this.fetchMetrics(this.state.selectedNodeId);
    this.fetchMetrics(1);
   // const podId=console.log('default pod:',this.state.selectedPodId)
   this.timer =setInterval(()=>{
     this.fetchMetrics(1)}, 15000);

  }
  componentWillUnmount() {
    this.timer = null; 
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
    console.log(graph)
  //  document.getElementById('memorygraph').style.marginTop='0px';
    domtoimage.toBlob(document.getElementById('memorygraph'))
    .then(function (blob) {
      console.log(blob)
       fileDownload(blob, 'memorygraph.png');
    //   document.getElementById('memorygraph').style.marginTop='-400px';
    });
  }
  if(graph==='graph3'){
    domtoimage.toBlob(document.getElementById('cpumemorygraph'))
    .then(function (blob) {
       fileDownload(blob, 'cpumemorygraph.png');
    });
  }
    
  }
  
  nodeSelected = (e) => {
    const nodeId = Number(e.target.value);
    this.setState({
      selectedNodeId: nodeId
    })
    this.fetchMetrics(nodeId)
  }
  graphSelected = (e) => {
    const graphId = Number(e.target.value);
    this.setState({
      selectedGraphId: graphId
    })
  }
  fetchNodeList = () => {


    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');

    axios
      .get(
        config.backEndURL + "/users/nodes"
      )
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log(response);
          this.setState({
            nodeList: response.data

          })

        }
      })
      .catch(error => {
        console.log(error.response);

      });
  }


  fetchMetrics = (nodeId) => {
    console.log('metrics:')
    console.log('nodeis:', nodeId)
    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
    let metricsReq = {
      nodeMetrics: true,
      nodeId: nodeId,
      appId: 0,
      podId: 0
    };


    axios
      .post(
        config.backEndURL + "/users/metrics", metricsReq
      )
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log(response);
          let memory, cpu;
          if (response.data.length > 0) {
            memory = response.data[response.data.length - 1].memory;
            cpu = response.data[response.data.length - 1].cpu;
          }
          this.setState({
            metricData: response.data,
            metricDataFlag: true,
            memory: memory,
            cpu: cpu
          })

        }
      })
      .catch(error => {
        console.log(error.response);

      });
  }

  render() {
    let graph = null;
    let graph1 = null;
    let nodeList = null;
    let graphDesc = null;
    let graph1Desc = null;
    console.log('render')
    if (this.state.nodeList.length > 0) {
      nodeList = this.state.nodeList.map((node, index) => {
        return (
          <option value={node._id}>{node.nodeName}</option>
        )
      })
    }


    if (this.state.metricDataFlag && this.state.metricData.length > 0 && this.state.selectedGraphId === 1) {
      graph1Desc = (<span style={{ fontSize: "20px", marginLeft: "200px" }}>CPU-Memory<GetAppIcon fontSize='large' onClick={()=>this.handleDownload('graph3')}/></span>)
      graph = (<div id="cpumemorygraph"><LineChart
        width={500}
        height={300}
        data={this.state.metricData}
        style={{
          /*borderRadius: "150px",
          outline: "1px solid grey"*/
          width: "500px",
          height: "300px",
          backgroundColor:'white'
        }}
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
      </LineChart>
      </div>
      )
    }
    else if (this.state.metricDataFlag && this.state.metricData.length > 0 && this.state.selectedGraphId === 2) {
    
      graphDesc = (<span style={{ fontSize: "20px", marginLeft: "150px" }}>CPU(cores)<GetAppIcon fontSize='large' onClick={()=>this.handleDownload('graph1')}/></span>)
      graph1Desc = (<span style={{ fontSize: "20px", marginLeft: "375px" }}>Memory(Mi)<GetAppIcon fontSize='large' onClick={()=>this.handleDownload('graph2')}/></span>)
      console.log('inside')
      graph = (<div id="cpugraph"><AreaChart
        width={400}
        height={400}
        data={this.state.metricData}
        style={{
         /* borderRadius: "150px",
          outline: "1px solid grey",*/
          width: "400px",
          height: "400px",
          backgroundColor:'white'
        }}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, 1000]}/>
        <Tooltip />
        <Area type="monotone" dataKey="cpu" stroke="#8884d8" fill="red" />
      </AreaChart></div>
      

      )
      graph1 = (<div id="memorygraph" style={{marginTop: "-400px"}}><AreaChart
        width={400}
        height={400}
        style={{
          marginLeft: "500px"  /*borderRadius: "150px",
          outline: "1px solid grey"*/,
          width: "400px",
          height: "400px",  backgroundColor:'white'}}
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
          <YAxis domain={[0, 3000]}/>
          <Tooltip />
          <Area type="monotone" dataKey="memory" stroke="#8884d8" fill="#8884d8" />
        </AreaChart></div>)
       }
 
      else
      graph=(<h4>No Node Metrics to Show</h4>)
        return(
<div>
  <section style={{ marginTop:'3rem', marginBottom:'1rem'}}>
    <div style={{display:'flex', textAlign: 'center'}}>
      <div> 
        <h4>Select Node</h4>
        <select className="select_" name="appName" value={this.state.selectedNodeId} onChange={this.nodeSelected}>
          <option value="0">Select Node</option>
          {nodeList}
        </select>
      </div>
     <br/>
      <div className="graphType">
        <h4>Select Graph</h4>
        <select className="select_" name="graphName"  value={this.state.selectedGraphId} onChange={this.graphSelected}>
          <option value="0">Select Graph</option>
          <option value="1">Line Charts</option>
          <option value="2">Area Chart</option>
        </select>
      </div>
    </div>
  </section>
  <br/>
  <section className="graphs">
    <span >{graph}{graph1}</span>
      {graphDesc}{graph1Desc}
      <span style={{ float: 'left' }}>
        {/* <button onClick={this.handleDownload}>Download</button> */}
      </span>
  </section>
  <section className="padded-section">
  <span className="currMetrics">Current Metrics</span>
            <span className="thresholdMetrics"> Threshold Metrics</span>
    <div className="grid-container-metric">
      <div className="memory common">
      <img style={{float:'left'}} className="mt-4" height="50px" width="50px" src={memory}/>
        <center><b>Memory</b></center>
        <span className="memoryData">{this.state.memory}</span>
        <br/>
                <span style={{marginLeft:'75px'}}>Mi</span>
      </div>
      <div className="cpu common">
      <img style={{float:'left'}} className="mt-3" height="60px" width="50px" src={cpu}/>
        <center><b>CPU</b></center>
        <span className="cpuData">{this.state.cpu}</span>
        <br/>
                <span style={{marginLeft:'75px'}}>cores</span>
      </div>
      <div className="thresholdMemory common">
              <img style={{float:'left'}} className="mt-4" height="50px" width="50px" src={memory}/>
              <center><b >Memory</b></center>
                <span className="thresholdMemoryData">2700</span>
                <br/>
                <span style={{marginLeft:'75px'}}>Mi</span>
              </div>
              <div className="thresholdCPU common">
              <img style={{float:'left'}} className="mt-3" height="60px" width="50px" src={cpu}/>
              <center><b >CPU</b></center>
                <span className="thresholdCPUData">1000</span><br/>
                <span style={{marginLeft:'75px'}}>cores</span>
              </div>
    </div>
   
  </section>

</div>   
 
          
        );
    }


}
export default Metrics;
