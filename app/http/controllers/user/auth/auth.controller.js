const createHttpError = require("http-errors");
const { authSchema } = require("../../../validator/user/auth.schema");
const { userModel } = require('./../../../../model/users');
const { randomNumber, findAccessToken } = require("../../../middlewares/functions");
const Controller = require("../../controller");

class UserAuthController extends Controller {
    async getOTP(req, res, next) {
        try {
            const { phone } = req.body;
            await authSchema.validateAsync(req.body);
            const code = randomNumber();
            const result = await this.saveUser(phone, code);
            if (!result) createHttpError.Unauthorized('login failed');
            return res.status(200).json({
                statusCode: 200,
                success: true,
                code,
                phone
            });

        } catch (error) {
            next(createHttpError.BadRequest(error.message))
        }
    }

    async checkOTP(req, res, next) {
        try {
            await authSchema.validateAsync(req.body);
            const { phone, code } = req.body;
            const user = await userModel.findOne({ phone });
            if (!user) createHttpError.Unauthorized('user not found');
            if (user.otp.code != code) next(createHttpError.Unauthorized('oTP code is not valid'));
            const now = Date.now();
            if (+user.otp.expiresIn < now) next(createHttpError.Unauthorized('otp code is expierd'));
            const accesToken = await findAccessToken(phone);
            return res.status(201).json({
                accesToken
            })
        } catch (error) {
            next(error)
        }
    }

    async saveUser(phone, code) {
        try {
            let otp = {
                code,
                expiresIn: new Date().getTime() + 120000
            };
            const result = await this.checkExistsUser(phone);
            if (result) {
                return !!(await this.updateUser(phone, { otp }));
            };
            return !!(await userModel.create({ phone, otp, roles: ['user'] }));
        } catch (error) {
            console.log(error);
        }
    }
    async checkExistsUser(phone) {
        try {
            const user = await userModel.findOne({ phone });
            return !!user
        } catch (error) {
            console.log(error);
        }
    }
    async updateUser(phone, objectDATA = {}) {
        try {
            Object.keys(objectDATA).forEach(key => {
                if (['', ' ', 0, '0', NaN, null, undefined].includes(objectDATA[key])) delete objectDATA[key]
            });
            const result = await userModel.updateOne({ phone }, { $set: objectDATA });
            return !!result.modifiedCount
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    UserAuthController: new UserAuthController()
}