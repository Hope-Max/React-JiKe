import { createSlice } from "@reduxjs/toolkit";
import { getChannelApi } from "@/apis/article";

const channelStore = createSlice({
  name: "channel",
  initialState: {
    channelList: []
  },
  reducers: {
    setChannel(state, action) {
      state.channelList = action.payload
    }
  }
})

const { setChannel } = channelStore.actions
const fetchChannel = () => {
  return async (dispatch) => {
    const res = await getChannelApi()
    dispatch(setChannel(res.data.channels))
  }
}
export { fetchChannel }

const reducer = channelStore.reducer
export default reducer