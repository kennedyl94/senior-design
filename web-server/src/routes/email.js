var express = require('express')
    , router = express.Router();
var nodemailer = require('nodemailer');
//var xoauth2 = require('xoauth2');

var domain = require('../../config.json').domain;

router.post('/', function (req, res) {
    sendResults(req.body.address, req.body.result);
    res.sendStatus(200);
});

router.post('/proposeChange', function(req, res) {
    proposeChangeEmail(req.body.result);
    res.sendStatus(200);
});

router.post('/sendReset', function(req, res) {
  var token = req.body.token;
  var address = req.body.email;
  if(token){
    sendReset(token, address);
  }
  res.send(200);
});

function proposeChangeEmail(org) {
    var builtString = "The following changes have been requested:\r\n\r\n";
    builtString = builtString.concat('Org Name:\r\n    ' + org.name + '\r\n');
    builtString = builtString.concat('Description:\r\n    ' + org.description + '\r\n');
    builtString = builtString.concat('Tags:\r\n    ' + org.tags + '\r\n');
    builtString = builtString.concat('Social Media Links:\r\n    ' + org.links + '\r\n');
    builtString = builtString.concat('Meeting Times:\r\n    ' + org.meetings + '\r\n');
    builtString = builtString.concat('Main Contact Name:\r\n    ' + org.contact.name + '\r\n');
    builtString = builtString.concat('Main Contact Email:\r\n    ' + org.contact.email + '\r\n');
    builtString = builtString.concat('Main Contact Phone:\r\n    ' + org.contact.phone + '\r\n');

    var subject = '[OrgMatcher] Change requested for: ' + org.name;

    var transporter = nodemailer.createTransport(
        'smtps://msoeSeniorDesignTeam8@gmail.com:duckduckgoose42@smtp.gmail.com'
    );

    var mailOptions = {
        from: 'OrganizationMatcher<donotreplay@msoe.edu>',
        to: 'msoeSeniorDesignTeam8@gmail.com',
        subject: subject,
        text: builtString
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
}


//'https://accounts.google.com/o/oauth2/token'
function sendResults(address, orgs) {
    /*var xoauth2gen = xoauth2.createXOAuth2Generator({
        user: 'msoeSeniorDesignTeam8gmail.com',
        clientId: '183822154949-gt1d1k48505g4putjhilho73erirhqua.apps.googleusercontent.com',
        clientSecret: '1ciNaaVye49QjbyA08xNvwKV',
        refreshToken: '{refresh-token}'
    });

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {xoauth2: xoauth2gen}
    });*/

    var builtString = 'The results of your survey:\r\n\r\n';

    for (var i = 0; i < orgs.length; i++) {
        builtString = builtString.concat('\u2022' + orgs[i].name + '\r\n');
    };

    var transporter = nodemailer.createTransport(
        'smtps://msoeSeniorDesignTeam8@gmail.com:duckduckgoose42@smtp.gmail.com'
    );

    var mailOptions = {
        from: 'Do Not Reply <donotreplay@msoe.edu>',
        to: address,
        subject: 'Survey Results',
        text: builtString
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
}

function sendReset(token, address){
  var builtString =
    'This email has been sent because a password reset was requested for your account.' +
    ' To reset your password, please click on the link below, or paste it into your web browser'+
    '\n\n' + domain + 'resetPassword/' + token +
    '\n\nIf you did not request the password reset, please disregard this email.';

  var subject = '[OrgMatcher] Password reset';

  var transporter = nodemailer.createTransport(
      'smtps://msoeSeniorDesignTeam8@gmail.com:duckduckgoose42@smtp.gmail.com'
  );

  var mailOptions = {
      from: 'OrganizationMatcher<donotreplay@msoe.edu>',
      to: address,
      subject: subject,
      text: builtString
  };

  transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
          return console.log(error);
      }
  });
}

module.exports = router;
