var express = require('express');
var router = express.Router();
const Post = require('../models/postcontactusMdl').Post;
var custId = 0;

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

/* GET all posts listing. */
router.get('/contactmessages', function (req, res, next) {
    Post.find((err, posts) => {
        res.render('showallmessages', { messageList: posts });
    });
});





/* GET users listing. */
router.get('/addConatctusmessage', function (req, res, next) {
    const firstName = req.query.user;
    res.send('<b><center>Thank you ' + firstName + ', your message is recorded. We will get back to you soon!<br><a href="/">Home</a></center></b>');
});

// // Show the create form
// router.get('/create', function (req, res, next) {
//   res.render('post-create');
// });

// Show the user contactus form
router.get('/createcontact', function (req, res, next) {
    res.render('contactus', {
        title: "ContactUs",
        imgPath: "/img/Logo.jpg"
    });
});


var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb://localhost:27017/travelexperts";
var url = "mongodb+srv://Sujani:Sujani123@cluster0.4annu.mongodb.net/travelexperts?retryWrites=true&w=majority";


// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("travelexperts");
//     //Sort the result by name:
//     var sort = { _id: -1 };
//     //var mysort = { name: -1 };
//     dbo.collection("contactus").find().limit(1).sort(sort).toArray(function (err, result) {
//         if (err) throw err;
//         custId = result[0]._id;

//         // db.close();
//     });
// });

// To create a new post
router.post('/createmessage', function (req, res, next) {
    // const post = new Post(req.body);
    //console.log("inside form submit" + req.body);
    //Find the maxid
    Post.find()
        .sort({ _id: -1 })
        .limit(1)
        .then(Post => {
            console.log(Post[0]._id);
            custId = Post[0]._id;
        });

    const post = new Post();
    custId = custId + 1;
    post._id = custId;
    post.CustomerId = custId.toString();
    post.CustFirstName = req.body.firstname;
    post.CustLastName = req.body.lastname;
    post.CustEmail = req.body.email;
    post.CustMessage = req.body.message;

    post.save(err => {
        // if(err) throw err;
        if (err) {
            const errorArray = [];
            const errorKeys = Object.keys(err.errors);
            errorKeys.forEach(key => errorArray.push(err.errors[key].message));
            return res.render("contactus", {
                errors: errorArray
            });
        }
        res.redirect("/contact/addConatctusmessage?user=" + req.body.firstname);
    });


    // post.save(err => {
    //     // if(err) throw err;
    //     if (err) {
    //         console.log("Error***" + err);
    //         const errorArray = [];
    //         const errorKeys = Object.keys(err.errors);
    //         errorKeys.forEach(key => errorArray.push(err.errors[key].message));
    //         return res.render("contactus", {
    //             errors: errorArray
    //         });
    //     }
    //     res.redirect("/contact/addConatctusmessage?user=" + req.body.firstname);
    // });
});


module.exports = router;
