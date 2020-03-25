function setToken(token) {
  localStorage.setItem('token', token)
}

function setName(name) {
  localStorage.setItem('name', name)
}

function getName() {
  return localStorage.getItem('name')
}

function isLoggedIn() {
  return !!localStorage.getItem('token')
}

function getToken() {
  return localStorage.getItem('token')
}

function logout() {
  localStorage.removeItem('token')
}

function getUserId() {
  const token = getToken()
  if (!token) return false
  const parts = token.split('.')
  return JSON.parse(atob(parts[1])).sub
}

export default {
  setToken,
  setName,
  isLoggedIn,
  getToken,
  getName,
  getUserId,
  logout
}