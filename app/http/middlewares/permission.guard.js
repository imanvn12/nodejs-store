function checkPermissions(requiredPermission = []) {
    return async function (req, res, next) {
        try {
            const user = req?.user;

            const role = await roleModel.findOne({ title: user?.role });

            const permission = await PermissionModel.find({ _id: { $in: role?.permissions } });

            const userPermissions = permission.map(item => item.title);

            const hasPermission = requiredPermission.every(permission => {
                return userPermissions.includes(permission)
            });

            if (hasPermission.length == 0 || hasPermission == false) throw createHttpError.Forbidden('you can not access to this page');
            return next()
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    checkPermissions
}