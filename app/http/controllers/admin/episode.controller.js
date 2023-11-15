const { getVideoDurationInSeconds } = require('get-video-duration');
const { episodeValidator } = require('./../../validator/admin/episode');
const Controller = require('./../controller');
const path = require('path');
const { getTime } = require('../../middlewares/functions');
const { courseModel } = require('../../../model/course');
const createHttpError = require('http-errors');
const { StatusCodes } = require('http-status-codes');




class AdminEpisodeController extends Controller {
    async createEpisode(req, res, next) {
        try {
            const { title, text, type, filename, videopath, chapterID, courseID } = await episodeValidator.validateAsync(req.body);
            const videospath = path.join(videopath, filename + '').toString().replace(/\\/g, '/');
            console.log(videospath);
            const videourl = `http://localhost:4000/${videospath}`;
            console.log(videourl);
            const seconds = await getVideoDurationInSeconds('' + videourl);
            console.log(seconds);
            const video = getTime(seconds);
            console.log(video);

            const episode = await courseModel.updateOne({ _id: courseID, "chapters._id": chapterID }, {
                $push: {
                    "chapters.$.episodes": {
                        episodes: { title, text, type, video, videoaddress: videospath }
                    }
                }
            })
            if (!episode.modifiedCount) throw createHttpError.InternalServerError('Episode did not create')
            return res.status(StatusCodes.CREATED).json({
                statuscode: StatusCodes.CREATED,
                data: {
                    message: 'episode created successfully'
                }
            })

        } catch (error) {
            next(error);
        }
    }

    async deleteEpisode(req, res, next) {
        try {
            const { episodeID } = req.params;
            const findepisode = await courseModel.findOne({ "chapters.episodes._id": episodeID });
            if (!findepisode) throw createHttpError.NotFound('Episode not found')
            const episode = await courseModel.updateOne({ "chapters.episodes._id": episodeID }, {
                $pull: {
                    "chapters.$.episodes": {
                        _id: episodeID
                    }
                }
            });
            if (episode.modifiedCount == 0) throw createHttpError.InternalServerError('episode did not delete');
            return res.status(StatusCodes.OK).json({
                statuscode: StatusCodes.OK,
                data: {
                    message: 'episode deleted successfuly'
                }
            })

        } catch (error) {
            next(error)
        }
    }
    async updateEpisode(req, res, next) {
        try {
            const { episodeID } = req.params;
            const { videopath, filename } = req.body;
            const data = req.body;
            Object.keys(data).forEach(key => {
                if (['', ' ', '0', 0, null].includes(key)) delete data[key];
                if (['_id'].includes(key)) delete data[key];
            })

            if (videopath && filename) {
                const videospath = path.join(videopath, filename + '').toString().replace(/\\/g, '/');
                const videourl = `http://localhost:4000/${videospath}`;
                const seconds = await getVideoDurationInSeconds('' + videourl);
                req.body.video = getTime(seconds);
            }

            const episode = await courseModel.updateOne({ "chapters.episodes._id": episodeID }, {
                $set: {
                    "chapters.$.episodes": {
                        episodes: { ...data }
                    }
                }
            })

            if (!episode.modifiedCount) throw createHttpError.InternalServerError('episode did not update');

            return res.status(StatusCodes.OK).json({
                statuscode: StatusCodes.OK,
                data: {
                    message: 'Episodes updated successfully'
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    AdminEpisodeController: new AdminEpisodeController()
}