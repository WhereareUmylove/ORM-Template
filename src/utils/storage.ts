const TokenKey = 'vue_admin_session_storage_TokenKey'
const UserNameKey = 'vue_admin_session_storage_UserNameKey'
const UserPermissionKey = 'vue_admin_session_storage_PermissionKey'

export function getStorage() {
  return sessionStorage.getItem(TokenKey)
}

export function setStorage(token) {
  return sessionStorage.setItem(TokenKey, token)
}

export function removeStorage() {
  return sessionStorage.removeItem(TokenKey)
}

export function getUsername() {
  return sessionStorage.getItem(UserNameKey)
}

export function setUsername(username) {
  return sessionStorage.setItem(UserNameKey, username)
}

export function getPermission(current) {
  let p = JSON.parse(sessionStorage.getItem(UserPermissionKey) || '[]')
  for (let index = 0; index < p.length; index++) {
    const e = p[index];
    if (e.name === current) {
      return true
    }
  }
  return false
}

export function setPermission(permissionList) {
  sessionStorage.setItem(UserPermissionKey, JSON.stringify(permissionList))
}