const express = require('express');
const { default: mongoose } = require('mongoose');
const path = require('path');

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
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({ extended: true }));
        this.#app.use(express.static(path.join(__dirname, '..', 'public')));
    }

    createServer() {
        const http = require('http');
        http.createServer(this.#app).listen(this.#PORT, () => {
            console.log(`run > http://localhost:${this.#PORT}`);
        })
    }

    connectToMongoDB() {
        mongoose.connect(this.#DB_URL)
    }

    createRoutes() {

    }

    errorHandller() {
        this.#app.use((req, res, next) => {
            return res.status(404).json({
                status: 404,
                message: 'not found'
            })
        })
        this.#app.use((err, req, res, next) => {
            const statusCode = err.statusCode || 500;
            const message = err.message || 'internal error';
            return res.status(statusCode).json({
                status: statusCode,
                message: message
            })
        })
    }
}