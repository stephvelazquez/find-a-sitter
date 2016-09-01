var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = require('./router/router.js');
var db = require('./db/db.js');

app.use(bodyParser.json());

app.use(express.static('./'));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'x-access-tokens, COntent-Type, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version, X-File-Name');
  next();
});

app.set('port', process.env.PORT || 8080);

app.use('/api', router);
app.use(function(req, res) {
  res.status(404).send('404 Page not found');
});

app.listen(app.get('port'), function() {
  console.log('Server listening on port ', app.get('port'));
});

module.exports = app;
