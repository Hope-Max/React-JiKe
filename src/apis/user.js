// All requests related to users

import { request } from "@/utils"

// 1. Login Request
export function loginApi(data) {
  return request({
    url: "/authorizations",
    method: "POST",
    data
  })
}

// 2. Get User Profile
export function getUserProfileApi() {
  return request({
    url: "/user/profile",
    method: "GET"
  })
}