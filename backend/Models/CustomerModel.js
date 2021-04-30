const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var customerSchema = new Schema({
    _id: {type: Number, required: true},
    custName: {type: String, required: true},
    custEmail: {type: String,unique:true, required: true},
    custPasswd: {type: String, required: true},
    custPhoneNumber: {type: String, required: false},
    countryCodeId:{type:Number,required:true},
    createdBy: {type: String, required: true},
    createdDate: {type: Date, required: true},
    modifiedBy: {type: String, required: false},
    modifiedDate:{type: Date, required: false},
    image:{type:String,required:false},
    token:{type: String, required: false}

},
{
    versionKey: false
  
});

const customerModel = mongoose.model('customer', customerSchema);
module.exports = customerModel;