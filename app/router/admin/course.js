const { AdminCourseController } = require('../../http/controllers/admin/course.controller');
const { uploadFile } = require('../../utils/multer');
const { adminApiChapterRouter } = require('./chapter');

const router = require('express').Router();


router.get('/courses', AdminCourseController.getAllCourses);
router.post('/create', uploadFile.single("image"), AdminCourseController.createCourse);
router.use('/chapter', adminApiChapterRouter)
router.patch('/update/:id', uploadFile.single("image"), AdminCourseController.updateCourse);
router.get('/:id', AdminCourseController.getCourseByID);

module.exports = {
    AdminApiCourseRoutes: router
}