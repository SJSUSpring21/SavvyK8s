const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var alertsConfigSchema = new Schema({
    _id: {type: Number, required: true},
    custId: {type: Number,  ref: 'customers',required: true},
    appId:{type: Number,  ref: 'applications',required: true},
    emailAlert:{type:Boolean,required:true},
    msgAlert:{type:Boolean,required:true},
    createdBy: {type: String, required: true},
    createdDate: {type: Date, required: true},
    modifiedBy: {type: String, required: false},
    modifiedDate:{type: Date, required: false},
},
{
    versionKey: false
  
});

const alertsConfigModel = mongoose.model('alertsConfig', alertsConfigSchema);
module.exports = alertsConfigModel;