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
    Item.create(req.body, (err, item) => {
      if(err) {
        return res.status(400).send(err);
      }
      res.send(item);
    });
  });

router.get('/:id', (req, res) => {
  Item.getById(req.params.id, (err, item) => {
    if(err) {
      return res.status(400).send(err);
    }
    res.send(item);
  });
});

router.delete('/:id', (req, res) => {
  Item.delete(req.params, err => {
    if(err) {
      return res.status(400).send(err);
    }
    res.send();
  });
});

router.put('/:id', (req, res) => {
  Item.update(req.params.id, req.body, (err, item) => {
    if(err) {
      return res.status(400).send(err);
    }
    res.send(item);
  });
});

router.get('/totals', (req, res) => {
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
