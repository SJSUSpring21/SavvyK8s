const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var custAppsSchema = new Schema({
    _id: {type: Number, required: true},
    custId: {type: Number,  ref: 'customers',required: true},
    appId:{type:Number,ref:'applications',required:true},
    applicationAccess:{type:Boolean,required:true},
    createdBy: {type: String, required: true},
    createdDate: {type: Date, required: true},
    modifiedBy: {type: String, required: false},
    modifiedDate:{type: Date, required: false},
},
{
    versionKey: false
  
});

const custAppsModel = mongoose.model('custApplications', custAppsSchema);
module.exports = custAppsModel;