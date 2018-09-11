const express = require('express');
const app = express();
const userRoutes = express.Router();
const bcrypt = require('bcrypt');


let User = require('../models/User');

// Defined store route
userRoutes.route('/login').post((req, res, next) => {
  let user = req.body;
  // console.log(user);
  User.findOne({email : user.email}, (err, usr) => {
    if (err) return next(err);
    if (usr) {
      usr = usr.toObject();
      console.log("pw sent: " + user.password);
      console.log("pw db: " + usr.passwordHash);
      bcrypt.compare(user.password, usr.passwordHash, (err, pwMatch) => {
        if (err) return next(err);
        console.log("pw match: " + pwMatch);
        res.send(pwMatch);
      });
    }
  });
});

userRoutes.route('/addUser').post((req, res, next) => {
  let user = req.body;
  let saltRounds = 10;
  let newUser = {};
  bcrypt.hash(user.password, saltRounds, (err, hash) => {
    // Store hash in your password DB.
    if (err) return next(err);
    newUser.passwordHash = hash;
    newUser.username = user.username;
    User.create(newUser, (err, result) => {
      if (err) return next(err);
      if (result) {
        res.json(newUser);
        console.log('successful creation: \n' + newUser);
        console.log(result);
      }else {
        console.log('unsuccessful creation: \n' + result);
        res.send(false);
      }
    })
  });
});

/*// Defined get data(index or listing) route
adUnitRoutes.route('/').get(function (req, res) {
  AdUnit.find(function (err, adUnits){
    if(err){
      console.log(err);
    }
    else {
      res.json(adUnits);
    }
  });
});

// Defined edit route
adUnitRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  AdUnit.findById(id, function (err, adUnit){
    res.json(adUnit);
  });
});

//  Defined update route
adUnitRoutes.route('/update/:id').post(function (req, res) {
  AdUnit.findById(req.params.id, function(err, adUnit) {
    if (!adUnit)
      return next(new Error('Could not load Document'));
    else {
      adUnit.unit_name = req.body.unit_name;
      adUnit.unit_price = req.body.unit_price;

      adUnit.save().then(adUnit => {
        res.json('Update complete');
      })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Defined delete | remove | destroy route
adUnitRoutes.route('/delete/:id').get(function (req, res) {
  AdUnit.findByIdAndRemove({_id: req.params.id}, function(err, adUnit){
    if(err) res.json(err);
    else res.json('Successfully removed');
  });
});*/

module.exports = userRoutes;
