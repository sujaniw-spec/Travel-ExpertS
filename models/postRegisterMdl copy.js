// Require the mongoose module

//This a backupfile
var mongoose = require('mongoose');
const { init } = require('../app');

var lengthValidator = function (val) {
    if (val && val.length >= 5) {
        return true;
    }
    return false;
};

const postSchema = new mongoose.Schema({

    _id: {
        type: Number,
        required: true,
        trim: true
    },
    CustomerId: {
        type: String,
        required: true,
        trim: true
    },
    CustFirstName: {
        type: String,
        required: "Please enter the firstName.",
        trim: true
    },
    CustLastName: {
        type: String,
        required: "Please enter the firstName.",
        trim: true
    },
    CustEmail: {
        type: String,
        required: "Please enter the email.",
        trim: true,
        unique: true

    },
    CustAddress: {
        type: String,
        required: "Please enter the address",
        trim: true
    },
    CustCity: {
        type: String,
        required: false,
        trim: true
    },
    CustProv: {
        type: String,
        required: false,
        trim: true
    },
    CustCountry: {
        type: String,
        required: false,
        trim: true
    },
    CustPostal: {
        type: String,
        required: false,
        trim: true
    },
    CustHomePhone: {
        type: String,
        required: false,
        trim: true
    },
    CustHomePhone: {
        type: String,
        required: false,
        trim: true
    },
    CustBusPhone: {
        type: String,
        required: false,
        trim: true
    },


});

/**
 * Validates unique email
 */
postSchema.path('CustEmail').validate(async (CustEmail) => {
    const emailCount = await mongoose.models.customers.countDocuments({ CustEmail })
    return !emailCount
}, "Your Email address already exists. Please Login")



module.exports.Post = mongoose.model('customers', postSchema);
