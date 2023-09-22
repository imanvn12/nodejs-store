const express = require('express');
const { default: mongoose } = require('mongoose');
const path = require('path');
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const { allRoutes } = require('./router/routes');
const morgan = require('morgan');
const createHttpError = require('http-errors');
// hiii
module.exports = class Application {
    #app = express();
    #PORT;
    #DB_URL;

    constructor(PORT, DB_URL) {
        this.#PORT = PORT;
        this.#DB_URL = DB_URL;
        this.configApplication();
        this.createServer(PORT);
        this.connectToMongoDB(DB_URL);
        this.createRoutes();
        this.errorHandller()
    }

    configApplication() {
        this.#app.use(morgan('dev'));
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({ extended: true }));
        this.#app.use(express.static(path.join(__dirname, '..', 'public')));
        this.#app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerJSDoc({
            swaggerDefinition: {
                info: {
                    title: 'great store',
                    version: '1.0.0',
                    description: 'the best store',
                    contact: {
                        name: 'imanvn',
                        email: 'valylyaniman56@gmail.com',
                        url: 'http://imanvn.com'
                    }
                },
                servers: {
                    url: 'http://localhost:4000'
                }
            },
            apis: ["./app/router/**/*.js"]
        })))
    }

    createServer() {
        const http = require('http');
        http.createServer(this.#app).listen(this.#PORT, () => {
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

    createRoutes() {
        this.#app.use(allRoutes)
    }

    errorHandller() {
        this.#app.use((req, res, next) => {
            next(createHttpError.NotFound('page not found'));
        })
        this.#app.use((err, req, res, next) => {
            const internalError = createHttpError.InternalServerError();
            const statusCode = err.statusCode || internalError.status;
            const message = err.message || internalError.message;
            return res.status(statusCode).json({
                statusCode,
                message
            })
        })
    }
}