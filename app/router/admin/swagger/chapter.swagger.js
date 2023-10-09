/**
 * @swagger
 * /admin/course/chapter/addchapter/{id}:
 *      patch:
 *          summary: add a chapter for a given course
 *          tags: [course(admin panel)]
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

