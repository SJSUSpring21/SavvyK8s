const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var metricsTypeSchema = new Schema({
    _id: {type: Number, required: true},
    metricName: {type: String, required: true},
    metricEnabled:{type: Boolean, required: true},
    createdBy: {type: String, required: true},
    createdDate: {type: Date, required: true},
    modifiedBy: {type: String, required: false},
    modifiedDate:{type: Date, required: false},
},
{
    versionKey: false,
    collection:'metricsType'
});

const metricsTypeModel = mongoose.model('metricsType', metricsTypeSchema);
module.exports = metricsTypeModel;