const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'bestiari2026'

export function loginAdmin(password) {
  if (password === ADMIN_PASSWORD) {
    localStorage.setItem('admin_token', btoa(password))
    return true
  }
  return false
}

export function isAdminLoggedIn() {
  return !!localStorage.getItem('admin_token')
}

export function logoutAdmin() {
  localStorage.removeItem('admin_token')
}
