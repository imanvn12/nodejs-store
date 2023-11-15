const { StatusCodes } = require('http-status-codes');
const { PermissionModel } = require('./../.././../../model/permissions');
const Controller = require('./../../controller');
const { RBACperValidator } = require('../../../validator/admin/RBAC');

class AdminPermissionController extends Controller {
    async createPermission(req, res, next) {
        try {
            const { title, description } = await RBACperValidator.validateAsync(req.body);

            await this.findPermission(title);

            const permission = await PermissionModel.create({ title, description });
            if (!permission) throw createHttpError.InternalServerError('permission did not create');

            return res.status(StatusCodes.CREATED).json({
                statuscode: StatusCodes.CREATED,
                data: {
                    message: 'permission created successfully'
                }
            })
        } catch (error) {
            next(error);
        }
    }
    async getAllPermissions(req, res, next) {
        try {
            const permissions = await PermissionModel.find({})
            return res.status(StatusCodes.OK).json({
                statuscode: StatusCodes.OK,
                data: {
                    permissions
                }
            })
        } catch (error) {
            next(error);
        }
    }
    async updatePermission(req, res, next) {
        try {

        } catch (error) {
            next(error);
        }
    }
    async deletePermission(req, res, next) {
        try {

        } catch (error) {
            next(error);
        }
    }
    async findPermission(title) {
        const findpermission = await PermissionModel.findOne({ title });
        if (findpermission) throw createHttpError.BadRequest('this permission is already exist');
        return findpermission
    }
}

module.exports = {
    AdminPermissionController: new AdminPermissionController()
}