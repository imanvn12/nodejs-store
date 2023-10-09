/**
 * @swagger
 *  components:
 *      schemas:
 *          listtype:
 *              type: string
 *              enum:
 *              -   free
 *              -   cash
 *              -   special
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          addchapter:
 *              type: object
 *              required:
 *                  -    title 
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of chapter for course
 *                      example: "title of chapter"
 *                  text:
 *                      type: string
 *                      description: text of chapter for course
 *                      example: "text of chapter"
 *          createcourse:
 *              type: object
 *              required:
 *                  -   title
 *                  -   shortdescription
 *                  -   description
 *                  -   image
 *                  -   type
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of the course
 *                  shortdescription:
 *                      type: string
 *                      description: shortdescription of the course
 *                  description:
 *                      type: string
 *                      description: description of the course
 *                  image:
 *                      type: string
 *                      format: binary 
 *                      description: image of the course
 *                  type:
 *                      $ref: '#/components/schemas/listtype'
 *                  tags:
 *                      type: array
 *                      description: tags of the course
 *                      
 */

/**
 * @swagger
 *  /admin/course/courses:
 *      get:
 *          tags: [course(admin panel)]
 *          summary: get all courses
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  definitions:
 *      createlist:
 *          type: object
 *          properties:
 *              statuscode:
 *                  type: intger
 *                  example: 20x
 *              data:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                          title:
 *                              type: string
 *                              description: title of course
 *                              example: "title of course"
 *                          shortdescription:
 *                              type: string
 *                              description: short des of course
 *                              example: "short des of course"
 *                          description:
 *                              type: string
 *                              description: description of course
 *                              example: "description of course"
 *                          teacher:
 *                              type: string
 *                              description: teacher of course
 *                              example: "mongoose id"
 *                          type:
 *                              type: string
 *                              description: type of course
 *                              example: "not started"
 *                          time:
 *                              type: string
 *                              description: time of course
 *                              example: "00:00:00"
 */

/**
 * @swagger
 *  definitions:
 *      createresponse:
 *          type: object
 *          properties:
 *              statuscode:
 *                  type: integer
 *                  example: 20x
 *              data:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                          message:
 *                              type: string
 *                              example: "best possible message"
 */

/**
 * @swagger
 *  /admin/course/create:
 *      post:
 *          tags: [course(admin panel)]
 *          summary: create a new course
 *          requestBody:
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/createcourse'
 *          responses:
 *              201:
 *                  descreption: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/createresponse'
 *                  
*/

/**
 * @swagger
 *  /admin/course/{id}:
 *      get:
 *          summary: get a course by id
 *          tags: [course(admin panel)]
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/createlist'
 */

