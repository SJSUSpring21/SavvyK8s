const Customer = require('../Models/CustomerModel');
module.exports = {

    updateCustDtls: async (custDetails) => {
        return new Promise((resolve, reject) => {

            console.log('custDetails:',custDetails)
            Customer.findByIdAndUpdate(custDetails.custId, {
                custPhoneNumber: custDetails.custPhoneNumber
                , custName: custDetails.custName, countryCodeId: custDetails.countryCode
            }, { new: true },
                function (err, updatedCustomer) {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        console.log("Updated User : ", updatedCustomer);
                        return resolve(updatedCustomer)
                    }
                })
        })
    }
}