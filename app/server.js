const express = require('express');
const { default: mongoose } = require('mongoose');
const path = require('path');
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const morgan = require('morgan');
const createHttpError = require('http-errors');
require('dotenv').config();
const { allRoutes } = require('./router/routes');
const expressEjsLayouts = require('express-ejs-layouts');
const { initialaysSocket } = require('./utils/initSocket');
const { socketHandler } = require('./Socket.io');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { COOKIE_PARSER_SECET_KEY } = require('./utils/SECRET_KEYS.JS');
const { cookieHelper } = require('./http/middlewares/client');
// hiii
module.exports = class Application {
    #app = express();
    #PORT;
    #DB_URL;

    constructor(PORT, DB_URL) {
        this.#PORT = PORT;
        this.#DB_URL = DB_URL;
        this.configApplication();
        this.initTemplateEngine();
        this.createServer(PORT);
        this.connectToMongoDB(DB_URL);
        this.initCookieSession();
        this.createRoutes();
        this.errorHandller()
    }

    configApplication() {
        this.#app.use(morgan('dev'));
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({ extended: true }));
        this.#app.use(express.static(path.join(__dirname, '..', 'public')));
        // this.#app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerJSDoc({
        //     swaggerDefinition: {
        //         openapi: "3.0.0",
        //         info: {
        //             title: 'great store',
        //             version: '3.0.0',
        //             description: 'the best store',
        //             contact: {
        //                 name: 'imanvn',
        //                 email: 'valylyaniman56@gmail.com',
        //                 url: 'http://imanvn.com'
        //             }
        //         },
        //         servers: [
        //             { url: 'http://localhost:4000' }
        //         ],
        //         components: {
        //             securitySchemes: {
        //                 BearerAuth: {
        //                     type: 'http',
        //                     scheme: 'bearer',
        //                     bearerFormat: 'JWT'
        //                 }
        //             }
        //         },
        //         security: [{ BearerAuth: [] }]
        //     },
        //     apis: ["./app/router/**/*.js"],

        // }), { explorer: true }))

        this.#app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerJSDoc({
            swaggerDefinition: {
                openapi: '3.0.0',
                info: {
                    title: 'great store',
                    version: '3.0.0',
                    description: 'the best store',
                    contact: {
                        name: 'iman vn',
                        email: 'vakylyaniman56@gmail.com',
                        url: 'google.com'
                    }
                },
                servers: [{ url: "http://localhost:4000" }],
                components: {
                    securitySchemes: {
                        BearerAuth: {
                            type: 'http',
                            scheme: 'bearer',
                            bearerFormat: 'JWT'
                        }
                    }
                },
                security: [{ BearerAuth: [] }]
            },
            apis: ['./app/router/**/*.js']
        }), { explorer: true }))
    }
    initTemplateEngine() {
        this.#app.use(expressEjsLayouts);
        this.#app.set("view engine", "ejs");
        this.#app.set("views", "resource/views");
        this.#app.set("layout extractStyles", true);
        this.#app.set("layout extractScripts", true);
        this.#app.set("layout", "./layouts/index");
        this.#app.use((req, res, next) => {
            this.#app.locals = cookieHelper(req, res);
            next();
        })
    }
    createServer() {
        const http = require('http');
        const server = http.createServer(this.#app);
        const io = initialaysSocket(server);
        socketHandler(io)
        server.listen(this.#PORT, () => {
            console.log(`run > http://localhost:${this.#PORT}`);
        })

    }

    connectToMongoDB() {
        mongoose.connect(this.#DB_URL);

        mongoose.connection.on('connected', () => {
            console.log('mongoose connected');
        });

        mongoose.connection.on('disconnected', () => {
            console.log('mongoose has been disconnected');
        });

        process.on('SIGINT', async () => {
            console.log('mongoose connection failed');
            await mongoose.connection.close();
            process.exit(0);
        });
    }

    initCookieSession() {

        this.#app.use(cookieParser(COOKIE_PARSER_SECET_KEY));
        this.#app.use(session({
            secret: COOKIE_PARSER_SECET_KEY,
            saveUninitialized: true,
            resave: true,
            cookie: {
                secure: true
            }
        }))
    }

    createRoutes() {
        this.#app.use(allRoutes)
    }

    errorHandller() {
        this.#app.use((req, res, next) => {
            next(createHttpError.NotFound('page not found'));
        })
        this.#app.use((err, req, res, next) => {
            const internalError = createHttpError.InternalServerError();
            const statuscode = err.statusCode || internalError.statusCode;
            const message = err.message || internalError.message;
            return res.status(statuscode).json({
                statuscode,
                message
            })
        })
    }
}
