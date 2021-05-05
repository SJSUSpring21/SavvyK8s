import React, { Component } from "react";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from "axios";
import config from '../../config.json';
class Metrics extends Component{
    constructor(props) {
        super(props);
    this.state = {
      metricData:[],
      metricDataFlag:false,
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
fetchMetrics=(podId)=>{
  console.log('metrics:')
  console.log('app id:',this.state.selectedAppId);
  axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
  let metricsReq={
      custId:this.state.custDetails.custId,
      nodeMetrics:true
  };

  
   axios
       .post(
         config.backEndURL+"/users/metrics",metricsReq
       )
       .then(response => {
         console.log("Status Code : ", response.status);
         if (response.status === 200) {
           console.log(response);
        this.setState({
            metricData:response.data,
            metricDataFlag:true
        })
         
       }
       })
       .catch(error => {
         console.log(error.response);
      
       });
      }

    render(){
       let nodeMetrics=null;
      if(this.state.metricDataFlag&&this.state.metricData.length>0)
      {
        nodeMetrics=( <LineChart
          width={500}
          height={300}
          data={this.state.data}
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
      else
      nodeMetrics=(<h4>No Metrics to Show</h4>)
        return(
            <div className="padded-section">
       <div className="card-header mb-3 text-white bg-primary pt-2 pb-2 "><h3>Node Metrics</h3></div>
       

          {nodeMetrics}   
       
            </div>
        );
    }
}
export default Metrics;