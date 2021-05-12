const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var podsConfigSchema = new Schema({
    _id: {type: Number, required: true},
    podName: {type: String, required: true},
    createdBy: {type: String, required: true},
    createdDate: {type: Date, required: true},
    modifiedBy: {type: String, required: false},
    modifiedDate:{type: Date, required: false},
},
{
    versionKey: false,
    collection:'podsConfig'
  
});

const podsConfigModel = mongoose.model('podsConfig', podsConfigSchema,'podsConfig');
module.exports = podsConfigModel;