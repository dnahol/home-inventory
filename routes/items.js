'use strict';

var express = require('express');
var router = express.Router();

var Item = require('../models/item');

router.route('/')
  .get((req, res) => {
    Item.get((err, items) => {
      if(err) {
        return res.status(400).send(err);
      }
      res.send(items);
    });
  })
  .post((req, res) => {
    //req.body ---> { name: ??, price: ??}
    Item.create(req.body, err => {
      if(err) {
        return res.status(400).send(err);
      }
      res.send();
    });
  });

  router.delete('/:id/delete', (req, res) => {
    Item.delete(req.params, err => {
      if(err) {
        return res.status(400).send(err);
      }
      res.send();
    });
  });

  router.put('/:id/update', (req, res) => {
    Item.update(req.params, req.body, err => {
      if(err) {
        return res.status(400).send(err);
      }
      res.send();
    });
  });

router.route('/totals')
  .get((req, res) => {
    Item.total((err, total) => {
      if(err) {
        return res.status(400).send(err);
      }
      res.send(total);
    });
  });

router.route('/categories/totals')
  .get((req, res) => {
    Item.catTotals((err, catTotals) => {
      if(err) {
        return res.status(400).send(err);
      }
      res.send(catTotals);
    });
  });

module.exports = router;
