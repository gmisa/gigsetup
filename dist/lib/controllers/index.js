'use strict';

var path = require('path');
var passport = require('passport')

/**
 * Send partial, or 404 if it doesn't exist
 */
exports.partials = function(req, res) {
  var stripped = req.url.split('.')[0];
  var requestedView = path.join('./', stripped);
  res.render(requestedView, function(err, html) {
    if(err) {
      res.send(404);
    } else {
      res.send(html);
    }
  });
};

exports.lifetime = function(req, res) {
    res.render('lifetime', {'name' : 'Sharmila'});
};


/**
 * Send our single page app
 */
exports.index = function(req, res) {
    var TwitterStrategy = require('passport-twitter').Strategy;

    passport.use(new TwitterStrategy({
            consumerKey: 'nbkysaP3Qxk0DbeXX5NKw',
            consumerSecret: 'aGZ2bYKpC8YHvmxhE23Ciz57KXITSpa9vdxZ8E65E',
            callbackURL: "http://localhost:9000/callback"
        },
        function(token, tokenSecret, profile, done) {
            User.findOrCreate('whats this', function(err, user) {
                if (err) { return done(err); }
                done(null, user);
            });
        }
    ));
  res.render('index', {'name' : 'Guillermo'});
};

