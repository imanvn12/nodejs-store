const { UserAuthController } = require('../../http/controllers/user/auth/auth.controller');

const router = require('express').Router();
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
 *          parameters:
 *          -   name: phone
 *              description: IR phone number 
 *              in: formData
 *              required: true
 *              type: string 
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
router.post('/checkotp', UserAuthController.checkOTP);

module.exports = {
    authRouter: router
}