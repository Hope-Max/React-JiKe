// All requests related to articles
// All requests related to users

import { request } from "@/utils"

// 2. Get Channel List
export function getChannelApi() {
  return request({
    url: "channels",
    method: "GET"
  })
}