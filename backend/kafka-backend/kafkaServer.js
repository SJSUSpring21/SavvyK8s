require('dotenv').config();
const { kafka, topics } = require('../kafka');
const mongodb=require("./database/database")
const loginSignup = require('./services/LoginSignupSvc');
const appReg = require('./services/AppRgstrnSvc');

(async () => {
    const k = await kafka();
    k.subscribe(topics.SIGNUP_API, ({ fn, params, token }) => {
   //      console.log("Kafka server", fn, params, token);
        loginSignup[fn](...params)
            .then(
                (resp) => {
                    k.send(topics.SIGNUP_RES, { token, resp, success: true });
                },
                (resp) => {
                    k.send(topics.SIGNUP_RES, { token, resp, success: false });
                },
            );
    }, 'Kafka Server');

      k.subscribe(topics.LOGIN_API, ({ fn, params, token }) => {
         console.log("Kafka server", fn, params, token);
        loginSignup[fn](...params)
            .then(
                (resp) => {
                    k.send(topics.LOGIN_RES, { token, resp, success: true });
                },
                (resp) => {
                    k.send(topics.LOGIN_RES, { token, resp, success: false });
                },
            );
    }, 'Login Response');

    k.subscribe(topics.APP_REG_API, ({ fn, params, token }) => {
        appReg[fn](...params)
           .then(
               (resp) => {
                   k.send(topics.APP_REG_RES, { token, resp, success: true });
               },
               (resp) => {
                   k.send(topics.APP_REG_RES, { token, resp, success: false });
               },
           );
   }, 'App Reg Response');

   k.subscribe(topics.APP_CUST_API, ({ fn, params, token }) => {
    appReg[fn](...params)
       .then(
           (resp) => {
               k.send(topics.APP_CUST_RES, { token, resp, success: true });
           },
           (resp) => {
               k.send(topics.APP_CUST_RES, { token, resp, success: false });
           },
       );
}, 'App Cust Reg Response');

k.subscribe(topics.CUST_REG_APP_API, ({ fn, params, token }) => {
    appReg[fn](...params)
       .then(
           (resp) => {
               k.send(topics.CUST_REG_APP_RES, { token, resp, success: true });
           },
           (resp) => {
               k.send(topics.CUST_REG_APP_RES, { token, resp, success: false });
           },
       );
}, 'Cust Reg App Response');
    
    
})();