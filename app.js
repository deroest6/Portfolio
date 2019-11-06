//jshint esversion:8
//
//  SERVER SIDE
//


const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const mongodb = require('mongodb');
// My Email Program
const nodemailer = require('nodemailer');
const {google} = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const app = express();

require('dotenv').config();

// View Engine Setup
app.set('view engine', 'ejs');

// Body Parser Middleware
app.use(bodyParser.urlencoded({
  extended: true
}));

// Static Folder
app.use(express.static("public"));

app.get('/send', function(req,res){
  res.sendFile(__dirname + '/send.html');
});

app.post("/", function(req, res) {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;

  console.log(firstName);
});

// My Mail App
async function main() {

  // Mail App
  const oauth2Client = new OAuth2(
    process.env.ID, // ClientID
    process.env.SECRET, // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
  );

  oauth2Client.setCredentials({
    refresh_token: "1//04ay_JRpVDhjeCgYIARAAGAQSNwF-L9IrjuVYwIhOE0q2s9mNjYdWlW_e29gysMC1lDfmG6_MdmW1LngH2nmkI4fX6WMLdHNiUnU"
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
      refreshToken: process.env.REFRESH_TOKEN,
      access_Token: accessToken //accessToken: - Guide Way
    },
  });

  const mailOptions = {
    from: process.env.USER,
    to: "deroest6@gmail.com",
    subject: "Yo Yo YO", // "Portfolio message sent from: " + req.body.firstName + " " + req.body.lastName
    generateTextFromHTML: true,
    html: "<b>Testing 123, testing 123</b>" //  "Email: " + req.body.email + ", <br>" + req.body.message
  };

  smtpTransport.sendMail(mailOptions, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log('Email Sent');
    }
    res.redirect("/");
  });

  // Send Email - The Guides way
  // smtpTransport.sendMail(mailOptions, (error, response) => {
  //      error ? console.log(error) : console.log(response);
  //      smtpTransport.close();
  // });

}
main().catch(console.error);

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
