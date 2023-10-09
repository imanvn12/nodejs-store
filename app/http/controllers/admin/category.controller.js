const createHttpError = require("http-errors");
const Controller = require("../controller");
const { categoriesModel } = require('./../../../model/categories');
const { categoryValidationSchema } = require("../../validator/admin/category");

class categoryController extends Controller {
    async createCategory(req, res, next) {
        try {
            const { title, parents } = req.body;
            await categoryValidationSchema.validateAsync(req.body)
            const uniqueCategory = await categoriesModel.findOne({ title });
            if (uniqueCategory) next(createHttpError.BadRequest('category already exists'));
            const category = await categoriesModel.create({ title, parents });
            if (!category) next(createHttpError.InternalServerError('server error'));
            return res.status(201).json({
                statuscode: 201,
                success: true,
                message: 'category created successfully'
            })
        } catch (error) {
            next(error);
        }
    }
    editCategory(req, res, next) {
        try {

        } catch (error) {
            next(error);
        }
    }
    deleteCategory(req, res, next) {
        try {

        } catch (error) {
            next(error);
        }
    }
    getCategoryByID(req, res, next) {
        try {

        } catch (error) {
            next(error);
        }
    }
    async getAllCategory(req, res, next) {
        try {
            // const category = await categoriesModel.aggregate([
            //     {
            //         $graphLookup: {
            //             from: 'categories',
            //             startWith: '$_id',
            //             connectFromField: '_id',
            //             connectToField: 'parents',
            //             maxDepth: 5,
            //             depthField: 'depth',
            //             as: 'children'
            //         }
            //     }
            // ])
            const category = await categoriesModel.find({})
            return res.status(200).json({ category })
        } catch (error) {
            next(error);
        }
    }
    async getParentsCategory(req, res, next) {
        try {
            const category = await categoriesModel.find({ parents: undefined })
            return res.status(200).json({ category })
        } catch (error) {
            next(error);
        }
    }
    async getChildCategory(req, res, next) {
        try {
            const { parents } = req.params;
            const category = await categoriesModel.find({ parents });
            return res.status(200).json({ category })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {
    categoryController: new categoryController()
}