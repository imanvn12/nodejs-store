const { AdminRoleController } = require('../../http/controllers/admin/RBAC/role.controller');

const router = require('express').Router();

router.post('/create', AdminRoleController.createRole);
router.get('/roles', AdminRoleController.getAllRoles);
router.patch('/update/:id', AdminRoleController.updateRole);
router.delete('/delete/:field', AdminRoleController.deleteRole);

module.exports = {
    AdminApiRoleRouter: router
}