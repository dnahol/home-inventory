'use strict';

var db = require('../config/db');


db.query(`CREATE TABLE IF NOT EXISTS items (
          id INTEGER PRIMARY KEY AUTO_INCREMENT,
          description TEXT,
          category TEXT,
          price NUMERIC,
          room INTEGER
        )`);

exports.get = function(cb) {
  db.query('SELECT * FROM items', cb);
};

exports.create = function(body, cb) {
  if(!body.description || !body.category || !body.price || !body.room) {
    return cb('You need a description, category, price, and room.');
  }
  db.query('INSERT INTO items (description, category, price, room) VALUES (?)',
  [[body.description, body.category, Number(body.price), Number(body.room)]], function(err, result) {
    if(err) return cb(err);

    db.query('SELECT * FROM items WHERE id = ?', result.insertId, cb);
  });
};

exports.getById = function(itemId, cb) {
  if(!itemId) {
    return cb('You need an id.');
  }
  db.query('SELECT * FROM items WHERE id = ?', itemId, cb);
};


exports.delete = function(item, cb) {
  if(!item.id) {
    return cb('You need an id.');
  }
  db.query('DELETE FROM items WHERE id = ?', item.id, cb);
};

exports.update = function(itemId, body, cb) {

  if(!itemId || !body.description || !body.category || !body.price || !body.room) {
    return cb('You need an id, description, category, price, and room.');
  }
  db.query(`UPDATE items SET description=?, category=?, price=?, room=? WHERE id = ?`,
      [body.description, body.category, Number(body.price), Number(body.room), Number(itemId)], cb);
};

exports.total = function(cb) {

  db.query('SELECT sum(price) AS grandTotal FROM items', cb);

}

exports.catTotals = function(cb) {

  db.query('SELECT category, sum(price) AS total FROM items GROUP BY category', cb);

};
