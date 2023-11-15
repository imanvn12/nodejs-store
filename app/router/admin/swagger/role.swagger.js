

/**
 * @swagger
 *  components:
 *      roleenum:
 *          enum:
 *              -   course
 *              -   product
 *              -   blog
 */


/**
 * @swagger
 *  components:
 *      schemas:
 *          createrole:
 *              type: object
 *              required:
 *                  -   title
 *                  -   permissions
 *              properties:
 *                  title:
 *                      type: string
 *                      example: "title of role" 
 *                  permissions:
 *                      type: array
 *          updaterole:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      example: "title of role" 
 *                  permissions:
 *                      type: array
 */


/**
 * @swagger
 *  /admin/role/create:
 *      post:
 *          tags: [RBAC(admin-panel)]
 *          summary: Create a role
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/createrole"
 *          responses:
 *              201:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/response"
 */


/**
 * @swagger
 *  /admin/role/roles:
 *      get:
 *          tags: [RBAC(admin-panel)]
 *          summary: gett all roles
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: ""
 */


/**
 * @swagger
 *  /admin/role/update/{id}:
 *      patch:
 *          tags: [RBAC(admin-panel)]
 *          summary: update a role by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  required: true
 *                  type: string
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/updaterole"
 *          responses:
 *              201:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/response"
 */


/**
 * @swagger
 *  /admin/role/delete/{field}:
 *      delete:
 *          tags: [RBAC(admin-panel)]
 *          summary: delete a role by id
 *          parameters:
 *              -   in: path
 *                  name: field
 *                  required: true
 *                  type: string
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/response"
 */