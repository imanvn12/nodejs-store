const jwt = require('jsonwebtoken');
const { userModel } = require('../../model/users');
const { SECRET_KEY } = require('../../utils/SECRET_KEYS.JS');
const createHttpError = require('http-errors');

async function verifyAccessToken(req, res, next) {
    try {
        const headers = req.headers;
        const [bearer, token] = headers?.authorization?.split(' ');
        if (token && ['bearer', 'Bearer'].includes(bearer)) {
            jwt.verify(token, SECRET_KEY, async (err, result) => {
                if (err) return next(createHttpError.Unauthorized('nashod2'));
                const { phone } = result || {};
                const user = await userModel.findOne({ phone });
                if (!user) return next(createHttpError.Unauthorized('nashod'));
                req.user = user
                return next()
            });
        }
    } catch (error) {
        next(createHttpError.Unauthorized('bro to accontet oskol'))
        next(error)
    }
}

module.exports = {
    verifyAccessToken
}