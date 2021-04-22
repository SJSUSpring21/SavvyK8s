require('dotenv').config();

var router = require("express").Router();
const multer = require('multer');
var upload = multer();

const { checkAuth } = require("../passport/passport");
const {kafka} = require('../kafka');
const loginSignup = require('../services/LoginSignupSvc');

(async()=>{
  if (process.env.MOCK_KAFKA === 'FALSE') {
    const k=await kafka();
    signup=await k.signup;
    checkLogin=await k.checkLogin;
  }
  else{
    signup = async (fn, ...params) => {
      console.log(fn);
      loginSignup[fn](...params)};
    checkLogin=async (fn, ...params) => loginSignup[fn](...params);
  }

   
})();


router.post("/signup", async (req,res)=>{
const response= await signup('createCustomer', req.body);
  
  res.status(201).send(response);
  });

  router.post("/login", async (req,res)=>{
const response= await checkLogin('checkLogin', req.body);
 
  res.status(200).send(response);
  });

 


module.exports = router;