// Require the mongoose module
var mongoose = require('mongoose');
const { init } = require('../app');
// Set up a mongoose connection

//var Schema = mongoose.Schema;

//Local host 
//var mongoDB = 'mongodb://localhost:27017/travelexperts';

var mongoDB = "mongodb+srv://Sujani:Sujani123@cluster0.4annu.mongodb.net/travelexperts?retryWrites=true&w=majority";

//Mostafa's connection to cluster db
//var mongoDB = "mongodb+srv://mongo_user:ss123@cluster0.tuddo.mongodb.net/blog?retryWrites=true&w=majority";

//my connection cluster db
//var mongoDB = "mongodb+srv://Ilup75:Ilup75@cluster0.zigid.mongodb.net/blog?retryWrites=true&w=majority";

//Travelexperts
//var mongoDB = "mongodb+srv://Ilup75:Ilup75@cluster0.zigid.mongodb.net/travelexperts?retryWrites=true&w=majority";

//old way to get connection
//mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
//new way from .env
mongoose.connect(process.env.MONGO_URL || mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Get the connection
var db = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function () {
    console.log("we're connected!")
});

const uniqueValidator = require("mongoose-unique-validator");
const postSchemaContact = new mongoose.Schema({

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
        trim: true
    },
    CustMessage: {
        type: String,
        required: "Please enter the message",
        trim: true,
        validate: {
            validator: function (v) {
                return v.length > 5;
            },
            message: props => `Message is too short.`
        }
    },


});

postSchemaContact.plugin(uniqueValidator);
module.exports.Post = mongoose.model('contactus', postSchemaContact);
