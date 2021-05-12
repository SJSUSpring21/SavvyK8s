const apps = require('../Models/ApplicationsModel');
const metricTypes = require('../Models/MetricsTypeModel');
const CustApps = require('../Models/CustApplicationsModel');
const AppPodsConfig = require('../Models/AppPodsConfigModel');
const PodsConfig = require('../Models/PodsConfigModel');
const autoSeq = require('../controller/AutoSeq.controller');
module.exports = {
    fetchRegistrationDtls: async () => {

        const appDtls = await module.exports.fetchApps();
        const metricTypeDtls = await module.exports.fetchMetricTypes();
        let appRegDtls = {
            appDtls: appDtls,
            metricTypeDtls: metricTypeDtls
        }
        return appRegDtls;
    },

    fetchApps: () => {

        return new Promise((resolve, reject) => {
            apps.find({}, (err, appsData) => {
                if (err) {
                    console.log(err);
                }
                else {
                    return resolve(appsData);
                }
            })
        })
    },
    fetchMetricTypes: () => {

        return new Promise((resolve, reject) => {
            metricTypes.find({}, (err, metricTypesData) => {
                if (err) {
                    console.log(err);
                }
                else {
                    return resolve(metricTypesData);
                }
            })
        })
    },
    custAppRegDtls: async (custAppRegReq) => {

        console.log('custAppRegReq', custAppRegReq)
        let custAppsList = [];
        for (const appId of custAppRegReq.appId) {
            const custAppId = await autoSeq.getSequenceValue('custApplication');
            const custApp = new CustApps({
                _id: custAppId,
                custId: custAppRegReq.custDetails.custId,
                appId: appId,
                applicationAccess: true,
                createdDate: new Date(),
                createdBy: custAppRegReq.custDetails.custName
            })
            custAppsList.push(custApp);
        }
        console.log('custAppsList', custAppsList)
        const response = await module.exports.saveCustAppDtls(custAppsList)
        return response;

    },
    saveCustAppDtls: (custAppsList) => {
        return new Promise((resolve, reject) => {
            CustApps.insertMany(custAppsList, (error, data) => {
                if (error) {

                }
                else {
                    return resolve("Success");
                }
            })
        })
    },
    fetchCustAppPodDtls: async (customerId) => {
        console.log('customerid:', customerId)
        const custId = Number(customerId);
        const custRegAppRes = await module.exports.fetchCustRegAppId(custId)

        console.log(custRegAppRes)
        if (custRegAppRes.length > 0) {

            const appIds = custRegAppRes.map(custApp => custApp.appId);
            const appPodsRes = await module.exports.fetchAppPodDtls(appIds);
            let appPodList = [];

            if (appPodsRes.length > 0) {
                for (const appId of appIds) {
                    const filteredAppPods = appPodsRes.filter(appPod => appPod.appId._id === appId)
                    if (filteredAppPods.length > 0)
                        for (const appPod of filteredAppPods) {

                            if (appPodList.length > 0) {
                                const appPodIndex = appPodList.findIndex(apppod => apppod.appId === appId);
                                if (appPodIndex > -1) {
                                    const pod = {
                                        podId: appPod.podId._id,
                                        podName: appPod.podId.podName
                                    }
                                    appPodList[appPodIndex].pods.push(pod);
                                    console.log('appPodList', appPodList)
                                }
                                else {
                                    let pods = [];
                                    const pod = {
                                        podId: appPod.podId._id,
                                        podName: appPod.podId.podName
                                    }
                                    pods.push(pod);
                                
                                    const appPodData = {
                                        appId: appPod.appId._id,
                                        appName: appPod.appId.applicationName,
                                        pods: pods
                                    }
                                    appPodList.push(appPodData)
                                }
                            }
                            else {
                                let pods = [];
                                const pod = {
                                    podId: appPod.podId._id,
                                    podName: appPod.podId.podName
                                }
                                pods.push(pod);
                                const appPodData = {
                                    appId: appPod.appId._id,
                                    appName: appPod.appId.applicationName,
                                    pods: pods
                                }
                                appPodList.push(appPodData)
                            }

                        }
                }
                return appPodList;
            }

        }
        else {
            return null;
        }

    },
    fetchCustRegAppId: (custId) => {
        return new Promise((resolve, reject) => {
            CustApps.find({ custId: custId,applicationAccess:true }, { appId: 1, applicationAccess: 1, _id: 0 }, (err, custApps) => {
                if (err) { }
                else {
                  
                    return resolve(custApps);
                }
            })
        })
    },
    fetchAppPodDtls: (appIds) => {
        return new Promise((resolve, reject) => {

            AppPodsConfig.find({ "appId": { $in: appIds } }).populate("appId", "applicationName").populate("podId", "podName").exec((err, response) => {
                if (err) {
                    console.log(err);
                }
                else {
                    return resolve(response);
                }
            })
        })

    },

    getAllAppPodDtls:async()=>{
        const appPodsRes =  await module.exports.fetchAllAppPodDtls();
       let appPodList = [];
console.log(appPodsRes);
       if (appPodsRes.length > 0) {
           const appIdList=appPodsRes.map(apppod=>apppod.appId._id);
           const appIds=[...new Set(appIdList)];
           console.log('appIds',appIds)
           for (const appId of appIds) {
               const filteredAppPods = appPodsRes.filter(appPod => appPod.appId._id === appId)
               if (filteredAppPods.length > 0)
                   for (const appPod of filteredAppPods) {

                       if (appPodList.length > 0) {
                           const appPodIndex = appPodList.findIndex(apppod => apppod.appId === appId);
                           if (appPodIndex > -1) {
                               const pod = {
                                   podId: appPod.podId._id,
                                   podName: appPod.podId.podName
                               }
                               appPodList[appPodIndex].pods.push(pod);
                               console.log('appPodList', appPodList)
                           }
                           else {
                               let pods = [];
                               const pod = {
                                   podId: appPod.podId._id,
                                   podName: appPod.podId.podName
                               }
                               pods.push(pod);
                           
                               const appPodData = {
                                   appId: appPod.appId._id,
                                   appName: appPod.appId.applicationName,
                                   pods: pods
                               }
                               appPodList.push(appPodData)
                           }
                       }
                       else {
                           let pods = [];
                           const pod = {
                               podId: appPod.podId._id,
                               podName: appPod.podId.podName
                           }
                           pods.push(pod);
                           const appPodData = {
                               appId: appPod.appId._id,
                               appName: appPod.appId.applicationName,
                               pods: pods
                           }
                           appPodList.push(appPodData)
                       }

                   }
           }
           return appPodList;
        }

    },
    fetchAllAppPodDtls:()=>{
        return new Promise((resolve, reject) => {

            AppPodsConfig.find({}).populate("appId", "applicationName").populate("podId", "podName").exec((err, response) => {
                if (err) {
                    console.log(err);
                }
                else {
                    return resolve(response);
                }
            })
        })
    },
    updateCustAppDtls:async (custAppReq)=>{
     
        console.log("==================")
        console.log('custAppReq::',custAppReq)
        const appIds=custAppReq.appIds;
        const custId=Number(custAppReq.custId);
        const custName=custAppReq.custName;
        const custRegApps=await module.exports.fetchCustRegApps(custId);
        
        console.log('custRegapps:',custRegApps)
        const  custRegAppIds = custRegApps.map(custApp => custApp.appId);
        if(custRegAppIds.length>0)
        {
            let changedAppIds = custRegAppIds.filter(x => !appIds.includes(x));
            console.log('changedAppIds:',changedAppIds)
            for(const changedAppId of changedAppIds){
                await  module.exports.updateCustApp(changedAppId,custId,custName,false);
            }
            for (const appId of appIds){
                const custRegAppIndex=custRegApps.findIndex(regApp=>regApp.appId===appId);
                // const custNonRegAppIndex=custRegApps.findIndex(regApp=>regApp.appId!==appId);
                
                // if(custNonRegAppIndex>-1)
                // {
                //     console.log('non reg app')
                //     const appId=custRegApps[custNonRegAppIndex].appId;
                //     await  module.exports.updateCustApp(appId,custId,custName,false);
                // }
                if(custRegAppIndex>-1)
                {
                    const appAccess=custRegApps[custRegAppIndex].applicationAccess;
                    if(appAccess){
                    console.log('already registered')
                        continue;
                    }
                    else
                    await  module.exports.updateCustApp(appId,custId,custName,true);
                }
                else
                {
                    console.log('New App registration')
                    const custAppId = await autoSeq.getSequenceValue('custApplication');
                    await module.exports.saveCustApp(appId,custId,custName,custAppId);
                }
            }
            // for (const appId of appIds)
            // {
            //     for(const custRegApp of custRegApps)
            //     if(appId===custRegApp.appId&&custRegApp.applicationAccess)
            //     {
            //         console.log('skip')
            //         continue;
            //     }
            //     else if(appId===custRegApp.appId&&!custRegApp.applicationAccess)
            //     {
            //         console.log('update access true')
            //         console.log('appid:',appId)
            //    await  module.exports.updateCustApp(appId,custId,custName,true);
            //         //need to update appaccess
            //     }
            //     else if(appId!==custRegApp.appId&&!custRegApp.applicationAccess){
            //         console.log('update access false')
            //         await  module.exports.updateCustApp(appId,custId,custName,false);
            //     }
            //     else if(appId!==custRegApp.appId)
            //     {
            //         console.log('insert access true')
            //     const custAppId = await autoSeq.getSequenceValue('custApplication');
            //      await module.exports.saveCustApp(appId,custId,custName,custAppId);
            //     }
               
            //}
        }
   

   
    },
    updateCustApp:(appId,custId,custName,appAccess)=>{
        console.log('custid',custId)
        return new Promise((resolve,reject)=>{

          CustApps.updateOne({"appId":appId,"custId":custId},{applicationAccess:appAccess,modifiedBy:custName,modifiedDate:new Date()},(err,response)=>
          {
              if(err)
              {
                  console.log(err);
              }
              else
              {
                  return resolve(response);
              }
          }) 
        })

    },
    saveCustApp:(appId,custId,custName,custAppId)=>{
        return new Promise((resolve,reject)=>{
           
            const custApp = new CustApps({
                _id: custAppId,
                custId: custId,
                appId: appId,
                applicationAccess: true,
                createdDate: new Date(),
                createdBy: custName
            })
            custApp.save((err,res)=>{
                if(err)
                {

                }
                else
                {
                    return resolve(res);
                }
            })
        
        })

    },
    fetchCustRegApps: (custId) => {
        return new Promise((resolve, reject) => {
            CustApps.find({ custId: custId }, { appId: 1, applicationAccess: 1, _id: 0 }, (err, custApps) => {
                if (err) { }
                else {
                  
                    return resolve(custApps);
                }
            })
        })
    },
}