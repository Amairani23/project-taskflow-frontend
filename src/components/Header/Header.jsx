import { usePopup } from "../../hooks/usePopup"
import { Link, useLocation } from "react-router"

import NarBar from "./NarBar"
import Popup from "../Popup/Popup"

import logo from "../../images/logo-horizontal-v.svg"

export default function Header({ userRole, isLoggedIn, onLogout }) {
  const location = useLocation()
  const { popup, handleOpenPopup, handleClosePopup } = usePopup()

  return (
    <header className="flex items-center justify-between px-10 py-4 bg-[#02216B]">
      <img
        alt="Logotipo TaskFlow."
        className="w-50  object-contain"
        src={logo}
      />

      {!isLoggedIn && location.pathname === "/signin" && (
        <Link
          to="/signup"
          className="text-white font-semibold hover:text-blue-200"
        >
          Regístrate
        </Link>
      )}

      {!isLoggedIn && location.pathname === "/signup" && (
        <Link
          to="/signin"
          className="text-white font-semibold hover:text-blue-200"
        >
          Iniciar sesión
        </Link>
      )}

      {isLoggedIn && userRole === "colaborador" && (
        <NarBar
          onLogout={onLogout}
          handleOpenPopup={handleOpenPopup}
          handleClosePopup={handleClosePopup}
        />
      )}

      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </header>
  )
}
