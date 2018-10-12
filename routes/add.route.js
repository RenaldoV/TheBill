const express = require('express');
const app = express();
const addRoutes = express.Router();
const bcrypt = require('bcrypt');

let Add = require('../models/Add');

addRoutes.route('/createAdd').post((req, res, next) => {
  let add = req.body;
    Add.create(add, (err, result) => {
      if (err) return next(err);
      if (result) {
        res.send(true);
        console.log('successful creation: \n' + result);
      }else {
        console.log('unsuccessful creation: \n' + result);
        res.send(false);
      }
    })
});

addRoutes.route('/one/:id').get((req, res, next) => {
  let addID = req.params;
  console.log(addID);
  Add.findOne(addID, (err, result) => {
    if (err) return next(err);
    if (result) {
      res.send(result);
    } else {
      res.send(false);
    }
  })
});

addRoutes.route('/all').get((req, res, next) => {
  Add.find({}, (err, result) => {
    if (err) return next(err);
    if (result) {
      res.send(result);
      console.log(result);
    } else {
      res.send(false);
    }
  })
});

module.exports = addRoutes;
