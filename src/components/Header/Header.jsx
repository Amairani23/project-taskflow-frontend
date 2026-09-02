import logo from "../../images/icono-trans.png";
import { Link, useLocation } from 'react-router';
import NarBar from "./NarBar";

export default function Header({ userEmail, isLoggedIn, onLogout }) {
  
  const location = useLocation();

  return (
    <header className="flex items-center justify-between px-10 py-4 bg-[#02216B]">
      <img
        alt="Logotipo Around The U.S."
        className="w-20 h-20 object-contain"
        src={logo}
      />


      {!isLoggedIn && location.pathname === "/signin" && (
        <Link to="/signup" className="text-white font-semibold hover:text-blue-200">
          Regístrate
        </Link>
      )}

      {!isLoggedIn && location.pathname === "/signup" && (
        <Link to="/signin" className="text-white font-semibold hover:text-blue-200">
          Iniciar sesión
        </Link>
      )}

      {isLoggedIn && (
        <NarBar
          userEmail={userEmail}
          onLogout={onLogout}
        />
      )}
      
    </header>
  );
}
