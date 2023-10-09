const { verifyAccessToken } = require('../../http/middlewares/vrifyAccssecToken');
const { blogRoutes } = require('./blog');
const { categoryRoutes } = require('./category');
const { AdminApiCourseRoutes } = require('./course');
const { AdminApiRoutes } = require('./product');

const router = require('express').Router();

/**
 * @swagger
 *  tags:
 *      -   name: course(admin panel)
 *          description: admin panel for create, update, delete and for course
 *      -   name: blog(admin-panel)
 *          description: admin panel for create, update, delete and for blog
 *      -   name: admin-panel
 *          description: admin panel for create, update, delete and...
 *      -   name: product(admin panel)
 *          description: admin panel for create, update, delete and for product
 *      -   name: category(admin-panel)
 *          description: admin panel for create, update, delete and for category
 */




router.use('/category', categoryRoutes);
router.use('/blog', verifyAccessToken, blogRoutes);
router.use('/product', AdminApiRoutes);
router.use('/course', AdminApiCourseRoutes);

module.exports = {
    categoryAdminRoutes: router
}