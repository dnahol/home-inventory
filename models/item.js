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

exports.create = function(item, cb) {
  if(!item.description || !item.category || !item.price || !item.room) {
    return cb('You need a description, category, price, and room.');
  }
  db.query('INSERT INTO items (description, category, price, room) VALUES (?)',
  [[item.description, item.category, Number(item.price), Number(item.room)]], cb);
};

exports.delete = function(item, cb) {
  if(!item.id) {
    return cb('You need an id.');
  }
  db.query('DELETE FROM items WHERE id = ?', item.id, cb);
};

exports.update = function(itemId, item, cb) {
  console.log( 'itemId.id: ', itemId.id );
  console.log('item.description: ', item.description );
  console.log('item.category: ', item.category);
  console.log('item.price: ', item.price );
  console.log('item.room: ', item.room);
  if(!itemId.id || !item.description || !item.category || !item.price || !item.room) {
    return cb('You need an id, description, category, price, and room.');
  }
  db.query(`UPDATE items SET description=?, category=?, price=?, room=? WHERE id = ?`,
      [item.description, item.category, Number(item.price), Number(item.room), Number(itemId.id)], cb);
};
