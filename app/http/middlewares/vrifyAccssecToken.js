const jwt = require('jsonwebtoken');
const { userModel } = require('../../model/users');
const { SECRET_KEY } = require('../../utils/SECRET_KEYS.JS');
const createHttpError = require('http-errors');


async function verifyAccessToken(req, res, next) {
    try {
        const headers = req.headers || req.header;
        const [bearer, token] = headers?.authorization?.split(' ') || [];
        if (token && ['bearer', 'Bearer'].includes(bearer)) {
            jwt.verify(token, SECRET_KEY, async (err, result) => {
                if (err) return next(createHttpError.Unauthorized('nashod2'));
                const { phone } = result || {};
                const user = await userModel.findOne({ phone });
                if (!user) return next(createHttpError.Unauthorized('nashod'));
                req.user = user;
                return next()
            })
        } else {
            return next(createHttpError.Unauthorized('bro to accontet oskol'))
        }
    } catch (error) {
        next(error)
    }
}


async function verifyAccessTokenInGraphql(req) {
    try {
        const headers = req.headers || req.header;
        const [bearer, token] = headers?.authorization?.split(' ') || [];
        if (token && ['bearer', 'Bearer'].includes(bearer)) {

            const { phone } = jwt.verify(token, SECRET_KEY);

            const user = await userModel.findOne({ phone });
            if (!user) throw new createHttpError.Unauthorized('nashod');

            return user
        } else {
            throw new createHttpError.Unauthorized('bro to accontet')
        }
    } catch (error) {
        throw new createHttpError.Unauthorized()
    }
}



module.exports = {
    verifyAccessToken,
    verifyAccessTokenInGraphql
}