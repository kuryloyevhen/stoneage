const express = require('express')
const router = express.Router()
const manager = require('../managers/dwellings')

router.get('/', (req, res, next) => 
   manager()
   .then(result => res.json(result))
   .catch(err => next(err))
)

module.exports = router;