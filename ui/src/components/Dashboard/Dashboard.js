import React, { Component } from "react";
import DashboardHeader from "./DashboardHeader/DashboardHeader";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      custDetails:this.props.custDetails,
     
    };
  }

  componentDidMount()
  {
  }

  componentDidUpdate(prevProps)
  {
    if(prevProps.custDetails!==this.props.custDetails)
    {
      const changedCustDetails=this.props.custDetails;
      this.setState({
        custDetails:changedCustDetails
      })
    }
  }
  
  fetchDashboardDtls=()=>{
  }
  render() {
    return (
      <div className="dashboard">
        <section>
          <div className="center-divider">
            <DashboardHeader  custDetails={this.state.custDetails} 
            />
            
          
          </div>
        </section>
      </div>
    );
  }
}
export default Dashboard;
