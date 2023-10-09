// const express = require('express');
// const { default: mongoose } = require('mongoose');
// const morgan = require('morgan');
// const path = require('path');
// const { allRoutes } = require('./app/router/routes');
// const createHttpError = require('http-errors');


// class Application {

//     #app = express();
//     #PORT;
//     #DB_URL;   
    
    
//     constructor(PORT, DB_URL) {
//         this.#PORT = PORT;
//         this.#DB_URL = DB_URL;
//         this.configApplication();
//         this.createHttpServer(PORT);
//         this.configMongoDB(DB_URL);
//         this.createRoutes();
//         this.errorHandller();

//     }

//     configApplication() {
//         this.#app.use(morgan('dev'));
//         this.#app.use(express.json());
//         this.#app.use(express.urlencoded());
//         this.#app.use(express.static(path.join(__dirname, 'public')));
//     }

//     createHttpServer() {
//         const http = require('http');
//         http.createServer(this.#app).listen(this.#PORT, console.log(
//             `server run > http://localhost:${this.#PORT}`
//         ));
//     }

//     configMongoDB() {
//         mongoose.connect(this.#DB_URL, (err) => {
//             if (err) console.log(err);
//             else console.log('connect to mongo db');
//         });
//         mongoose.connection.on('connected', () => {
//             console.log('mongoose has been disconnected');
//         });
//         mongoose.connection.on('disconnected', () => {
//             console.log('diconnected mongo db');
//         });

//         process.on('SIGINT', async () => {
//             console.log('SIGINT error. mongoose connection closed');
//             await mongoose.connection.close();
//             process.exit(0)
//         });
//     }

//     createRoutes() {
//         this.#app.use(allRoutes)
//     }

//     errorHandller() {
//         this.#app.use((req, res, next) => {
//             next(createHttpError.NotFound('page not found'));
//         });

//         this.#app.use((err, req, res, next) => {
//             const internalerror = createHttpError.InternalServerError()
//             const statuscode = err.statusCode || internalerror.statusCode;
//             const message = err.message || internalerror.message;
//             return res.status(statuscode).json({
//                 statuscode,
//                 message
//             })
//         })
//     }
//     f() {

//     }
// }

// const DB_URL = 'mongodb://127.0.0.1:27017/nodejs-store';

// new Application(4000, DB_URL);