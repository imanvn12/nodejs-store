const bcrypt = require('bcrypt')

const router = require('express').Router();

/**
 * @swagger
 *  tags:
 *      name: developers-routes
 *      description: for developers to configure easily
 */

/**
 * @swagger
 *  /developer/hashpassword/{password}:
 *      get:
 *          tags: [developers-routes]
 *          name: hashpasswod
 *          description: getting hash password
 *          parameters:
 *          -   in: path
 *              type: string
 *              name: password
 *              required: true
 *          responses:
 *              200:
 *                  description: success
 *              500:
 *                  description: internal error
 */

router.get('/hashpassword/:password', (req, res, next) => {
    const { password } = req.params;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return res.status(200).json({
        success: true,
        hash
    })
})

module.exports = {
    developerRoutes: router
}