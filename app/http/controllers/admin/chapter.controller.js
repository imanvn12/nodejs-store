const { courseModel } = require('../../../model/course');
const Controller = require('./../controller');
const { AdminCourseController } = require('./course.controller');
const { StatusCodes } = require('http-status-codes')



class AdminChapterController extends Controller {
    async addChapter(req, res, next) {
        try {
            const { id } = req.params;
            const { title, text } = req.body;

            await AdminCourseController.findCourse(id);

            const result = await courseModel.updateOne({ _id: id }, { $push: { chapters: title, text, episodes } });

            if (result.modifiedCount == 0) throw createHttpError.InternalServerError('did not update');

            return res.status(StatusCodes.CREATED).json({
                statuscode: StatusCodes.CREATED,
                data: {
                    message: 'chapters added successfully'
                }
            })
        } catch (error) {
            next(error);
        }
    }

    async chaptersOfCourse(req, res, next) {
        try {
            const { id } = req.params;
            await AdminCourseController.findCourse(id);
            const chapter = await courseModel.findOne({ _id: id }, { chapters: 1 });
            return res.status(StatusCodes.OK).json({
                statuscode: StatusCodes.OK,
                data: {
                    chapter
                }
            })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {
    AdminChapterController: new AdminChapterController()
}