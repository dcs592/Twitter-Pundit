
/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var Twit = require('twit')
var T = new Twit({
    consumer_key:         'nAhDicTjMyP3fjY2z5JfxSS1o'
  , consumer_secret:      'V5zsL7UGWYSEfB6SaF9SrAmwlwV0snDSJyavmITcOcBTHMXis1'
  , access_token:         '2436260611-zxrHNxKQJsOeUOxFBrURzX3G1K04jfA954h8dED'
  , access_token_secret:  'txHfvdia6fQ7W0qkHuLJ57niYUOXcWAwfiQHCcs6rza6P'
});


T.get('users/suggestions/:slug', { slug: 'nba' }, function (err, reply) {
  //  ...
  console.log(reply);
});

var ctr=1;
var stream = T.stream('statuses/filter', { track: ['obama, biden'], language: 'en' })
stream.on('tweet', function (tweet) {
  console.log(ctr+" ) "+ tweet.user['name']+"\n"+tweet.user['description']);
console.log(tweet.text+"\n");
ctr++;
  //...
});
/**

 * Module dependencies.
 */


var app = express();
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
 if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
}

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);


app.listen(3000);
