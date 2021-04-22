require('dotenv').config();
const {Kafka, logLevel} = require('kafkajs');
const crypto = require('crypto');
const chalk = require('chalk');

const allTopics = {
    SIGNUP_API: 'signup-272',
    SIGNUP_RES: 'signup-res-272',
    LOGIN_API:'login-check-272',
    LOGIN_RES:'login-res-272',
    
};



const k = new Kafka({
    logLevel: logLevel.INFO,
    clientId: 'kubernetes-kafka',
    brokers: process.env.KAFKA_BROKERS.split(','),
});

async function kafka() {
    const producer = k.producer();
    const groupId = process.env.GROUP;
    // App wide consumer group
    const consumer = k.consumer({groupId, fromBeginning: false});
    // Topics need to be defined before staring the server
    const topics = Object.values(allTopics);
    const subscriptions = {};
    await producer.connect();
    await consumer.connect();
    console.log('topic::',topics);
    await Promise.all(topics.map((topic) => consumer.subscribe({topic})));

    const send = async (topic, msg) => {
          console.log('inside send::',topic,msg)
        const messages = [{value: JSON.stringify(msg)}]
        // console.log(`Sending messages to topic ${topic}`, messages);
        producer.send({topic, messages});
    }

    const subscribe = (topic, callback, name = null) => {
        //   console.log('inside subscribe::',topic)
        if (!subscriptions.hasOwnProperty(topic)) {
            subscriptions[topic] = [];
        }
        subscriptions[topic].push((...args) => callback(...args, name));
    };
    console.log(`Still connecting to consumer group ${groupId} ...`);
    await consumer.run({
        eachMessage: async ({topic, partition, message}) => {
            if (subscriptions.hasOwnProperty(topic)) {
                subscriptions[topic].forEach((callback) => {
                    callback(JSON.parse(message.value.toString()), new Date(parseInt(message.timestamp)));
                });
            }
        },
    });

    console.info(chalk.green(`Connected consumer group ${groupId}`));

    const awaitCallbacks = {};
    subscribe(allTopics.SIGNUP_RES, ({token, resp, success}) => {
        // console.log(`Received message from topic ${allTopics.API_RESP}`, resp);
        // awaitCallbacks can be lost on restart, or in kafka server mode
        if (awaitCallbacks.hasOwnProperty(token)) {
            awaitCallbacks[token][success ? 0 : 1](resp);
            delete awaitCallbacks[token];
        }
    });

    subscribe(allTopics.LOGIN_RES, ({token, resp, success}) => {
        // console.log(`Received message from topic ${allTopics.API_RESP}`, resp);
        // awaitCallbacks can be lost on restart, or in kafka server mode
        if (awaitCallbacks.hasOwnProperty(token)) {
            awaitCallbacks[token][success ? 0 : 1](resp);
            delete awaitCallbacks[token];
        }
    });
    
    return {
        send,
        subscribe,
        signup: (fn, ...params) => new Promise((resolve, reject) => {
            const token = crypto.randomBytes(64).toString('hex');
            console.log('token::,fn,params',token,fn,params)
            awaitCallbacks[token] = [resolve, reject];
            send(allTopics.SIGNUP_API, {fn, params, token});
        }),

        checkLogin: (fn, ...params) => new Promise((resolve, reject) => {
            const token = crypto.randomBytes(64).toString('hex');
            console.log('token::,fn,params',token,fn,params)
            awaitCallbacks[token] = [resolve, reject];
            send(allTopics.LOGIN_API, {fn, params, token});
        }),

    
    };
}

module.exports = {kafka, topics: allTopics};