/**
 * @swagger
 *  components:
 *      schemas:
 *          createproduct:
 *              type: object
 *              required: 
 *                  -   title
 *                  -   shortdescription
 *                  -   description
 *                  -   images
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of product
 *                  shortdescription:
 *                      type: string
 *                      description: shortdescription of product
 *                  description:
 *                      type: string
 *                      description: description of product

 *                  tags:
 *                      type: array
 *                      description: tags of product
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *          updateproduct:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title of product
 *                  shortdescription:
 *                      type: string
 *                      description: shortdescription of product
 *                  description:
 *                      type: string
 *                      description: description of product
 *                  tags:
 *                      type: array
 *                      description: tags of product
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 */

/**
 * @swagger
 *  /admin/product/create:
 *      put:
 *          summary: create product
 *          tags: [product(admin panel)]
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/createproduct'
 *                  multipart/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/createproduct'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/createproduct'
 *          responses:
 *              201 :
 *                  description: success
 *              
 */

/**
 * @swagger
 *  /admin/product/products:
 *      get:
 *          tags: [product(admin panel)]
 *          summary: get all products
 *          parameters:
 *              -   in: query
 *                  description: for search by title or description or short description
 *                  name: search
 *                  type: string
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/product/{id}:
 *      get:
 *          summary: get product by id
 *          tags: [product(admin panel)]
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/product/update/{id}:
 *      patch:
 *          summary: update product
 *          tags: [product(admin panel)]
 *          requestBody:
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/updateproduct'
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *          responses:
 *              200:
 *                  description: success
 */

