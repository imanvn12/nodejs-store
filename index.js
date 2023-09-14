const Application = require("./app/server");

const DB_URL = 'mongodb://127.0.0.1:27017/nodejs-store';

new Application(4000, DB_URL)