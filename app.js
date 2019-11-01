//jshint esversion:8
//
//  SERVER SIDE
//
require('dotenv').config();

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

// View Engine Setup
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
async function main() {

  const oauth2Client = new OAuth2(
    process.env.ID, // ClientID
    process.env.SECRET, // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
  );

  const accessToken = oauth2Client.getAccessToken();
  const tokens = await oauth2Client.refreshAccessToken();

  oauth2Client.setCredentials({
    refresh_token: "1//04ay_JRpVDhjeCgYIARAAGAQSNwF-L9IrjuVYwIhOE0q2s9mNjYdWlW_e29gysMC1lDfmG6_MdmW1LngH2nmkI4fX6WMLdHNiUnU"
  });

  // const accessToken = tokens.credentials.access_token;
  oauth2Client.getAccessToken();
  console.log(accessToken);

  const smtpTransport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
      type: 'OAuth2',
      user: process.env.USER,
      clientId: process.env.ID,
      clientSecret: process.env.SECRET,
      refreshToken: "1//04ay_JRpVDhjeCgYIARAAGAQSNwF-L9IrjuVYwIhOE0q2s9mNjYdWlW_e29gysMC1lDfmG6_MdmW1LngH2nmkI4fX6WMLdHNiUnU",
      access_Token: accessToken
    }
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

}
main().catch(console.error);
//
// Interactive Javascript
//


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
