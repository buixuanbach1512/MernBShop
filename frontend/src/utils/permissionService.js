const handlePermission = () => {
    const getUserFromSessionStorage = sessionStorage.getItem('user')
        ? JSON.parse(sessionStorage.getItem('user'))
        : null;
    const permissions = getUserFromSessionStorage.permissions;
    const newPermissions = [];
    permissions.forEach((item) => newPermissions.push(item.code));
    return newPermissions;
};

export default handlePermission;
