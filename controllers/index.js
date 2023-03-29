const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const apiRoutes = require('./api');

router.use('/', homeRoutes);
router.use('/', dashboardRoutes);
router.use('/api', apiRoutes);

module.exports = router;