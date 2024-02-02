import { useEffect, useState } from "react"
import { getChannelApi } from "@/apis/article"

const useChannel = () => {
  const [channelList, setChannelList] = useState([])
  useEffect(() => {
    const getChannelList = async () => {
      const res = await getChannelApi()
      setChannelList(res.data.channels)
    }
    getChannelList()
  }, [])
  return { channelList }
}

export { useChannel }