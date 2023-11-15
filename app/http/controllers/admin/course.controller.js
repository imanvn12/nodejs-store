const { StatusCodes } = require("http-status-codes");
const { courseModel } = require("../../../model/course");
const Controller = require("../controller");
const { courseValidator } = require("../../validator/admin/course");
const path = require("path");
const createHttpError = require("http-errors");
const { default: mongoose } = require("mongoose");
const { deleteFile } = require("../../middlewares/functions");

class AdminCourseController extends Controller {
    async getAllCourses(req, res, next) {
        try {
            const { search } = req.query;
            let courses;
            if (search) {
                courses = await courseModel.find({
                    $text: {
                        $search: search
                    }
                }).populate([
                    { path: "teacher", select: { phone: 1 } }
                ])
            } else {
                courses = await courseModel.find({}).populate([
                    { path: "teacher", select: { phone: 1 } }
                    // { path: "chapters", select: {"episodes._id" : 0}}
                ]).sort({ _id: -1 })
            }


            return res.status(StatusCodes.OK).json({
                statuscode: StatusCodes.OK,
                success: true,
                courses
            });
        } catch (error) {
            next(error);
        }
    }
    async createCourse(req, res, next) {
        try {
            await courseValidator.validateAsync(req.body);
            req.body.image = path.join(req.body.imagepath, req.body.filename).replace(/\\/g, "/");
            const image = req.body.image;
            req.body.tags = req.body.tags.split(',');
            const { title, description, shortdescription, type, tags } = req.body;
            const teacher = req.user._id;
            const course = await courseModel.create({ title, shortdescription, description, type, teacher, image, tags });
            if (!course._id) throw createHttpError.InternalServerError('did not create');

            return res.status(StatusCodes.CREATED).json({
                statuscode: StatusCodes.CREATED,
                success: true,
                data: {
                    message: 'created successfully',
                    course
                }
            })
        } catch (error) {
            next(error);
        }
    }

    async updateCourse(req, res, next) {
        try {
            const { id } = req.params;
            const course = await courseModel.findOne({ _id: id });
            if (!course) throw createHttpError.NotFound('course not found');
            const data = req.body;
            const { imagepath, filename } = data;
            req.body.image = path.join(imagepath, filename).replace(/\\/g, "/");
            Object.keys(data).forEach(key => {
                if(data[key] == null || undefined) {
                    key = course.find(value => value == data[key]);
                }
                key = key.trim();
                if (['', ' ', '0', 0, null].includes(key)) delete data[key];
                if (['_id', 'dislike', 'bookmark', 'like', 'imagepath', 'filename', 'chapters'].includes(data)) delete data[key];
            });
            console.log(data);

            if (req.body.image) {
                // deleteFile(course.image)
            };

            const updatedCourse = await courseModel.updateOne({_id: id}, {
                $set: {...data}
            })

            if(!updatedCourse.modifiedCount) throw createHttpError.InternalServerError('course did not update');

            return res.status(StatusCodes.CREATED).json({
                statuscode: StatusCodes.CREATED,
                data: {
                    message: 'Course updated successfully'
                }
            })

        } catch (error) {
            next(error);
        }
    }
    async getCourseByID(req, res, next) {
        try {
            const { id } = req.params;
            const course = await courseModel.findById(id);
            if (!course) throw createHttpError.NotFound('course not found');
            return res.status(StatusCodes.OK).json({
                statuscode: StatusCodes.OK,
                success: true,
                course
            })
        } catch (error) {
            next(error);
        }
    }


    async findCourse(id) {
        if (!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest('invalid id');
        const course = courseModel.findById(id);
        if (!course) throw createHttpError.NotFound('course not found');
        return course
    }

}


module.exports = {
    AdminCourseController: new AdminCourseController()
}