const { AdminUserController } = require('../../http/controllers/admin/user.controller');

const router = require('express').Router();

router.get('/allusers', AdminUserController.getAllUsers);
router.patch('/updateprofile', AdminUserController.updateProfile);

module.exports = {
    AdminApiUserRouter: router
}