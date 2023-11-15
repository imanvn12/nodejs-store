const { AdminChapterController } = require('../../http/controllers/admin/chapter.controller');
const { AdminApiEpisodeRouter } = require('./episode');

const router = require('express').Router();


router.patch('/addchapter/:id', AdminChapterController.addChapter);
router.get('/:id', AdminChapterController.chapterOfCourse);
router.patch('/delete/:chapterID', AdminChapterController.deleteChapter);
router.patch('/update/:chapterID', AdminChapterController.updateChapter);
router.use('/episode', AdminApiEpisodeRouter);


module.exports = {
    adminApiChapterRouter: router
}