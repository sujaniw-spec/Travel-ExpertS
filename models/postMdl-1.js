// Require the mongoose module
var mongoose = require('mongoose');
// Set up a mongoose connection

//Local host 
//var mongoDB = 'mongodb://localhost:27017/blog';

//Mostafa's connection to cluster db
//var mongoDB = "mongodb+srv://mongo_user:ss123@cluster0.tuddo.mongodb.net/blog?retryWrites=true&w=majority";

//my connection cluster db
//var mongoDB = "mongodb+srv://Ilup75:Ilup75@cluster0.zigid.mongodb.net/blog?retryWrites=true&w=majority";

//Travelexperts
var mongoDB = "mongodb+srv://Ilup75:Ilup75@cluster0.zigid.mongodb.net/travelexperts?retryWrites=true&w=majority";


mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
// Get the connection
var db = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function () {
    console.log("we're connected!@@@")
});

const postSchema = new mongoose.Schema({
    // posttitle: {
    //     type: String,
    //     required: "Please enter the post title.",
    //     trim: true
    // },
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



    // postbody: {
    //     type: String,
    //     required: "Please write your post body.",
    //     trim: true
    // },
    // posturl: {
    //     type: String,
    //     trim: true
    // },
    // more fields defined below
});

//module.exports.Post = mongoose.model('Post', postSchema);
module.exports.Post = mongoose.model('customers', postSchema);
