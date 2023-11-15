const { AdminPermissionController } = require('../../http/controllers/admin/RBAC/permission.controller');

const router = require('express').Router();

router.post('/create', AdminPermissionController.createPermission);
router.get('/permissions', AdminPermissionController.getAllPermissions);
router.patch('/update/:id', AdminPermissionController.updatePermission);
router.delete('/delete/:id', AdminPermissionController.deletePermission);

module.exports = {
    AdminApiPermissionRouter: router
}