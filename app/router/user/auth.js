const { UserAuthController } = require('../../http/controllers/user/auth/auth.controller');

const router = require('express').Router();


/**
 * @swagger
 * components:
 *  schemas:
 *      getOTP:
 *          type: object
 *          required:
 *              -   phone
 *          properties:
 *              phone:
 *                  type: string
 *                  description: getOTP from mobile
 *      checkOTP:
 *          type: object
 *          required:
 *              -   phone
 *              -   code
 *          properties:
 *              phone:
 *                  type: string
 *                  description: register otp phone
 *              code:
 *                  type: string
 *                  description: otp code
 */


/**
 * @swagger
 *  tags: 
 *      name: authorization user
 *      description: authorization user section
 */




/**
 * @swagger
 *  /user/register:
 *      post:
 *          tags: [authorization user]
 *          summary: login user to userpanel with phone number
 *          description: one time password(otp) login
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/getOTP'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/getOTP'
 *          responses:
 *              200:
 *                  description: success
 *              201:
 *                  description: success
 *              400:
 *                  description: bad request
 *              401: 
 *                  description: unauthorized
 *              500:
 *                  description: internal server error
 */



router.post('/register', UserAuthController.getOTP);

/**
 * @swagger
 *  /user/checkotp:
 *      post:
 *          summary: checking
 *          description: check one time password otp
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/checkOTP'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/checkOTP'
 *          responses:
 *              200:
 *                  descreiption: success
 *              404:
 *                  descreiption: user not found
 *              401:
 *                  descreiption: try again
 * 
 */

router.post('/checkotp', UserAuthController.checkOTP);

module.exports = {
    authRouter: router
}