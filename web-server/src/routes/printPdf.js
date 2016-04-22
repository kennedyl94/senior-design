var express = require('express'),
    router = express.Router(),
    phantom = require('phantom'),
    path = require('path');

router.post('/', function(req, res) {
    var orgs = req.body.result;
    var content = '<html><body><h1>Results of your survey:</h1><br/><ul>';
    for (var i = 0; i < orgs.length; i++) {
        content = content.concat('<li>' + orgs[i].name + '</li>');
    }
    content = content.concat('</ul></body></html>');

    phantom.create().then(function(ph) {
        ph.createPage().then(function(page) {
            //page.set('paperSize', {
            //    format: 'A4'
            //}, function() {
                page.setContent(content, 'http://orgmatcher.msoe.edu').then(function() {
                    //page.render('../angular-client/content/tmp/results.pdf').then(function() {
                    page.render('tmp/results.pdf');
                        //.then(function() {
                        //res.download(path.resolve('tmp/results.pdf'));

                    //});
                    ph.exit();
                    //var options = {
                    //    dotfiles: 'deny',
                    //    headers: {
                    //        'x-timestamp': Date.now(),
                    //        'x-sent': true
                    //    }
                    //};
                    //console.log(path.resolve('../angular-client/content/tmp/results.pdf'));
                    //res.set('Content-Type', 'application/pdf');
                    //res.download(path.resolve('tmp/results.pdf'), 'results.pdf', function(err) {
                    //    if (err) {console.log(err);}
                    //    else {
                    //        console.log('complete');
                    //    }
                    //});

                    //res.sendFile(path.resolve('tmp/results.pdf'), options, function(err) {
                    //    if (err) {console.log(err);}
                    //    else {
                    //        console.log('complete');
                    //    }
                    //});

                    res.send(path.resolve('tmp/results.pdf'));
                });
            //});
        });
    });
});

module.exports = router;