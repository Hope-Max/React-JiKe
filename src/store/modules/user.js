// State management related to users - 和用户相关的状态管理
import { createSlice } from "@reduxjs/toolkit";
import { request } from "@/utils/request"
import { setToken as _setToken, getToken } from "@/utils";

const userStore = createSlice({
  name: "user",
  // States - 数据状态
  initialState: {
    // Token persistence - Token持久化
    token: getToken() || ""
  },
  // Sync actions - 同步修改方法
  reducers: {
    setToken(state, action) {
      state.token = action.payload
      // Store the token locally
      _setToken(action.payload)
    }
  }
})

// actionCreator
const { setToken } = userStore.actions
// Async actions - obtain token after completing login sucessful
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    // Send async request
    const res = await request.post("/authorizations", loginForm)
    // Submit sync action to store the token
    dispatch(setToken(res.data.token))
  }
}
export { fetchLogin }

const reducer = userStore.reducer
export default reducer