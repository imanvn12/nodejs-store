/**
 * @swagger
 * /admin/course/chapter/addchapter/{id}:
 *      patch:
 *          summary: add a chapter for a given course
 *          tags: [chapter(admin panel)]
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/addchapter'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/addchapter'
 *          responses:
 *              201:
 *                  description: success
 *                  content:
 *                      qapplication/json:
 *                          schema:
 *                              $ref: '#/definitions/createresponse'
 */

/**
 * @swagger
 *  definitions:
 *      getchapter:
 *          type: object
 *          properties:
 *              statuscode:
 *                  type: intger
 *                  example: 20x
 *              data:
 *                  type: object
 *                  properties:
 *                      chapter:
 *                          type: object
 *                          properties:
 *                              _id:
 *                                  type: string
 *                                  example: '36457654dw5654h68d'
 *                              title:
 *                                  type: string
 *                                  example: "title of course"
 *                              chapters:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          title:
 *                                              type: string
 *                                              example: 'title of chapter'
 *                                          text:
 *                                              type: string
 *                                              example: 'text of chapter'
 *                                          _id:
 *                                              type: string
 *                                              example: '3453656gd354j74c'
 *                                          episodes:
 *                                              type: array
 *                                              example: []
 */


/**
 * @swagger
 *  /admin/course/chapter/{id}:
 *      get:
 *          tags: [chapter(admin panel)]
 *          summary: chapters of course
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  reuired: true
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/getchapter'
 */


/**
 * @swagger
 *  definitions:
 *      deletechapter:
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
 *                          message:
 *                              type: string
 *                              example: "best message for"
 */

/**
 * @swagger
 *  /admin/course/chapter/delete/{chapterID}:
 *      patch:
 *          tags: [chapter(admin panel)]
 *          summary: delete a chapter of course
 *          parameters:
 *              -   in: path
 *                  name: chapterID
 *                  type: string
 *                  reuired: true
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/deletechapter'
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          updatechapter:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: new title for chapter of course
 *                      example: "new title"
 *                  text:
 *                      type: string
 *                      description: new text for chapter of course
 *                      example: "new text"
 */

/**
 * @swagger
 *  /admin/course/chapter/update/{chapterID}:
 *      patch:
 *          tags: [chapter(admin panel)]
 *          summary: update a chapter of course
 *          parameters:
 *              -   in: path
 *                  name: chapterID
 *                  type: string
 *                  reuired: true
 *          requestBody:
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/updatechapter'
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/deletechapter'
 */
