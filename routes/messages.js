var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');

var Message = require('../models/message');

router.get('/', function(req, res, next) {
  Message.find()
    .populate('user', 'firstName')
    .exec(function(err, messages) {
      if (err) {
        return res.status(500).json({
          title: 'An error took place',
          error: err
        });
      }
      res.status(200).json({
        message: "You succeeded you stupid fool!",
        obj: messages
      });
    });
});

router.use('/', function  (req, res, next) {
  jwt.verify(req.query.token, 'secret', function(err, decoded) {
    if (err) {
      return res.status(401).json({
        title: 'Get outta heeeeeah!',
        error: err
      });
    }
    next();
  })
});

router.post('/', function (req, res, next) {
  var decoded = jwt.decode(req.query.token);
  User.findById(decoded.user._id, function(err, user) {
    if (err) {
      return res.status(401).json({
        title: 'Get outta heeeeeah!',
        error: err
      });
    }
    var message = new Message ({
      content: req.body.content,
      user: user
    });
    message.save(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: 'You screwed up!  We take NO responsibility for this prob!',
          error: err
        });
      }
      user.messages.push(result);
      user.save();
      res.status(201).json({
        message: 'Note taken.',
        obj: result
      });
    });
  });
});

router.patch('/:id', function(req, res, next) {
  var decoded = jwt.decode(req.query.token);
  Message.findById(req.params.id, function(err, message) {
    if (err)  {
      return res.status(500).json({
        title: 'You screwed up!  We take NO responsibility for this error!',
        error: err
      });
    }
    if (!message) {
      return res.status(500).json({
        title: 'I cannot even find a message!',
        error: {message: 'Nope cant find nothing'}
      });
    }
    if (message.user != decoded.user._id) {
      return res.status(401).json({
        title: 'Get outta heeeeeah!',
        error: {message: 'THAT?  THAT IS NOT YOU!  JEEEEEZ! COME ON!'}
      });
    }

    message.content = req.body.content;
    message.save(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: 'You screwed up!  We take NO responsibility for this prob!',
          error: err
        });
      }
      res.status(200).json({
        message: 'Note updated.',
        obj: result
      });
    });
  });
});

router.delete('/:id', function(req, res, next) {
  var decoded = jwt.decode(req.query.token);
  Message.findById(req.params.id, function(err, message) {
    if (err)  {
      return res.status(500).json({
        title: 'You screwed up!  We take NO responsibility for this error!',
        error: err
      });
    }
    if (!message) {
      return res.status(500).json({
        title: 'I cannot even find a message!',
        error: {message: 'Nope cant find nothing'}
      });
    }
    if (message.user != decoded.user._id) {
      return res.status(401).json({
        title: 'Get outta heeeeeah!',
        error: {message: 'THAT?  THAT IS NOT YOU!  JEEEEEZ! COME ON!'}
      });
    }
    message.remove(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: 'You screwed up!  We take NO responsibility for this error!',
          error: err
        });
      }
      res.status(200).json({
        message: 'Note destroyed.',
        obj: result
      });
    });
  });
});

module.exports = router;
