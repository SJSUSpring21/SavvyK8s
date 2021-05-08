import React, { Component } from "react";

import { LineChart,AreaChart, Line, Area,XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from "axios";
import config from '../../config.json';
class Metrics extends Component{
    constructor(props) {
        super(props);
    this.state = {
      nodeList:[],
      metricData:[],
      selectedNodeId:1,
      selectedGraphId:2,
      metricDataFlag:false,
      memory:0,
      cpu:0,
        data : [
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
async componentDidMount(){

  await this.fetchNodeList();
this.fetchMetrics(this.state.selectedNodeId);
}
nodeSelected=(e)=>{
const nodeId=Number(e.target.value);
this.setState({
  selectedNodeId:nodeId
})
this.fetchMetrics(nodeId)
}
graphSelected=(e)=>{
  const graphId=Number(e.target.value);
  this.setState({
    selectedGraphId:graphId
  })
}
fetchNodeList=()=>{

  
  axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
  
   axios
       .get(
         config.backEndURL+"/users/nodes"
       )
       .then(response => {
         console.log("Status Code : ", response.status);
         if (response.status === 200) {
           console.log(response);
        this.setState({
            nodeList:response.data
           
        })
         
       }
       })
       .catch(error => {
         console.log(error.response);
      
       });
      }


fetchMetrics=(nodeId)=>{
  console.log('metrics:')
  console.log('nodeis:',nodeId)
  axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
  let metricsReq={
      nodeMetrics:true,
      nodeId:nodeId,
      appId:0,
      podId:0
  };

  
   axios
       .post(
         config.backEndURL+"/users/metrics",metricsReq
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
            metricData:response.data,
            metricDataFlag:true,
            memory:memory,
            cpu:cpu
        })
         
       }
       })
       .catch(error => {
         console.log(error.response);
      
       });
      }

    render(){
       let graph=null;
       let graph1=null;
       let nodeList=null;  
       let graphDesc=null;
   let graph1Desc=null;
       console.log('render')  
       if(this.state.nodeList.length>0)
       {
        nodeList=this.state.nodeList.map((node,index)=>{
          return (
            <option value={node._id}>{node.nodeName}</option>
          )
        })
       }
 
    
      if(this.state.metricDataFlag&&this.state.metricData.length>0&&this.state.selectedGraphId===1)
      {
        graph=( <LineChart
          width={500}
          height={300}
          data={this.state.metricData}
          style={{borderRadius: "150px",
          outline: "1px solid grey",
          width: "500px",
          height: "300px"}}
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
     )
      }
      else if(this.state.metricDataFlag&&this.state.metricData.length>0&&this.state.selectedGraphId===2)
       {
        graph1Desc= (<span style={{fontSize:"30px",marginLeft:"425px"}}>Memory</span>)
        graphDesc=(   <span style={{fontSize:"30px",marginLeft:"175px"}}>CPU</span>)
         console.log('inside')
        graph=( <AreaChart
          width={400}
          height={400}
          data={this.state.metricData}
          style={{borderRadius: "150px",
          outline: "1px solid grey",
          width: "400px",
          height: "400px"}}
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
          width={400}
          height={400}
          style={{marginLeft:"500px",marginTop:"-400px",borderRadius: "150px",
          outline: "1px solid grey",
          width: "400px",
          height: "400px"}}
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
 
      else
      graph=(<h4>No Node Metrics to Show</h4>)
        return(
<div>
       <div className="card-header mt-3 mb-3 text-white bg-primary pt-2 pb-2 "><h3>Node Metrics</h3>
       </div>
  <section style={{ marginTop:'3rem', marginBottom:'5rem'}}>
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
  </section>
  <section className="padded-section">
    <div className="grid-container-metric">
      <div className="memory">
        <center><b>Memory</b></center>
        <span className="memoryData">{this.state.memory}</span>

      </div>
      <div className="cpu">
        <center><b>CPU</b></center>
        <span className="cpuData">{this.state.cpu}</span>
      </div>
    </div>
  </section>

</div>   
 
          
        );
    }


}
export default Metrics;
