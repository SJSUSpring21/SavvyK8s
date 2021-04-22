import React, { Component } from "react";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
  
class Metrics extends Component{
    constructor(props) {
        super(props);
    this.state = {
       
        data : [
            {
              name: '01:30',
              memory: 4000,
              cpu: 2400,
              amt: 2400,
            },
            {
              name: '01:45',
              memory: 3000,
              cpu: 1398,
              amt: 2210,
            },
            {
              name: '02:00',
              memory: 2000,
              cpu: 9800,
              amt: 2290,
            },
            {
              name: '02:15',
              memory: 2780,
              cpu: 3908,
              amt: 2000,
            },
            {
              name: '02:30',
              memory: 1890,
              cpu: 4800,
              amt: 2181,
            },
            {
              name: '02:45',
              memory: 2390,
              cpu: 3800,
              amt: 2500,
            },
            {
              name: '03:00',
              memory: 3490,
              cpu: 4300,
              amt: 2100,
            },
          ]
    }
}

    render(){
        
        return(
            <div>
       
             
        <LineChart
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
     
            </div>
        );
    }
}
export default Metrics;