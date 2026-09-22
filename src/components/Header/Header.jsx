import logo from "../../images/logo-horizontal-v.png"
import { Link, useLocation } from "react-router"
import NarBar from "./NarBar"

export default function Header({ userRole, isLoggedIn, onLogout }) {
  const location = useLocation()

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
        <NarBar onLogout={onLogout}/>
      )}
    </header>
  )
}
