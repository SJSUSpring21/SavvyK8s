const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var appPodsConfigSchema = new Schema({
    _id: {type: Number, required: true},
    podId: {type: Number, ref: 'podsConfig', required: true},
    appId:{type: Number,  ref: 'applications',required: true},
    createdBy: {type: String, required: true},
    createdDate: {type: Date, required: true},
    modifiedBy: {type: String, required: false},
    modifiedDate:{type: Date, required: false},
},
{
    versionKey: false,
    collection:'appPodsConfig'
  
});

const appPodsConfigModel = mongoose.model('appPodsConfig', appPodsConfigSchema,'appPodsConfig');
module.exports = appPodsConfigModel;