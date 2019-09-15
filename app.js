//jshint esversion:6
//
//  SERVER SIDE
//
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const mongodb = require('mongodb');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect('mongodb://localhost3000', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});
//TODO










//
// Interactive Javascript
//

//
// Contact Form Validator
//
// $(function() {
//
//
//   $("#contact-form").validator();
//
//   // when the form is submitted
//   $("#contact-form").on("submit", function(e) {
//     // if the validator does not prevent form submit
//     if (!e.isDefaultPrevented()) {
//       var url = "contact.php";
//
//
//       var messageAlert = "alert-success";
//       var messageText =
//         "Your message was sent, thank you. I will get back to you soon.";
//
//       // let's compose Bootstrap alert box HTML
//       var alertBox =
//         '<div class="alert ' +
//         messageAlert +
//         ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>' +
//         messageText +
//         "</div>";
//
//       // If we have messageAlert and messageText
//       if (messageAlert && messageText) {
//         // inject the alert to .messages div in our form
//         $("#contact-form").find(".messages").html(alertBox);
//         // empty the form
//         $("#contact-form")[0].reset();
//       }
//
//       return false;
//     }
//   });
// });




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
