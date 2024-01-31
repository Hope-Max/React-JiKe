// 高级组件
// Redirect to Target Pages with token
// Redirect to Login Page without token

import { getToken } from "@/utils"
import { Navigate } from "react-router-dom"

const AuthRoute = ({ children }) => {
  const token = getToken()
  if (token) {
    return <>{children}</>
  }
  else {
    return <Navigate to={"./login"} replace></Navigate>
  }
}

export default AuthRoute