const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');
const { userModel } = require('../../model/users');
const crypto = require('crypto');
const { SECRET_KEY } = require('../../utils/SECRET_KEYS.JS');

function randomNumber() {
    return ((Math.random(Math.floor()) * 90000) + 10000)
}

function createHash() {
    const salt = crypto.randomBytes(32).toString('hex');
    console.log(salt);
    // e81c04c73cf39c6c66b2124b25f3f82a8d7c7c937320e032320c53197f38e90a
    // f88d3dfbe4a01aa8b274468c4c542ddf13de32ed9bdaf167cd87afcf6b786015
}
// createHash();

function findAccessToken(phoneOfUser) {
    return new Promise(async (resolve, reject) => {
        const user = await userModel.findOne({ phone: phoneOfUser })
        const payload = {
            phone: user.phone
        };
        const secretKey = SECRET_KEY;
        jwt.sign(payload, secretKey, { expiresIn: '1y' }, (err, result) => {
            if (err) reject(err);
            resolve(result)
        });
    })
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5MDE1MjM5MjI0IiwiaWF0IjoxNjk1MTE1MTcyLCJleHAiOjE3MjY2NzI3NzJ9.zAtnObQwM3hMiLvGE2adcbb9KaKYyG9lWHNzWNfMU7k
}




module.exports = {
    randomNumber,
    findAccessToken
}