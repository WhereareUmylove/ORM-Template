import request from '@/utils/request'

export function getRole() {
    return request({
        url: '/system/rolelist',
        method: 'get',
    })
}
export function delRole(params) {
    return request({
        url: '/system/delrole',
        method: 'post',
        params: {
            ...params
        }
    })
}
export function getPermissionlist() {
    return request({
        url: '/system/permissionlist',
        method: 'get',
    })
}
export function getRolePermissionlist(params) {
    return request({
        url: '/system/rolepermissionlist',
        method: 'get',
        params: {
            ...params
        }
    })
}
export function addRole(params) {
    return request({
        url: '/system/addrole',
        method: 'post',
        data: {
            ...params
        }
    })
}
export function updateRolePermission(params) {
    return request({
        url: '/system/update/rolepermission',
        method: 'post',
        data: {
            ...params
        }
    })
}

export function getUserlist(params) {
    return request({
        url: '/system/userlist',
        method: 'get',
        params: {
            ...params
        }
    })
}
export function delUser(params) {
    return request({
        url: '/system/deleteuser',
        method: 'get',
        params: {
            ...params
        }
    })
}
export function addUser(params) {
    return request({
        url: '/system/adduser',
        method: 'post',
        data: {
            ...params
        }
    })
}
export function updateUser(params) {
    return request({
        url: '/system/update/user',
        method: 'post',
        data: {
            ...params
        }
    })
}
export function changeUserPwd(params) {
    return request({
        url: '/system/changepwd',
        method: 'post',
        data: {
            ...params
        }
    })
}
export function changeUserStatus(params) {
    return request({
        url: '/system/userstatus',
        method: 'post',
        data: {
            ...params
        }
    })
}
