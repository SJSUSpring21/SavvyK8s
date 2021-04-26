const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var appsSchema = new Schema({
    _id: {type: Number, required: true},
    applicationName:{type: String, required: true},
    createdBy: {type: String, required: true},
    createdDate: {type: Date, required: true},
    modifiedBy: {type: String, required: false},
    modifiedDate:{type: Date, required: false},
},
{
    versionKey: false
  
});

const appsModel = mongoose.model('applications', appsSchema);
module.exports = appsModel;