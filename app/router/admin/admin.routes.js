const { verifyAccessToken } = require('../../http/middlewares/vrifyAccssecToken');
const { blogRoutes } = require('./blog');
const { categoryRoutes } = require('./category');
const { AdminApiCourseRoutes } = require('./course');
const { AdminApiPermissionRouter } = require('./permission');
const { AdminApiRoutes } = require('./product');
const { AdminApiRoleRouter } = require('./role');
const { AdminApiUserRouter } = require('./user');

const router = require('express').Router();

router.use('/category', categoryRoutes);
router.use('/blog', verifyAccessToken, blogRoutes);
router.use('/product', AdminApiRoutes);
router.use('/course', AdminApiCourseRoutes);
router.use('/user', AdminApiUserRouter);
router.use('/role', AdminApiRoleRouter);
router.use('/permission', AdminApiPermissionRouter);

module.exports = {
    categoryAdminRoutes: router
}