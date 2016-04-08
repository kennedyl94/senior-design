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
        console.log('First');
        ph.createPage().then(function(page) {
            console.log('Second');
            //page.set('paperSize', {
            //    format: 'A4'
            //}, function() {
                console.log('Third');
                page.setContent(content, 'http://orgmatcher.msoe.edu').then(function() {
                    console.log('Fourth');
                    page.render('tmp/results.pdf');
                    console.log('Fifth');
                    ph.exit();
                    console.log('Sixth');
                    //var options = {
                    //    dotfiles: 'deny',
                    //    headers: {
                    //        'x-timestamp': Date.now(),
                    //        'x-sent': true
                    //    }
                    //};
                    //console.log(path.resolve('tmp/results.pdf'));
                    res.set('Content-Type', 'application/pdf');
                    res.download(path.resolve('tmp/results.pdf'), 'results.pdf', function(err) {
                        if (err) {console.log(err);}
                        else {
                            console.log('Last');
                            //res.end();
                        }
                    });

                    //res.sendFile(path.resolve('tmp/results.pdf'), {}, function(err) {
                    //    if (err) {console.log(err);}
                    //    else {
                    //
                    //        //res.end();
                    //    }
                    //});
                });
            //});
        });
    });
});

module.exports = router;