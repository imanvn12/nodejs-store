
const { verifyAccessToken, checkRole } = require('../http/middlewares/vrifyAccssecToken');
const { categoryAdminRoutes } = require('./admin/admin.routes');
const { apiRouter } = require('./api');
const { developerRoutes } = require('./developers.routes');
const { authRouter } = require('./user/auth');

const router = require('express').Router();

router.use('/', apiRouter);
router.use('/developer', developerRoutes);
router.use('/admin', verifyAccessToken, checkRole("admin"), categoryAdminRoutes);
router.use('/user', authRouter);

module.exports = {
    allRoutes: router
}