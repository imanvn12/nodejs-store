const { StatusCodes } = require("http-status-codes");
const { userModel } = require("../../../model/users");
const Controller = require("./../controller");
const createHttpError = require("http-errors");


class AdminUserController extends Controller {
    async getAllUsers(req, res, next) {
        try {
            const { search } = req.query;
            const dataBaseQuery = {};
            if (search) {
                dataBaseQuery["$text"] = { $search: search };
            };
            const users = await userModel.find(dataBaseQuery);
            return res.status(StatusCodes.OK).json({
                statuscode: StatusCodes.OK,
                data: {
                    users
                }
            })
        } catch (error) {
            next(error);
        }
    }

    async updateProfile(req, res, next) {
        try {
            const { id } = req.user._id;
            const data = req.body;

            Object.keys(data).forEach(key => {
                if(['_id', 'phone', 'otp', 'roles'].includes(key)) delete data[key]
            });

            const user = await userModel.updateOne({ _id: id }, { $set: data });
            
            if(!user.modifiedCount) throw createHttpError.InternalServerError('profile did not update');

            return res.status(StatusCodes.CREATED).json({
                statuscode: StatusCodes.CREATED,
                data: {
                    message: 'profile updated successfully'
                }
            })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {
    AdminUserController: new AdminUserController()
}