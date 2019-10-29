//jshint esversion:6
//
//  SERVER SIDE
//
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const nodemailer = require('nodemailer');

const app = express();

// View engine setup
app.set('view engine', 'ejs');

// Body Parser Middleware
app.use(bodyParser.urlencoded({
  extended: true
}));

// Static Folder
app.use(express.static("public"));

// Mongoose Connection
mongoose.connect('mongodb://localhost3000', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});


//TODO

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GOOGLE_EMAIL,
          pass: process.env.GOOGLE_EMAIL_PASS
        }
    });

    let mailOptions = {
      from: 'jantsenderoest@gmail.com',
      to: 'deroest6@gmail.com',
      subject: 'Testing and testing',
      text: 'IT works'
    };

    transporter.sendMail(mailOptions, function(err, data) {
      if(err) {
        console.log('Error Occured: ' + err);
      } else {
        console.log('Email Sent');
      }
    });


//
// Interactive Javascript
//


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
