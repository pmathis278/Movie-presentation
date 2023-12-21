const router = require('express').Router();

const apiRoutes = require('./api/userroutes');
const homeRoutes = require('./homeRoutes');
// const appRoutes = require('./app.routes');

router.use('/', homeRoutes);
// router.use('/', appRoutes);
router.use('/api', apiRoutes);

module.exports = router;