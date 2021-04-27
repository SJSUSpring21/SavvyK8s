import React, { Component } from "react";
import DashboardHeader from "./DashboardHeader/DashboardHeader";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      custDetails:this.props.custDetails,
      appPodDtls:this.props.appPodDtls,
      selectedAppId:0,
      selectedPodId:0
     
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
  appSelected=(e)=>{

    const appId=Number(e.target.value);
    this.setState({
      selectedAppId:appId,
      selectedPodId:0
    })
  }
  podSelected=(e)=>{
    const podId=Number(e.target.value);
    console.log('podId:',podId)
    this.setState({
      selectedPodId:podId
    })
   //fetch app pod real time data
  }
  render() {
   let appList=null;
   let podList=null;
   console.log('pod id:',this.state.selectedPodId)
    if(this.state.appPodDtls.length>0)
    {
      console.log('appod')
      appList= this.state.appPodDtls.map(appPod=>{
        return(
          <option value={appPod.appId}>{appPod.appName}</option>
        );
      })
    }
    if(this.state.selectedAppId>0)
    {
      const appPodList=this.state.appPodDtls;
      console.log(appPodList)
      let podDtls=null;
    const appPodIndex= appPodList.findIndex(appPod=>appPod.appId===this.state.selectedAppId);
      if(appPodIndex>-1)
      {
        podDtls= appPodList[appPodIndex].pods;
        podList=podDtls.map(pod=>{
          return (
            <option value={pod.podId}>{pod.podName}</option>
          );
        })
      } 
      else{

      }
  }
    return (
      <div className="dashboard">
        <section>
          <div className="center-divider">
            <DashboardHeader  custDetails={this.state.custDetails} 
            />
            asdf
           
          
          </div>
        </section>
       <section>
       <div className="appList">
         <h4>Select Application</h4>
        <select name="appName"  value={this.state.selectedAppId} onChange={this.appSelected}>
              <option value="0">Select Application</option>
              {appList}
            </select>
            </div>
            <div className="podList">
            <h4>Select Pod</h4>
            <select name="podName"  value={this.state.selectedPodId} onChange={this.podSelected}>
              <option value="0">Select Pod</option>
              {podList}
            </select>
            </div>
            </section>
      </div>
    );
  }
}
export default Dashboard;
