const apps = require('../Models/ApplicationsModel');
const metricTypes = require('../Models/MetricsTypeModel');
const CustApps = require('../Models/CustApplicationsModel');
const AppPodsConfig = require('../Models/AppPodsConfigModel');
const PodsConfig = require('../Models/PodsConfigModel');
const autoSeq=require('../controller/AutoSeq.controller');
module.exports={
    fetchRegistrationDtls:async ()=>{

        const appDtls=await module.exports.fetchApps();
        const metricTypeDtls=await module.exports.fetchMetricTypes();
        let appRegDtls={
            appDtls:appDtls,
            metricTypeDtls:metricTypeDtls
        }
        return appRegDtls;
    },

    fetchApps:()=>{

        return new Promise((resolve,reject)=>{
        apps.find({},(err,appsData)=>{
            if(err){
                console.log(err);
            }
            else{
                return resolve(appsData);
            }
        })
    })
    },
    fetchMetricTypes:()=>{

        return new Promise((resolve,reject)=>{
            metricTypes.find({},(err,metricTypesData)=>{
            if(err){
                console.log(err);
            }
            else{
                return resolve(metricTypesData);
            }
        })
    })
    },
    custAppRegDtls:async(custAppRegReq)=>{

        console.log('custAppRegReq',custAppRegReq)
        let custAppsList=[];
        for(const appId of custAppRegReq.appId){
            const custAppId=await autoSeq.getSequenceValue('custApplication'); 
            const custApp=new CustApps({
                _id:custAppId,
                custId:custAppRegReq.custDetails.custId,
                appId:appId,
                applicationAccess:true,
                createdDate:new Date(),
                createdBy:custAppRegReq.custDetails.custName
        })
        custAppsList.push(custApp);
       }
       console.log('custAppsList',custAppsList)
       const response=await module.exports.saveCustAppDtls(custAppsList) 
  return response;
    
    },
    saveCustAppDtls:(custAppsList)=>{
        return new Promise((resolve,reject)=>{
            CustApps.insertMany(custAppsList,(error, data) => {
                if(error){
        
                }
                else{
                    return resolve("Success");
                }
            })
        })
    },
    fetchCustAppPodDtls:async(customerId)=>{
        console.log('customerid:',customerId)
        const custId=Number(customerId);
    const custRegAppRes=     await  module.exports.fetchCustRegAppId(custId)
   
    console.log(custRegAppRes)
    if(custRegAppRes.length>0){

     const appIds=   custRegAppRes.map(custApp=>custApp.appId );
   const appPodsRes=  await module.exports.fetchAppPodDtls(appIds);
let appPodList=[];

   if(appPodsRes.length>0){
       for(const appId of appIds){
       const filteredAppPods=    appPodsRes.filter(appPod=>appPod.appId._id===appId)
       if(filteredAppPods.length>0)
       for(const appPod of filteredAppPods){
       
        if(appPodList.length>0){
       const appPodIndex=  appPodList.findIndex(apppod=>apppod.appId===appId);
       if(appPodIndex>-1)
       {
        const pod={
            podId:appPod.podId._id,
            podName:appPod.podId.podName
       }
       appPodList[appPodIndex].pods.push(pod);
       console.log('appPodList',appPodList)
       }
       else{
        let pods=[];
        const pod={
            podId:appPod.podId._id,
            podName:appPod.podId.podName
       }
       pods.push(pod);
        const appPodData={
            appId:appPod.appId._id,
            appName:appPod.appId.applicationName,
            pods:pods
                }
        appPodList.push(appPodData)
       }
        }
        else{
            let pods=[];
            const pod={
                podId:appPod.podId._id,
                podName:appPod.podId.podName
           }
           pods.push(pod);
            const appPodData={
                appId:appPod.appId._id,
                appName:appPod.appId.applicationName,
                pods:pods
                    }
            appPodList.push(appPodData)
        }
       
       }
    }
    return appPodList;
   }
  
    }
    else
    {
        return null;
    }

    },
    fetchCustRegAppId:(custId)=>{
        return new Promise((resolve,reject)=>{
            CustApps.find({custId:custId},{appId:1,applicationAccess:1,_id:0},(err,custApps)=>{
                if(err){}
                else{
                    return resolve(custApps);
                }
            })
        })
    },
    fetchAppPodDtls:(appIds)=>{
        return new Promise((resolve,reject)=>{

            AppPodsConfig.find({"appId":{$in:appIds}}).populate("appId","applicationName").populate("podId","podName").exec((err,response)=>{
                if(err){
console.log(err);
                }
                else
                {
                    return resolve(response);
                }
            })
        })

    }
}