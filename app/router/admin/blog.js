const { BlogController } = require('../../http/controllers/admin/blogs.controller');
const { uploadFile } = require('../../utils/multer');

const router = require('express').Router();

router.post('/create', uploadFile.single("image"), BlogController.createBlog);
router.patch('/update/:id', BlogController.updateBlog);
router.get('/', BlogController.getAllBlogs);

module.exports = {
    blogRoutes: router
}