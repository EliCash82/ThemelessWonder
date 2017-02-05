var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

var User = require('../models/user');

router.post('/', function (req, res, next) {
  var user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: bcrypt.hashSync(req.body.password, 10),
    email: req.body.email
  });
  user.save(function(err, result) {
    if (err) {
      return res.status(500).json({
        title: 'You screwed up!  We take NO responsibility for this error!',
        error: err
      });
    }
    res.status(201).json({
      message: 'Now you are official, CONGRATS, NO REALLY CONGRATULATIONS.',
      obj: result
    });
  });
});

module.exports = router;
