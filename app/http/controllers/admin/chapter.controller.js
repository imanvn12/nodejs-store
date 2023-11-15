const createHttpError = require('http-errors');
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

            const result = await courseModel.updateOne({ _id: id }, { $push: { chapters: { title, text } } });

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

    async chapterOfCourse(req, res, next) {
        try {
            const { id } = req.params;
            await AdminCourseController.findCourse(id);
            const chapter = await courseModel.findOne({ _id: id }, { chapters: 1, title: 1 });
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

    async deleteChapter(req, res, next) {
        try {
            const { chapterID } = req.params;
            const chapter = await courseModel.findOne({ "chapters._id": chapterID })
            if (!chapter) throw createHttpError.NotFound('Chapter not found')
            const deletechapter = await courseModel.updateOne({ "chapters._id": chapterID }, {
                $pull: {
                    chapters: {
                        _id: chapterID
                    }
                }
            });
            if (deletechapter.modifiedCount == 0) throw createHttpError.InternalServerError('did not delete');
            return res.status(StatusCodes.OK).json({
                statuscode: StatusCodes.OK,
                data: {
                    message: 'chapter deleted successfuly'
                }
            })
        } catch (error) {
            next(error);
        }
    }
    async updateChapter(req, res, next) {
        try {
            const { chapterID } = req.params;
            const data = req.body;
            const chapter = await courseModel.findOne({ "chapters._id": chapterID })
            if (!chapter) throw createHttpError.NotFound('Chapter not found');
            Object.keys(data).forEach(([key, value]) => {
                if (['', ' ', '0', 0, null, undefined].includes(key)) delete data[key];
                if (['', ' ', '0', 0, null, undefined].includes(data[value])) delete data[key];
                if (['_id'].includes(key)) delete data[key];
                // data[key] = data[key].trim();
                // data[value] = data[value].trim();
            });
            const updateChapter = await courseModel.updateOne({ "chapters._id": chapterID }, {
                $set: { "chapters.$":  data  }
            });
            if (updateChapter.modifiedCount == 0) throw createHttpError.InternalServerError('did not update');
            return res.status(StatusCodes.OK).json({
                statuscode: StatusCodes.OK,
                data: {
                    message: 'chapter updated successfuly'
                }
            })
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = {
    AdminChapterController: new AdminChapterController()
}