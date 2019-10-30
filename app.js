//jshint esversion:6
//
//  SERVER SIDE
//
require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const nodemailer = require('nodemailer');
const {
  google
} = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const app = express();

// View engine setup
app.set('view engine', 'ejs');

// Body Parser Middleware
app.use(bodyParser.urlencoded({
  extended: true
}));

// Static Folder
app.use(express.static("public"));

// // Mongoose Connection
// mongoose.connect('mongodb://localhost3000', {useNewUrlParser: true});
//
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
// });


//TODO

// Mail App
const oauth2Client = new OAuth2(
  process.env.ID, // ClientID
  process.env.SECRET, // Client Secret
  "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token: "1//04qRmweTHWbiXCgYIARAAGAQSNwF-L9Ir354LD6arBXNeUXw6COVMdXrl5kqP07fv6sYq34m3WF5aBrbf_4sL3TbAiP6xQkbplMc"
});
const accessToken = oauth2Client.getAccessToken();

// create reusable transporter object using the default SMTP transport
const smtpTransport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  auth: {
    type: 'OAuth2', //service: - Guide Way
    user: process.env.USER,
    // pass: process.env.PASS,
    clientId: process.env.ID,
    clientSecret: process.env.SECRET,
    refreshToken: "ya29.ImCpB005ZM1U2Tne6GmIgUMczXWw3aS0rIuhQk25pF1fa9zhj_bRPShxUhmBUpLDP8gItynSShZh8Oi6vRPAYV4XSIuBmtzRQOkfTSFGMCdNBJgge7385cdDRyPFMQPJg6M",
    access_Token: accessToken //accessToken: - Guide Way
  },

});

const mailOptions = {
  from: process.env.USER,
  to: 'deroest6@gmail.com',
  subject: "Node.js Email with Secure OAuth",
  generateTextFromHTML: true,
  html: "<b>test</b>"
};

// transporter.sendMail(mailOptions, function(err, data) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('Email Sent');
//   }
// });

// Send Email - The Guides way
smtpTransport.sendMail(mailOptions, (error, response) => {
     error ? console.log(error) : console.log(response);
     smtpTransport.close();
});

//
// Interactive Javascript
//


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
