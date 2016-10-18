var express    = require('express');        // call express
var router = express.Router();              // get an instance of the express Router

router.use('/Calendar', require('./Calendar/CalendarRouter'));
router.use('/ExternalInstance',require('./ExternalInstance/ExternalInstanceRouter'));

module.exports = router;
