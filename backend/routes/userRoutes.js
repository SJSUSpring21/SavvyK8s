require('dotenv').config();

var router = require("express").Router();
const multer = require('multer');
var upload = multer();

const { checkAuth } = require("../passport/passport");
const loginSignup = require('../services/LoginSignupSvc');
const appReg = require('../services/AppRgstrnSvc');
const custDtls = require("../services/CustDtlsSvc");
const metrics=require("../services/MetricsSvc");

(async () => {
  if (process.env.MOCK_KAFKA === 'FALSE') {
    const k = await kafka();
    signup = await k.signup;
    checkLogin = await k.checkLogin;
    appRegistration = await k.appRegistration;
    saveAppCustDtls = await k.saveAppCustDtls;
    fetchCustAppPodDtls = await k.fetchCustAppPodDtls;
  }
  else {
    console.log('mocked svc');
    signup = async (fn, ...params) => loginSignup[fn](...params);
    checkLogin = async (fn, ...params) => loginSignup[fn](...params);
    appRegistration = async (fn, ...params) => appReg[fn](...params);
    saveAppCustDtls = async (fn, ...params) => appReg[fn](...params);
    fetchCustAppPodDtls = async (fn, ...params) => appReg[fn](...params);
    getAllAppPodDtls=async (fn, ...params) => appReg[fn](...params); 
    updateCustDetails = async (fn, ...params) => custDtls[fn](...params);
    updateCustAppDtls=async (fn, ...params) => appReg[fn](...params);
    fetchMetricsData=async (fn, ...params) => metrics[fn](...params);
    fetchNodeList=async (fn, ...params) => metrics[fn](...params);

  }


})();


router.post("/signup", async (req, res) => {
  try{
  console.log('inside signup');
  const response = await signup('createCustomer', req.body);

  res.status(201).send(response);
  }
  catch(error){
    res.status(500).send(error);
  }
});

router.post("/login", async (req, res) => {
  try{
  const response = await checkLogin('checkLogin', req.body);

  res.status(200).send(response);
}
  catch(error)
  {
    res.status(500).send(error);
    }

});

router.get("/appRegistration", async (req, res) => {
  const response = await appRegistration('fetchRegistrationDtls', req.body);

  res.status(200).send(response);
});
router.post("/custAppDtls", async (req, res) => {
  const response = await saveAppCustDtls('custAppRegDtls', req.body);

  res.status(201).send(response);
});
router.get("/custAppDtls/:custId", async (req, res) => {
  const response = await fetchCustAppPodDtls('fetchCustAppPodDtls', req.params.custId);

  res.status(200).send(response);
});
router.post("/custDetails", upload.single("file"),async (req, res) => {
  const profileUpdateReq={
    image:req.file,
    profDtls:req.body.profDtls
  }
  console.log(profileUpdateReq)
  const response = await updateCustDetails('updateCustDtls', profileUpdateReq);

  res.status(200).send(response);
});

router.get("/allAppPodDtls", async (req, res) => {
  const response = await getAllAppPodDtls('getAllAppPodDtls', null);

  res.status(200).send(response);
});
router.put("/custApp", async (req, res) => {
  const response = await updateCustAppDtls('updateCustAppDtls', req.body);

  res.status(200).send(response);
});
router.post("/metrics", async (req, res) => {
  const response = await fetchMetricsData('fetchMetricsData', req.body);

  res.status(200).send(response);
});

router.get("/nodes", async (req, res) => {
  const response = await fetchNodeList('fetchNodeList', null);

  res.status(200).send(response);
});

module.exports = router;