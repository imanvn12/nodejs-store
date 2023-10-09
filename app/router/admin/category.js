const { categoryController } = require('../../http/controllers/admin/category.controller');

const router = require('express').Router();


/**
 * @swagger
 *  /admin/category/create:
 *      post:
 *          tags: [admin-panel]
 *          summary: Create a new category
 *          parameters:
 *          -   name: title
 *              description: title of the category
 *              required: true
 *              in: formData
 *              type: string
 *          -   name: parents
 *              description: parents of the category
 *              in: formData
 *              type: string
 *          responses:
 *              200:
 *                  description: success
 *              400:
 *                  description: bad request
 *              500:
 *                  description: internal server error
 */


router.post('/create', categoryController.createCategory);

/**
 * @swagger
 *  /admin/category/getparents:
 *      get:
 *          tags: [admin-panel]
 *          summary: get parents category
 *          responses:
 *              200:
 *                  description: success
 */


router.get('/getparents', categoryController.getParentsCategory);

/**
 * @swagger
 *  /admin/category/children/{parents}:
 *      get:
 *          tags: [admin-panel]
 *          summary: get childern category
 *          parameters:
 *          -   in: path
 *              name: parents
 *              type: string
 *          responses:
 *              200:
 *                  description: success
 */


router.get('/children/:parents', categoryController.getChildCategory);

/**
 * @swagger
 *  /admin/category/allcategory:
 *      get:
 *          tags: [admin-panel]
 *          summary: get childern category
 *          responses:
 *              200:
 *                  description: success
 */


router.get('/allcategory', categoryController.getAllCategory);

module.exports = {
    categoryRoutes: router
}