const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var custAppMetricsSchema = new Schema({
    _id: {type: Number, required: true},
    //custId: {type: Number,  ref: 'customers',required: true},
    appId:{type: Number,  ref: 'userApplications',required: true},
    podId:{type:Number,ref:'podsConfig',required:true},
    // metricsTypeId:{type: Number, ref: 'metricsType',required: true},
    metrics:{type:Object,required:false},
    nodeMetrics:{type:Boolean,required:true},
    createdBy: {type: String, required: true},
    createdDate: {type: Date, required: true},
    modifiedBy: {type: String, required: false},
    modifiedDate:{type: Date, required: false},
},
{
    versionKey: false
  
});

const custAppMetricsModel = mongoose.model('custAppMetrics', custAppMetricsSchema,'custAppMetrics');
module.exports = custAppMetricsModel;