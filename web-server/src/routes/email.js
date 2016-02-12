var express = require('express')
    , router = express.Router();
var nodemailer = require('nodemailer');
//var xoauth2 = require('xoauth2');

router.post('/', function (req, res) {
    sendResults(req.body.address, req.body.result);
    res.sendStatus(200);
});

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

module.exports = router;