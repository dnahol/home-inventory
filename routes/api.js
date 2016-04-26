'use strict';

var express = require('express');
var router = express.Router();

// /api/rooms
// /api/items

router.use('/rooms', require('./rooms'));

router.use('/items', require('./items'));



module.exports = router;
