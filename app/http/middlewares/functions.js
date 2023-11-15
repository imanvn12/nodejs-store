const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');
const { userModel } = require('../../model/users');
const crypto = require('crypto');
const { SECRET_KEY } = require('../../utils/SECRET_KEYS.JS');
const path = require('path');
const fs = require('fs');
const moment = require('moment-jalali');

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


function deleteFile(file) {
    const pathfile = path.join(__dirname, '..', '..', '..', 'public', file);
    fs.unlinkSync(pathfile);
}


function stringToArray(value) {
    value = value.trim().split(',');


}

function arrayImages(files, imagepath) {
    if (files?.length > 0) {
        return (files.map(files => path.join('' + imagepath, files?.filename)))
    } else {
        return []
    }
}



function getTime(seconds) {
    let total = Math.round(seconds) / 60;
    let [min, persent] = String(total).split('.');
    let second = Math.round((persent * 60) / 100).toString().substring(0, 2);
    let hour = 0;
    if (min > 60) {
        total = min / 60;
        let [h1, m1] = String(total).split('.');
        hour = h1;
        min = Math.round((m1 * 60) / 100).toString().substring(0, 2);

    }
    return (hour + ":" + min + ":" + second)
}


function getTotalTimeOfChapters(chapters = []) {
    let time, hour, min, second = 0;
    for (const chapter of chapters) {
        for (const episode of chapter.episodes) {
            if (episode?.video) time = episode?.video?.trim(":");
            else time = "00:00:00".trim(":")
            if (time.length == 3) {
                second += Number(time[0]) * 3600;
                second += Number(time[1]) * 60;
                second += Number(time[2]);
            } else if (time.length == 3) {
                second += Number(time[0]) * 60;
                second += Number(time[1]);
            }
        }
    }
    hour = Math.floor(second / 3600);
    min = Math.floor(second / 60) % 60;
    hour = Math.floor(second % 60);

    // return `${hour}:${min}:${second}`
    return (hour + ":" + min + ":" + second)
}




function strToArray(field = []) {
    try {

        req.body[field] = Array(field);
        req.body.field.forEach(item => {
            if (item === "string") {
                item.trim();
                item.split(",")
            } else {
                item.toString().trim().split(",");
            }
        });

        // next()
    } catch (error) {
        // next(error)
        console.log(error);
    }
}

function copyObject(object) {
    return JSON.parse(JSON.stringify(object));
}

function invoiceNumberGenerator() {
    return moment().format("YYYYMMDDHHmmssSSS") + String(process.hrtime()[1]).padStart(9, 0)
}

module.exports = {
    randomNumber,
    findAccessToken,
    deleteFile,
    stringToArray,
    arrayImages,
    getTime,
    getTotalTimeOfChapters,
    strToArray,
    copyObject,
    invoiceNumberGenerator
}