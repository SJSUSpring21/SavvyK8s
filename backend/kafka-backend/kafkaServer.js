require('dotenv').config();
const { kafka, topics } = require('../kafka');
const mongodb=require("./database/database")
const loginSignup = require('./services/LoginSignupSvc');

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
    
    
})();