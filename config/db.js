'use strict';

var mysql = require('mysql');

var db = mysql.createConnection( process.env.JAWSDB_URL || {
  host    : 'localhost',
  user    : 'root',
  password: '978PoRsc',
  database: 'homedb',
  debug   :  true

});

db.connect(function(err) {
  if (err) throw err
  console.log('You are now connected to the database...');
});


module.exports = db;
