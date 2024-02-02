// Combine Redux submodules + Export the store instance - 组合redux子模块 + 导出store实例
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./modules/user";
import channelReducer from "./modules/channel"

const store = configureStore({
  reducer: {
    user: userReducer,
    channel: channelReducer
  }
})

export default store