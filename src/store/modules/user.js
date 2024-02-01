// State management related to users - 和用户相关的状态管理
import { createSlice } from "@reduxjs/toolkit";
import { setToken as _setToken, getToken, removeToken } from "@/utils";
import { getUserProfileApi, loginApi } from "@/apis/user";

const userStore = createSlice({
  name: "user",
  // States - 数据状态
  initialState: {
    // Token persistence - Token持久化
    token: getToken() || "",
    userInfo: {}
  },
  // Sync actions - 同步修改方法
  reducers: {
    setToken(state, action) {
      state.token = action.payload
      // Store the token locally
      _setToken(action.payload)
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload
    },
    clearUserInfo(state) {
      state.userInfo = {}
      state.token = ""
      removeToken()
    }
  }
})

// actionCreator
const { setToken, setUserInfo, clearUserInfo } = userStore.actions
// Async actions - obtain token after completing login sucessful
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    // Send async request
    const res = await loginApi(loginForm)
    // Submit sync action to store the token
    dispatch(setToken(res.data.token))
  }
}

const fetchUserInfo = () => {
  return async (dispatch) => {
    const res = await getUserProfileApi()
    dispatch(setUserInfo(res.data))
  }
}

export { fetchLogin, fetchUserInfo, clearUserInfo }

const reducer = userStore.reducer
export default reducer