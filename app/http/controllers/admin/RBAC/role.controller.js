const createHttpError = require('http-errors');
const { roleModel } = require('./../../../../model/roles');
const Controller = require('./../../controller');
const { StatusCodes } = require('http-status-codes');
const { RBACvalidator } = require('./../../../validator/admin/RBAC');
const { strToArray, copyObject } = require('../../../middlewares/functions');
const { default: mongoose } = require('mongoose');

class AdminRoleController extends Controller {
    async createRole(req, res, next) {
        try {

            const { title, permissions } = req?.body;

            function strtoarray(str = []) {
                str = str.split(",");
                if (str.length <= 1) { str = str };
                return str
            }

            console.log(strtoarray(permissions));

            await RBACvalidator.validateAsync({ title, permissions: strtoarray(permissions) })



            await this.findRole(title);

            const role = await roleModel.create({ title, permissions: strtoarray(permissions) });
            if (!role) throw createHttpError.InternalServerError('role did not create');

            return res.status(StatusCodes.CREATED).json({
                statuscode: StatusCodes.CREATED,
                data: {
                    message: 'Role created successfully'
                }
            })
        } catch (error) {
            next(error);
        }
    }
    async getAllRoles(req, res, next) {
        try {
            const roles = await roleModel.find({});
            return res.status(StatusCodes.OK).json({
                statuscode: StatusCodes.OK,
                data: {
                    roles
                }
            })
        } catch (error) {
            next(error);
        }
    }
    async updateRole(req, res, next) {
        try {
            const { id } = req.params;
            const data = copyObject(req.body)
            const role = await roleModel.findById(id);
            if (!role) throw createHttpError.NotFound('role with this id did not found');
            const updateRole = await roleModel.updateOne({_id : role._id}, {$set: data});
            if(!updateRole.modifiedCount) throw createHttpError.InternalServerError('role did not update')
            return res.status(StatusCodes.CREATED).json({
                statuscode: StatusCodes.CREATED,
                data: {
                    message: 'role updated successfully'
                }
            })
        } catch (error) {
            next(error);
        }
    }
    async deleteRole(req, res, next) {
        try {
            const { field } = req.params;
            console.log(field);
            const role = await this.findRoleQuery(field);
            const deleteRole = await roleModel.deleteOne({ _id: role._id });
            if (!deleteRole.deletedCount) throw createHttpError.InternalServerError('role did not delete');
            return res.status(StatusCodes.OK).json({
                statuscode: StatusCodes.OK,
                data: {
                    message: 'role deleted successfully'
                }
            })
        } catch (error) {
            next(error);
        }
    }

    async findRole(title) {
        const findrole = await roleModel.findOne({ title });
        if (findrole) throw createHttpError.BadRequest('this role is already exist');
        return findrole
    }
    async findRoleQuery(field) {
        let searchQuery = mongoose.isValidObjectId(field) ? { _id: field } : { title: field };
        const findrole = await roleModel.findOne(searchQuery);
        if (!findrole) throw createHttpError.BadRequest('does not exist');
        return findrole
    }
}

module.exports = {
    AdminRoleController: new AdminRoleController()
}