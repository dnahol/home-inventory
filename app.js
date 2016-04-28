'use strict';

const PORT = process.env.PORT || 3000;

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var Item = require('./models/item');

var app = express();
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.use('/api', require('./routes/api'));

app.get('/', (req, res, next) => {
  res.render('home', {text: 'stuff'});
});

app.use((req, res, next) => {
  res.status(404).send('Not found.');
});

app.listen(PORT, err => {
  console.log(err || `Server listening on port ${PORT}`);
});
