// Encapsulate the methods of Token
const TOKEN_KEY = "token_key"
const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token)
}
const getToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}
const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY)
}

export { setToken, getToken, removeToken }