var express = require('express')
var router = express.Router()
var hitService = require('../service/hitService')

router.get('/', async function(req, res, next) {
  res.send(await hitService.getCounts())
});

router.post('/', function(req, res, next) {
  hitService.addCount(req.query.id)
  res.send()
});

module.exports = router
