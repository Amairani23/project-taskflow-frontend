import * as auth from "../utils/auth"
import { useNavigate } from "react-router-dom"
import InfoTooltip from "../components/Popup/InfoTooltip/InfoTooltip"

export const useRegister = (handleOpenPopup, handleClosePopup) => {
  const navigate = useNavigate()

  const handleRegistration = (data) => {
    auth
      .register(data)
      .then((res) => {
        console.log("Registro exitoso", res)
        handleOpenPopup({
          title: "",
          children: <InfoTooltip isSuccess={true} />,
        })

        setTimeout(() => {
          navigate("/signin")
          handleClosePopup()
        }, 2000)
      })
      .catch((err) => {
        console.log("Error registro", err)
        handleOpenPopup({
          title: "",
          children: <InfoTooltip isSuccess={false} />,
        })
      })
  }

  return {
    handleRegistration,
  }
}
