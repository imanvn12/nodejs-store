/**
 * @swagger
 *  /admin/blog/create:
 *      post:
 *          tags: [blog(admin-panel)]
 *          summary: Create a blog
 *          consumes:
 *          -   multipart/form-data
 *          parameters:
 *          -   in: header
 *              name: access-token
 *              type: string
 *              value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5MDE1MjM5MjI0IiwiaWF0IjoxNjk1ODMzODgxLCJleHAiOjE3MjczOTE0ODF9.p0Doo1LS6O-n7PbvLwGOPqUKzzxnR6dZbQEaoucLDMg
 *              required: true
 *          -   name: title
 *              required: true
 *              in: formData
 *              type: string
 *          -   name: shorttext
 *              required: true
 *              in: formData
 *              type: string
 *          -   name: text
 *              required: true
 *              in: formData
 *              type: string
 *          -   name: tags
 *              in: formData
 *              type: string
 *          -   name: image
 *              required: true
 *              in: formData
 *              type: file
 *          responses:
 *              201:
 *                  description: Created
 */

/**
 * @swagger
 *  /admin/blog:
 *      get:
 *          tags: [blog(admin-panel)]
 *          summary: get all blog
 *          parameters:
 *          -   in: header
 *              name: access-token
 *              type: string
 *              value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5MDE1MjM5MjI0IiwiaWF0IjoxNjk1ODMzODgxLCJleHAiOjE3MjczOTE0ODF9.p0Doo1LS6O-n7PbvLwGOPqUKzzxnR6dZbQEaoucLDMg
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/blog/update/{id}:
 *      patch:
 *          tags: [blog(admin-panel)]
 *          summary: Update blog
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  type: string
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5MDE1MjM5MjI0IiwiaWF0IjoxNjk1ODMzODgxLCJleHAiOjE3MjczOTE0ODF9.p0Doo1LS6O-n7PbvLwGOPqUKzzxnR6dZbQEaoucLDMg
 *                  required: true
 *              -   name: id
 *                  in: path
 *                  required: true
 *              -   in: formData
 *                  name: title
 *                  type: string
 *              -   in: formData
 *                  name: text
 *                  type: string
 *          responses:
 *              200:
 *                  description: seccess
 */

