var express = require('express');
var router = express.Router();
var hitService = require('../service/hitService')

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render('index', { title: 'Stats', hits: await hitService.getCounts() });
});

module.exports = router;
