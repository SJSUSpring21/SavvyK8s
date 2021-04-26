import React,{Component} from 'react';
import "./MyProfile.css";
import CreateIcon from '@material-ui/icons/Create';
import axios from 'axios';
import { Redirect } from "react-router";
import config from '../../config.json';
import cookie from "react-cookies";

import HomePageR from "../HomePage/HomePage"

class MyProfile extends Component{
constructor(props)
{
      console.log(props);
    super(props);
    this.state={
      
        custDetails:this.props.custDetails,
        enableNameText:false,
        enableEmailText:false,
        enablePhnNmber:false,
        enablePasswd:false,
        detailsUpdated:false,
        updatedCustdetails:{
            custId:this.props.custDetails.custId,
            custName:this.props.custDetails.custName,
            custEmail:this.props.custDetails.loginUserId,
            custPhnNmbr:this.props.custDetails.phnNumber,
            currPasswd:"",
            newPasswd:"",
            countryCode:this.props.custDetails.countryCode     
                },
      

        }      
        }

        
enableNameEdit=()=>{
    this.setState({
        enableNameText:true
    })
}
enableEmailEdit=()=>{
    this.setState({
        enableEmailText:true
    })
}
enablePhnNmberEdit=()=>{
    this.setState({
        enablePhnNmber:true
    })
}
enablePasswdEdit=()=>{
    this.setState({
        enablePasswd:true
    })
}
currentPasswordChanged=(e)=>{
    let updatedCustDetails=this.state.updatedCustdetails;
    updatedCustDetails.currPasswd=e.target.value;
    this.setState({
    updatedCustDetails:updatedCustDetails
    })
}
newPasswordChanged=(e)=>{
    let updatedCustDetails=this.state.updatedCustdetails;
    updatedCustDetails.newPasswd=e.target.value;
    this.setState({
    updatedCustDetails:updatedCustDetails
    })
}
custNameChanged=(e)=>{
  console.log('qwer')
let updatedCustDetails=this.state.updatedCustdetails;
    updatedCustDetails.custName=e.target.value;
    let custDetails=this.state.custDetails;
    custDetails.custName=e.target.value;
    this.setState({
    updatedCustDetails:updatedCustDetails,
    custDetails:custDetails
    })
}
phnNumberChanged=(e)=>{
let updatedCustDetails=this.state.updatedCustdetails;
    updatedCustDetails.custPhnNmbr=e.target.value;
    let custDetails=this.state.custDetails;
    custDetails.phnNumber=e.target.value;
    
    this.setState({
    updatedCustDetails:updatedCustDetails,
    custDetails:custDetails
    })
}
custEmailChanged=(e)=>{
let updatedCustDetails=this.state.updatedCustdetails;
    updatedCustDetails.custEmail=e.target.value;
    this.setState({
    updatedCustDetails:updatedCustDetails
    })
}
countryCodeChanged=(e)=>{
  let updatedCustDetails=this.state.updatedCustdetails;
    updatedCustDetails.countryCode=Number(e.target.value);
    this.setState({
    updatedCustDetails:updatedCustDetails
    })
}

componentDidMount(){

   
}
uploadImageinDB=()=>{
  return new Promise((resolve,reject)=>{
  const custId=this.state.custDetails.custId; 
    const formData = new FormData();
    
    console.log(this.state.updatedCustdetails);
      // Update the formData object
    console.log(this.state.selectedFile)
      formData.append(
        "file",
        this.state.selectedFile
     
      ); 
      formData.append("profDtls",JSON.stringify(this.state.updatedCustdetails));
      const config1 = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
  axios
      .post(
        config.backEndURL+"/users/updateProfDtls/"+custId,formData,config1
      )

      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log(response.data.imageId);
          const updatedCustdetails=this.state.custDetails;
          updatedCustdetails.imageId=response.data.imageId;
 
        //  this.props.custDetailsUpdated({
        //   updatedCustdetails:updatedCustdetails
        // });
        return resolve(response.data.imageId);
          //console.log(this.state);
        }
        else{

        }
      })
      .catch(error => {
    
        console.log(error.response);
            return reject('unknown error')
      });
})
}
updateCustdetails=async ()=>{
 
 const imageId=await this.uploadImageinDB();
  // const imageData=this.state.imageUri;
  // const custDetails=this.state.updateCustdetails;
  // custDetails.imageData=imageData;
  // this.setState({
  //   updateCustdetails:custDetails
  // })
 const updatedCustDetails=await this.saveCustDetailsinDB();
 if(imageId!==null)
 {
   console.log('imgId')
    updatedCustDetails.imageId=imageId;
 }
 console.log('after db update',updatedCustDetails)
  this.props.custDetailsUpdated({
          updatedCustdetails:updatedCustDetails
        });
        this.props.history.push("/");
}
saveCustDetailsinDB=()=>{
  return new Promise((resolve,reject)=>{
    axios
      .put(
        config.backEndURL+"/profile/custDetails",this.state.updatedCustdetails
      )

      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
        console.log(response);
        this.setState({
          detailsUpdated:true
        })
          console.log(response.data);
         //need to update custDetails props
        const updatedCustdetails=this.state.updatedCustdetails;
        return resolve(updatedCustdetails)
        //console.log('updated details',updatedCustdetails)

        //     this.setState({
        //    updatedCustdetails:updatedCustdetails
        //  })
        //
          
      //console.log(this.state);
     
         
          // this.props.history.push({pathname: "/home",
          // updatedCustdetails:{updatedCustdetails:updatedCustdetails}});
        }
        
         else{

        }
      })
      .catch(error => {
        console.log(error.response);
        // this.setState({
        //   signUpDone: false,
        //   errorMsg: error.response.data.errorDesc
      });
})
}
componentDidUpdate(prevState,prevProps){
  if(this.state.updatedCustdetails.currencyId!==prevState.currencyId)
  {
    console.log('changed')
  }

}
uploadedImage=(event)=>{
  console.log('asd',event.target.files[0]);
  //let newFile=file;
  const file=event.target.files[0];
  console.log(file)
  this.setState({
    selectedFile:file
  })
  console.log(this.state.selectedFile);
 const reader = new FileReader();
     reader.onload = (event) => {
//  console.log(typeof event.target.result)
 


       this.setState({
        imageData:event.target.result,
      })
     };
     reader.readAsDataURL(file);
     
}

render(){
let redirect=null;
let appsSelected=null;
  if(this.state.detailsUpdated)
  {
//redirect = <Redirect to="/home" />;
this.props.history.push("/home")
  }
     let custNameEdit=null;
     let custEmailEdit=null;
     let custPhnEdit=null;
     let custPasswdEdit=null;
     let currencyDtls=null;
     let timezoneDtls=null;
     let langDtls=null;
    // let countryCodes=null;
     const phnNumber=this.state.custDetails.phnNumber?this.state.custDetails.phnNumber:'None';
if(!this.state.enableNameText)
custNameEdit=( <span className="editDetails" onClick={this.enableNameEdit} ><span style={{color:'black',fontWeight:'bold'}}>{this.state.custDetails.custName}</span><CreateIcon/>edit</span>);
else
custNameEdit=( <input type="text" onChange={this.custNameChanged} value={this.state.custDetails.custName}/>);
if(!this.state.enableEmailText)    
custEmailEdit=( <span className="editDetails" onClick={this.enableEmailEdit} ><span style={{color:'black',fontWeight:'bold'}}><span style={{color:'black',fontWeight:'bold'}}>{this.state.custDetails.loginUserId}</span></span><CreateIcon/>edit</span>);
else
custEmailEdit=( <input type="text" onChange={this.custEmailChanged} value={this.state.custDetails.loginUserId}/>);
if(!this.state.enablePhnNmber)    
custPhnEdit=( <span className="editDetails" onClick={this.enablePhnNmberEdit} ><span style={{color:'black',fontWeight:'bold'}}>{phnNumber}</span><CreateIcon/>edit</span>);
else
custPhnEdit=(<input type="text" value={this.state.custDetails.phnNumber} onChange={this.phnNumberChanged}  pattern="[0-9]{10}"/>);

if(!this.state.enablePasswd)
custPasswdEdit=(<div>Your password<br/><span className="editDetails" onClick={this.enablePasswdEdit} ><span style={{color:'black',fontWeight:'bold',fontSize:'20px'}}>••••••••••</span><CreateIcon/>edit</span></div>);
else
custPasswdEdit=(<div className="changePasswd"> <span>Your current password</span><input type="text" onChange={this.currentPasswordChanged} name="currPasswd"/><br/><span>Your new password</span> <input type="text" onChange={this.newPasswordChanged} name="newPasswd"/></div>);

return(
    <div >
{/* <form> */}
   <div className="profileGridContainer">
        <div className="imageSection">
            <h1>Your account</h1>
            <h5>Available Applications for Metrics</h5>
        </div>
        <div className="personalDetailsSection">
               <div className="editName">
            <span>Your name</span>
        
          </div>
             {custNameEdit}
           <div className="editEmail">
            <span>Your email address</span>

            </div>
           {custEmailEdit}            
        
           <div className="editCountryCode">
            <span>Your Country Code</span><br/>
             <select value={this.state.updatedCustdetails.countryCode} onChange={this.countryCodeChanged}>
             <option value="0">Select Country Code </option>
            <option value="1">United States(+1)</option>
            <option value="2">India(+91)</option>
             </select>
            </div>
        <div className="editPhn">
            <span>Your Phone number</span>
             
            </div>

             {custPhnEdit}
        {/* <div className="changePasswd">
            
              
            </div>
            {custPasswdEdit} */}
            
        </div>
        </div>
        {/* </form> */}
    </div>);
}
}



export default MyProfile;
