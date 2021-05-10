const Customer = require('../Models/CustomerModel');
require('dotenv').config();
const AWS = require('aws-sdk');
module.exports = {

    updateCustDtls: async (updatedCustDtls) => {
        return new Promise((resolve, reject) => {
            const custDetails=JSON.parse(updatedCustDtls.profDtls)

            console.log('custDetails:',custDetails)
//==========================
if( updatedCustDtls.image!==undefined){
    var base64data1 = new Buffer(updatedCustDtls.image.buffer, 'binary');
     const base64data = updatedCustDtls.image.buffer.toString('base64');
     const s3 = new AWS.S3({
         accessKeyId: process.env.accessKey,
         secretAccessKey: process.env.secret
     });
     //const fileContent = fs.readFileSync(fileName);
     const params = {
         Bucket: 'splitwise-images-bharath',
         Key: 'splitwise/'+custDetails.custId+"_"+updatedCustDtls.image.originalname, // File name you want to save as in S3
         Body: base64data1
     };
     s3.upload(params, function (err, data) {
         //handle error
         if (err) {
           console.log("Error", err);
         }
         console.log('File uploaded successfully.',data.Location);
         Customer.findByIdAndUpdate(custDetails.custId, { custPhoneNumber:custDetails.custPhoneNumber,
             custName:custDetails.custName,countryCodeId: custDetails.countryCode,
         image:data.Location },{new: true},
         function (err, updatedCustomer) {
 if (err){
 console.log(err)
 }
 else{
 console.log("Updated User : ", updatedCustomer);
 return resolve(updatedCustomer)
 }
 });
     
 
 
 
 })
     }
     else
     {
         Customer.findByIdAndUpdate(custDetails.custId, { custPhoneNumber:custDetails.custPhoneNumber,
           custName:custDetails.custName,countryCodeId: custDetails.countryCode,
          },{new: true},
         function (err, updatedCustomer) {
 if (err){
 console.log(err)
 }
 else{
 console.log("Updated User : ", updatedCustomer);
 return resolve(updatedCustomer)
 }
     })
 }
//==========================



          
            // Customer.findByIdAndUpdate(custDetails.custId, {
            //     custPhoneNumber: custDetails.custPhoneNumber
            //     , custName: custDetails.custName, countryCodeId: custDetails.countryCode
            // }, { new: true },
            //     function (err, updatedCustomer) {
            //         if (err) {
            //             console.log(err)
            //         }
            //         else {
            //             console.log("Updated User : ", updatedCustomer);
            //             return resolve(updatedCustomer)
            //         }
            //     })
        })
    }
}