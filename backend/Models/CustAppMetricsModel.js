const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var custAppMetricsSchema = new Schema({

    //custId: {type: Number,  ref: 'customers',required: true},
    appId:{type: Number,  ref: 'userApplications',required: false},
    podId:{type:Number,ref:'podsConfig',required:false},
    // metricsTypeId:{type: Number, ref: 'metricsType',required: true},
    metrics:{type:Object,required:false},
    nodeMetrics:{type:Boolean,required:true},
    createdBy: {type: String, required: true},
    createdDate: {type: Date, required: false},
    modifiedBy: {type: String, required: false},
    modifiedDate:{type: Date, required: false},
},
{
    versionKey: false
  
});

const custAppMetricsModel = mongoose.model('custAppMetrics1', custAppMetricsSchema,'custAppMetrics1');
module.exports = custAppMetricsModel;