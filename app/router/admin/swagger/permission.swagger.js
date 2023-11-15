

/**
 * @swagger
 *  components:
 *      schemas:
 *          createpermission:
 *              type: object
 *              required:
 *                  -   title
 *                  -   description
 *              properties:
 *                  title:
 *                      type: string
 *                      example: "title of permission" 
 *                  description:
 *                      type: string
 *                      example: "description of permission" 
 *          updatepermission:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      example: "title of permission" 
 *                  description:
 *                      type: string
 *                      example: "description of permission" 
 */


/**
 * @swagger
 *  /admin/permission/create:
 *      post:
 *          tags: [RBAC(admin-panel)]
 *          summary: Create a permission
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/createpermission"
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
 *  /admin/permission/permissions:
 *      get:
 *          tags: [RBAC(admin-panel)]
 *          summary: get all permissions
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
 *  /admin/permission/update/{id}:
 *      patch:
 *          tags: [RBAC(admin-panel)]
 *          summary: update a permission by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  required: true
 *                  type: string
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/updatepermission"
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
 *  /admin/permission/delete/{id}:
 *      delete:
 *          tags: [RBAC(admin-panel)]
 *          summary: delete a permission by id
 *          parameters:
 *              -   in: path
 *                  name: id
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