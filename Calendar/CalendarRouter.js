var express    = require('express');        // call express
var router = express.Router();              // get an instance of the express Router

router.use('/Standard', require('./Standard/StandardRouter'));
router.use('/Cycle', require('./Cycle/CycleRouter'));

module.exports = router;
