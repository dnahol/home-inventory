'use strict';

var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {

  res.send('all the rooms\n');

});

module.exports = router;
