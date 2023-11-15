// // const express = require('express');
// // const http = require('http');
// // const { default: mongoose } = require('mongoose');
// // const morgan = require('morgan');
// // const { allRoutes } = require('./app/router/routes');
// // const createHttpError = require('http-errors');
// // const swaggerUI = require('swagger-ui-express');
// // const swaggerJSDoc = require('swagger-jsdoc');

// const { GraphQLObjectType, GraphQLString, GraphQLSchema } = require("graphql");
// const { BlogModel } = require("./app/model/blogs");

// // class Application {
// //     #app = express();
// //     #PORT;
// //     #DB_URL;

// //     constructor(PORT, DB_URL) {

// //     }

// //     configApp() {
// //         this.#app.use(morgan('dev'));
// //         this.#app.use(express.json());
// //         this.#app.use(express.urlencoded());
// //         this.#app.use(express.static('public'));
// //         this.#app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerJSDoc({
// //             swaggerDefinition: {
// //                 openapi: '3.0.0',
// //                 info: {
// //                     title: 'great store',
// //                     version: '1.0.0',
// //                     description: 'the best store'
// //                 },
// //                 components: {
// //                     securitySchemes: {
// //                         BearerAuth: {
// //                             type: 'http',
// //                             scheme: 'bearer',
// //                             bearerFormat: 'JWT'
// //                         }
// //                     }
// //                 },
// //                 security: [{ BearerAuth: [] }]
// //             },
// //             apis: ['./app/router/**/*.js']

// //         }), { explorer: true }))
// //     }

// //     createServer() {
// //         http.createServer(this.#app).listen(this.#PORT, () => {
// //             console.log(`run > http://localhost:${this.#PORT}`);
// //         })
// //     }

// //     connectMongoDB() {
// //         mongoose.connection.on('connected', () => {
// //             console.log('mongoose connected');
// //         })
// //         mongoose.connection.on('disconnected', () => {
// //             console.log('mongoose has been disconnected');
// //         })

// //         process.on('SIGINT', async () => {
// //             console.log('monddose exit cause probably errors');
// //             await mongoose.disconnect();
// //             process.exit(1)
// //         })
// //     }

// //     createRoute() {
// //         this.#app.use(allRoutes)
// //     }

// //     errorHandling() {
// //         this.#app.use((req, res, next) => {
// //             next(createHttpError.NotFound('page not found'))
// //         })

// //         this.#app.use((err, req, res, next) => {
// //             const internalError = createHttpError.InternalServerError();
// //             let statuscode = err.statusCode || internalError.statusCode;
// //             let message = err.message || internalError.message;
// //             return res.status(statuscode).json({
// //                 statuscode,
// //                 message
// //             })
// //         })
// //     }
// // }
// // ========================================================================================

// const blog = {
//     type: new GraphQLObjectType({
//         name: "blogtype",
//         fields: {
//             _id: {type: GraphQLString}
//         }
//     }),
//     args: {

//     },
//     resolve: async(_, args, context, info) => {
//         await BlogModel.find({})
//     }
// };

// const rootQuery = new GraphQLObjectType({
//     name: "rootQoury",
//     fields: {
//         blog
//     }
// });

// const rootMutation = new GraphQLObjectType({
//     name: "rottMutation",
//     fields: {

//     }
// })

// const graphSchema = new GraphQLSchema({
//     query: {
//         rootQuery
//     },
//     mutation: {
//         rootMutation
//     }
// })