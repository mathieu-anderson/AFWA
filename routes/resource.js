const express = require('express');
const router = express.Router();

router.get('/:id', function(req, res, next) {
  res.render('resource');
});

module.exports = router;
