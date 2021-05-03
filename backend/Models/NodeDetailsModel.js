const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var nodeDetailsSchema = new Schema({
    _id: {type: Number, required: true},
    nodeName: {type: String, required: true},
    createdBy: {type: String, required: true},
    createdDate: {type: Date, required: true}
    
},
{
    versionKey: false,
  collection:"nodeDetails"
});

const nodeDetailsModel = mongoose.model('nodeDetails', nodeDetailsSchema,"nodeDetails");
module.exports = nodeDetailsModel;