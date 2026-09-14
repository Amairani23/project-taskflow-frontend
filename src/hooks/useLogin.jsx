import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import * as auth from "../utils/auth"
import { setToken, getToken, removeToken } from "../utils/token"
import InfoTooltip from "../components/Popup/InfoTooltip/InfoTooltip"

export const useLogin = (handleOpenPopup, handleClosePopup) => {
  const [userEmail, setUserEmail] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  const navigate = useNavigate()

  const handleLogin = ({ email, password }) => {
    handleClosePopup
    if (!email || !password) {
      return
    }

    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          setToken(data.token)
          setUserEmail(email)
          setIsLoggedIn(true)
          if (data.user.systemRol === "admin") {
            navigate("/admin")
          } else {
            navigate("/dashboard")
          }
        }
      })
      .catch((err) => {
        console.log("Error", err)
        handleOpenPopup({
          title: "",
          children: <InfoTooltip isSuccess={false} />,
        })
      })
  }

  const handleLogout = () => {
    removeToken()
    setIsLoggedIn(false)
    setUserEmail("")
    navigate("/signin")
  }

  useEffect(() => {
    const jwt = getToken()

    if (!jwt) {
      return
    }

    auth
      .checkToken(jwt)
      .then((data) => {
        setIsLoggedIn(true)
        setUserEmail(data.email)
      })
      .catch((err) => {
        console.log(err)
        removeToken()
        setIsLoggedIn(false)
        setUserEmail("")
      })
  }, [])

  return {
    userEmail,
    isLoggedIn,
    handleLogin,
    handleLogout,
  }
}
