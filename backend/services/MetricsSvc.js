const metrics = require("../Models/CustAppMetricsModel")
const moment=require("moment");

module.exports = {

    fetchMetricsData: async (metricsDataReq) => {

        let metricsDataList=[];
        const custId = metricsDataReq.custId;
        const appId = metricsDataReq.appId;
        const podId=metricsDataReq.podId;
        const nodeMetrics = metricsDataReq.nodeMetrics;
       const metricsData= await  module.exports.fetchMetricsFromDB(custId, appId, podId,nodeMetrics)
       if(metricsData.length>0)
       {
           for(const metric of metricsData)
           {
               console.log("metric:",metric)
           
             const metricTime=moment(metric.createdDate).format("hh:mm")
             let metricRes={
                 name:metricTime,
                 memory:metric.metrics.memory,
                 cpu:metric.metrics.cpu
             }
             console.log(metricRes)
             metricsDataList.push(metricRes);
           }

           return metricsDataList;
       }
    },
    fetchMetricsFromDB: (custId, appId,podId, nodeMetrics) => {

        return new Promise((resolve, reject) => {
            if (!nodeMetrics) {
                metrics.find({ custId: custId, appId: appId,podId:podId, nodeMetrics: false }).exec((err, res) => {
                    if (err) {

                    }
                    else {
                        return resolve(res);
                    }
                })
            }
            else {
                metrics.find({ custId: custId, nodeMetrics: true }, (err, res) => {
                    if (err) {

                    }
                    else {
                        return resolve(res);
                    }
                })
            }
        })
    }
}