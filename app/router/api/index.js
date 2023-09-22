const homeControllers = require('../../http/controllers/api/home.controllers');
const { verifyAccessToken } = require('../../http/middlewares/vrifyAccssecToken');

const router = require('express').Router();

/**
 * @swagger
 * tags:
 *  name: index page
 *  description: index page route
 */

/**
 * @swagger
 * /:
 *  get:
 *      summary: index page
 *      tags: [index page]
 *      description: get all need data for index page
 *      responses:
 *          200:
 *              description: success
 *          404:
 *              description: not found
 */

router.get('/', verifyAccessToken, homeControllers.indexPage);

module.exports = {
    apiRouter: router
}