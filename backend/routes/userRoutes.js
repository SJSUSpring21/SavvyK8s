require('dotenv').config();

var router = require("express").Router();
const multer = require('multer');
var upload = multer();

const { checkAuth } = require("../passport/passport");
const {kafka} = require('../kafka');
const loginSignup = require('../services/LoginSignupSvc');
const appReg = require('../services/AppRgstrnSvc');
//const {  AppRegistration } = require('../../ui/src/components/AppRegistration/AppRegistration');

(async()=>{
  if (process.env.MOCK_KAFKA === 'FALSE') {
    const k=await kafka();
    signup=await k.signup;
    checkLogin=await k.checkLogin;
    appRegistration=await k.appRegistration;
    saveAppCustDtls=await k.saveAppCustDtls;
    fetchCustAppPodDtls=await k.fetchCustAppPodDtls;
  }
  else{
    console.log('mocked svc');
    signup = async (fn, ...params) => loginSignup[fn](...params);
    checkLogin=async (fn, ...params) => loginSignup[fn](...params);
    appRegistration=async (fn, ...params) => appReg[fn](...params);
    saveAppCustDtls=async (fn, ...params) => appReg[fn](...params);
    fetchCustAppPodDtls=async (fn, ...params) => appReg[fn](...params);
  
  
  }

   
})();


router.post("/signup", async (req,res)=>{
  console.log('inside signup');
const response= await signup('createCustomer', req.body);
  
  res.status(201).send(response);
  });

  router.post("/login", async (req,res)=>{
const response= await checkLogin('checkLogin', req.body);
 
  res.status(200).send(response);
  });

  router.get("/appRegistration", async (req,res)=>{
    const response= await appRegistration('fetchRegistrationDtls', req.body);
     
      res.status(200).send(response);
      });
  router.post("/custAppDtls", async (req,res)=>{
        const response= await saveAppCustDtls('custAppRegDtls', req.body);
         
          res.status(201).send(response);
          });
    router.get("/custAppDtls/:custId", async (req,res)=>{
            const response= await fetchCustAppPodDtls('fetchCustAppPodDtls', req.params.custId);
             
              res.status(200).send(response);
              });

 
          

module.exports = router;