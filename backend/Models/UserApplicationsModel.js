const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userAppsSchema = new Schema({
    _id: {type: Number, required: true},
    custId: {type: Number,  ref: 'customers',required: true},
    appId:{type:Number,ref:'applications',required:true},
    applicationAccess:{type:Boolean,required:true},
    metricId:{type:Number,ref:'metricTypes',required:true},
    metricAccess:{type:Boolean,required:true},
    createdBy: {type: String, required: true},
    createdDate: {type: Date, required: true},
    modifiedBy: {type: String, required: false},
    modifiedDate:{type: Date, required: false},
},
{
    versionKey: false
  
});

const userAppsModel = mongoose.model('userApplications', userAppsSchema);
module.exports = userAppsModel;