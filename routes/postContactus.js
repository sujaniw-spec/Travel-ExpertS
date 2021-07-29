/*
Author: Sujani Wijesunder
Date:28/07/20201
 */

var express = require('express');
var router = express.Router();
const Post = require('../models/postcontactusMdl').Post;
var custId = 0; // to add a unique id to DB when message added to the DB


/* Display all custmer message . */
router.get('/contactmessages', function (req, res, next) {
    Post.find((err, posts) => {
        res.render('showallmessages', { messageList: posts });
    });
});


//when user click the first name render this page
router.get('/mycustdetails/:firstname', function (req, res, next) {
    var custname = req.params.firstname;
    Post.find({ CustFirstName: custname }, function (err, result) {
        if (err) {
            console.log(err);
        } else {

            res.render('contactuser', { custName: custname, title: 'usermessage', myCustomers: result });
        }
    });
});


/* GET Thank you message. */
router.get('/addConatctusmessage', function (req, res, next) {
    const firstName = req.query.user;
    res.send('<br><br><b><center>Thank you <font style=color:blue;>' + firstName + '</font>, your message is recorded. We will get back to you soon!<br><br><a href="/">Home</a></center></b>');
});

// Show the contactus form to submit a message
router.get('/createcontact', function (req, res, next) {
    //find the maximum id and add one to it, to create a new unique id
    Post.find()
        .sort({ _id: -1 })
        .limit(1)
        .then(Post => {
            custId = Post[0]._id;
            custId = custId + 1;
        });

    res.render('contactus', {
        title: "ContactUs",
        pnfound: "Page404.html",
        imgPath: "/img/Logo.jpg"
    });
});


// To create a new message and send DB
router.post('/createmessage', function (req, res, next) {

    const post = new Post();
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
                errors: errorArray,
                postdata: req.body // send back data to the form
            });
        }
        res.redirect("/contact/addConatctusmessage?user=" + req.body.firstname);
    });

});


module.exports = router;
