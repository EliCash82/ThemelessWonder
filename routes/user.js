var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

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

router.post('/signin', function (req,res,next) {
  User.findOne({email: req.body.email}, function(err, user) {
    if (err) {
      return res.status(500).json({
        title: 'You screwed up!  We take NO responsibility for this error!',
        error: err
      });
    }
    if (!user) {
      return res.status(401).json({
        title: 'No user found',
        error: { message: 'THERE IS NO USER!  Do you not get this?!  THERE IS NO USER!'}
      });
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({
        title: 'You failed',
        error: { message: 'We are very disappointed in you.  I think you know why.'}
      });
    }
    var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
    res.status(200).json({
      message: 'Well done, soldier.  Welcome back to the trenches!',
      token: token,
      userId: user._id
    })
  });
});

module.exports = router;
