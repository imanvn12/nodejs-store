
const { apiRouter } = require('./api');
const { authRouter } = require('./user/auth');

const router = require('express').Router();

router.use('/', apiRouter);
router.use('/user', authRouter);

module.exports = {
    allRoutes: router
}