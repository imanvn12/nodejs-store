
/**
 * @swagger
 *  components:
 *      schemas:
 *          namespace:
 *              type: object
 *              required:
 *                  -   title
 *                  -   endpoint
 *              properties:
 *                  title:
 *                      type: string 
 *                      example: title of namespace 
 *                  endpoint:
 *                      type: string 
 *                      example: endpoint of namespace 
 *          room:
 *              type: object
 *              required:
 *                  -   name
 *                  -   description
 *                  -   endpoint
 *              properties:
 *                  endpoint:
 *                      type: string 
 *                      example: from endpoint 
 *                  name:
 *                      type: string 
 *                      example: name of room 
 *                  description:
 *                      type: string 
 *                      example: description of room 
 *                  image:
 *                      type: string
 *                      format: binary
 */


/**
 * @swagger
 *  definitions:
 *      namespace:
 *          type: object
 *          properties:
 *              statuscode:
 *                  type: string
 *                  example: 201
 *              data:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                          example: namespace created successfully
 *      room:
 *          type: object
 *          properties:
 *              statuscode:
 *                  type: string
 *                  example: 201
 *              data:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                          example: room created successfully
 */

/**
 * @swagger
 *  /chat/addnamespace:
 *      post:
 *          summary: create a new namespace
 *          tags: [namespace]
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/namespace"
 *          responses:
 *              201:
 *                  description: namespace created successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/namespace"
 */

/**
 * @swagger
 *  /chat/addroom:
 *      post:
 *          summary: create a new room
 *          tags: [room]
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/room"
 *          responses:
 *              201:
 *                  description: room created successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/room"
 */