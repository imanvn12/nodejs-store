const { AdminCourseController } = require('../../http/controllers/admin/course.controller');
const { uploadFile } = require('../../utils/multer');
const { adminApiChapterRouter } = require('./chapter');

const router = require('express').Router();


router.get('/courses', AdminCourseController.getAllCourses);
router.post('/create', uploadFile.single("image"), AdminCourseController.createCourse);
router.get('/:id', AdminCourseController.getCourseByID);
router.use('/chapter', adminApiChapterRouter)

module.exports = {
    AdminApiCourseRoutes: router
}