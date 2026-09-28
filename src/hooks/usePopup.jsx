import { useState } from "react"

export const usePopup = () => {
  const [popup, setPopup] = useState(null)

  function handleOpenPopup(popup) {
    setPopup(popup)
  }

  function handleClosePopup() {
    setPopup(null)
  }

  return {
    popup,
    handleOpenPopup,
    handleClosePopup,
  }
}
