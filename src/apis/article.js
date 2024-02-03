// All requests related to articles
// All requests related to users

import { request } from "@/utils"

// 1. Get Channel List
export function getChannelApi() {
  return request({
    url: "channels",
    method: "GET"
  })
}

// 2. Post Form Data
export function createArticleApi(data) {
  return request({
    url: "/mp/articles?draft=false",
    method: "POST",
    data
  })
}

// 3. Get Article List
export function getArticleListApi(params) {
  return request({
    url: "/mp/articles",
    method: "GET",
    params
  })
}