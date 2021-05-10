const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var custAppMetricsSchema = new Schema({

    //custId: {type: Number,  ref: 'customers',required: true},
    appId:{type: Number,  ref: 'userApplications',required: false},
    podId:{type:Number,ref:'podsConfig',required:false},
    // metricsTypeId:{type: Number, ref: 'metricsType',required: true},
    metrics:{type:Object,required:true},
    nodeId:{type:Number,required:false},
    nodeMetrics:{type:Boolean,required:true},
    createdBy: {type: String, required: true},
    createdDate: {type: String, required: true},
    modifiedBy: {type: String, required: false},
    modifiedDate:{type: Date, required: false},
},
{
    versionKey: false,
    colelction:'custAppMetrics2'
  
});

const custAppMetricsModel = mongoose.model('custAppMetrics2', custAppMetricsSchema,'custAppMetrics2');
module.exports = custAppMetricsModel;