/**
 * @swagger
 *  components:
 *      schemas:
 *          createepisode:
 *              type: object
 *              required:
 *                  -    title
 *                  -    text
 *                  -    type
 *                  -    video
 *                  -    chapterID
 *                  -    courseID
 *              properties:
 *                  title:
 *                      type: string
 *                      exaple: "episode's title"
 *                  text:
 *                      type: string
 *                      exaple: "text of episode"
 *                  type:
 *                      type: string
 *                      enum:
 *                          -    unlock
 *                          -    lock
 *                  video:
 *                      type: string
 *                      format: binary
 *                  chapterID:
 *                      type: string
 *                      exaple: "65251ec85f82c4ed5c6afe86"
 *                  courseID:
 *                      type: string
 *                      exaple: "65202038e53346d50f541203"
 */

/**
 * @swagger
 *  /admin/course/chapter/episode/create:
 *      post:
 *          tags: [episode(admin panel)]
 *          summary: create a new episode in a chapter of a course
 *          requestBody:
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/createepisode'
 *          responses:
 *              201:
 *                  description: success
 */

/**
 * @swagger
 *  definitions:
 *      response:
 *          type: object
 *          properties:
 *              statuscode:
 *                  type: string
 *                  example: "20x"
 *              data:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                          example: "response message"
 */

/**
 * @swagger
 *  /admin/course/chapter/episode/delete/{episodeID}:
 *      patch:
 *          tags: [episode(admin panel)]
 *          summary: delete an episode in a chapter of a course
 *          parameters:
 *              -   in: path
 *                  name: episodeID
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/response'
 */


/**
 * @swagger
 *  /admin/course/chapter/episode/update/{episodeID}:
 *      patch:
 *          tags: [episode(admin panel)]
 *          summary: delete an episode in a chapter of a course
 *          parameters:
 *              -   in: path
 *                  name: episodeID
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/response'
 */