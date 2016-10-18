var express    = require('express');        // call express
var router = express.Router();              // get an instance of the express Router

router.post('/GetExternalInstance', require('./GetExternalInstance'));

module.exports = router;