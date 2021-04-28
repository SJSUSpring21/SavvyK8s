import React, { Component } from "react";
import "./DashboardHeader.css";

class DashboardHeader extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      custDetails: this.props.custDetails,
    };
  }
  componentWillMount() {

  }




  componentDidUpdate(prevProps, prevState) {
  }


  render() {
    return (
      <div className="dashboardHeader">
        <div className="dashboardHeaderData">
          <h1>Dashboard</h1>


        </div>
      </div>
    );
  }
}
export default DashboardHeader;
