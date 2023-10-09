const { AdminChapterController } = require('../../http/controllers/admin/chapter.controller');

const router = require('express').Router();

router.patch('/addchapter/:id', AdminChapterController.addChapter);


module.exports = {
    adminApiChapterRouter: router
}