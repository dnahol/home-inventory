'use strict';

var db = require('../config/db');


db.query(`CREATE TABLE IF NOT EXISTS rooms (
          id INTEGER PRIMARY KEY AUTO_INCREMENT,
          description TEXT
        )`);

exports.get = function(cb) {
  db.query('SELECT * FROM rooms', cb);
};

exports.create = function(room, cb) {
  if(!room.description) {
    return cb('You need a room description');
  }
  db.query('INSERT INTO rooms (description) VALUES (?)',
  [[room.description]], cb);
};

exports.delete = function(room, cb) {
  if(!room.id) {
    return cb('You need an id.');
  }
  db.query('DELETE FROM rooms WHERE id = ?', room.id, cb);
};

exports.update = function(roomId, room, cb) {

  if(!roomId.id || !room.description) {
    return cb('You need a room id and description');
  }
  db.query(`UPDATE items SET description=? WHERE id = ?`,
      [room.description, Number(roomId.id)], cb);
};

exports.roomTotals = function(cb) {

  db.query('SELECT room, sum(price) AS total FROM items GROUP BY room', cb);

};



// exports.totalByRoom= function(room, cb) {
//   if(!item.room) {
//     return cb('You need a room');
//   }
//   db.query('SELECT sum(price) FROM items WHERE room = ?', item.room, cb);
//
// }
