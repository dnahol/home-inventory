'use strict';

var express = require('express');
var router = express.Router();

var Room = require('../models/room');

router.route('/')
  .get((req, res) => {
    Room.get((err, rooms) => {
      if(err) {
        return res.status(400).send(err);
      }
      res.send(rooms);
    });
  })
  .post((req, res) => {
    //req.body ---> { name: ??, price: ??}
    Room.create(req.body, err => {
      if(err) {
        return res.status(400).send(err);
      }
      res.send();
    });
  });

router.delete('/:id/delete', (req, res) => {
  Room.delete(req.params, err => {
    if(err) {
      return res.status(400).send(err);
    }
    res.send();
  });
});

router.put('/:id/update', (req, res) => {
  Room.update(req.params, req.body, err => {
    if(err) {
      return res.status(400).send(err);
    }
    res.send();
  });
});

router.route('/totals')
  .get((req, res) => {
    Room.roomTotals((err, roomTotals) => {
      if(err) {
        return res.status(400).send(err);
      }
      res.send(roomTotals);
    });
  });



module.exports = router;
