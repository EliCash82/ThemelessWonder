var express = require('express');
var router = express.Router();

var Message = require('../models/message');
//router.post?
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

module.exports = router;
