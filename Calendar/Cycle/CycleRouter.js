var express    = require('express');        // call express
var router = express.Router();              // get an instance of the express Router

router.post('/CreateCycle', require('./CreateCycle'));
router.post('/AddPeriodsToCycle', require('./AddPeriodsToCycle'));
router.post('/DeletePeriodsFromCycle', require('./DeletePeriodsFromCycle'));
router.post('/DeleteCycle', require('./DeleteCycle'));
router.post('/ListDatesForCycle', require('./ListDatesForCycle'));
router.get('/ListAllCycles', require('./ListAllCycles'));
router.post('/ModifyCycleDescription', require('./ModifyCycleDescription'));

module.exports = router;
