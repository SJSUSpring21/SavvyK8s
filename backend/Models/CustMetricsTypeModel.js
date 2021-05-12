const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var custMetricsTypeSchema = new Schema({
    _id: {type: Number, required: true},
    custId: {type: Number,  ref: 'customers',required: true},
    metricName: {type: String, required: true},
    metricEnabled:{type: Boolean, required: true},
    createdBy: {type: String, required: true},
    createdDate: {type: Date, required: true},
    modifiedBy: {type: String, required: false},
    modifiedDate:{type: Date, required: false},
},
{
    versionKey: false
  
});

const custMetricsTypeModel = mongoose.model('custMetricsType', custMetricsTypeSchema);
module.exports = custMetricsTypeModel;