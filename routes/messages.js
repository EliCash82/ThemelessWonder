var express = require('express');
var router = express.Router();

var Message = require('../models/message');

router.get('/', function(req, res, next) {
  Message.find()
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

router.post('/', function (req, res, next) {
  var message = new Message ({
    content: req.body.content
  });
  message.save(function(err, result) {
    if (err) {
      return res.status(500).json({
        title: 'You screwed up!  We take NO responsibility for this error!',
        error: err
      });
    }
    res.status(201).json({
      message: 'Note taken.',
      obj: result
    });
  });
});

router.patch('/:id', function(req, res, next) {
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
    message.content = req.body.content;
    message.save(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: 'You screwed up!  We take NO responsibility for this error!',
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
