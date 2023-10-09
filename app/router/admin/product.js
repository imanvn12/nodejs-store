const { AdminProductController } = require('../../http/controllers/admin/product');
const { uploadFile } = require('../../utils/multer');

const router = require('express').Router();

router.get("/products", AdminProductController.getProducts);
router.put('/create', uploadFile.array('images', 3), AdminProductController.createProduct);
router.patch('/update/:id', AdminProductController.editProduct);
router.get("/:id", AdminProductController.getProductByID);

module.exports = {
    AdminApiRoutes: router
}