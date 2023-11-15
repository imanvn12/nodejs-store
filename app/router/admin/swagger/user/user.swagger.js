/**
 * @swagger
 *  /admin/user/allusers:
 *      get:
 *          tags: [user(admin-panel)]
 *          summary: get all users
 *          description: this ability allows admins to search users by first_name, last_name, username, phone, and email
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          update:
 *              type: object
 *              properties:
 *                  first_name:
 *                      type: string
 *                      example: "iman"
 *                  last_name:
 *                      type: string
 *                      example: "vn"
 *                  username:
 *                      type: string
 *                      example: "imanvn"
 *                  email:
 *                      type: string
 *                      example: "imanvn@gmail.com"
 *                  password:
 *                      type: string
 *                      example: "12345678"
 * 
 */

/**
 * @swagger
 *  /admin/user/updateprofile:
 *      patch:
 *          tags: [user(admin-panel)]
 *          summary: update profile of user
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/update"
 *          responses:
 *              201:
 *                  description: success
 */