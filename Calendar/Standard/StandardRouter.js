var express    = require('express');        // call express
var router = express.Router();              // get an instance of the express Router

router.post('/CreateCalendar', require('./CreateCalendar'));
router.post('/AddDatesToCalendar', require('./AddDatesToCalendar'));
router.post('/DeleteDatesFromCalendar', require('./DeleteDatesFromCalendar'));
router.post('/DeleteCalendar', require('./DeleteCalendar'));
router.post('/ListDatesForCalendar', require('./ListDatesForCalendar'));
router.get('/ListAllStandardCalendars', require('./ListAllStandardCalendars'));
router.post('/ModifyStandardCalendarDescription', require('./ModifyStandardCalendarDescription'));

module.exports = router;
