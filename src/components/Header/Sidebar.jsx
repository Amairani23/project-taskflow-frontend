import { useState } from "react"
import logo from "../../images/logo-horizontal-v.png"

export default function Sidebar({ userEmail, setSection, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleSection = (section) => {
    setSection(section)
    setIsMenuOpen(false)
  }

  return (
    <>
      {/* Botón hamburguesa - solo móvil */}
      <button
        type="button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed right-4 top-4 z-50 rounded-lg bg-[#02216B] p-3 text-white shadow-lg lg:hidden lg:flex
"
      >
        {isMenuOpen ? (
          // X
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 384 512"
          >
            <path
              fill="#fff"
              d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3l105.4 105.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256z"
            />
          </svg>
        ) : (
          // Hamburguesa
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 448 512"
          >
            <path
              fill="#fff"
              d="M0 96C0 78.3 14.3 64 32 64h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zm0 160c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm32 160h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32z"
            />
          </svg>
        )}
      </button>

      {/* Fondo oscuro cuando está abierto */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav
        className={`
          fixed left-0 top-0 z-40 flex h-screen w-64 flex-col
          bg-[#02216B] p-6 text-white shadow-xl
          transition-transform duration-300
          lg:translate-x-0
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <img alt="Logo" className="mb-5 w-full object-contain" src={logo} />
        <p className="text-1xl pb-6 text-[#07afa0]"> {userEmail}</p>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            className="rounded-lg px-4 py-3 text-left transition hover:bg-white/10"
            onClick={() => handleSection("inicio")}
          >
            Tablero
          </button>

          <button
            type="button"
            className="rounded-lg px-4 py-3 text-left transition hover:bg-white/10"
            onClick={() => handleSection("proyectos")}
          >
            Proyectos
          </button>

          <button
            type="button"
            className="rounded-lg px-4 py-3 text-left transition hover:bg-white/10"
            onClick={() => handleSection("tareas")}
          >
            Tareas
          </button>

          <button
            type="button"
            className="rounded-lg px-4 py-3 text-left transition hover:bg-white/10"
            onClick={() => handleSection("perfil")}
          >
            Usuarios
          </button>

          <button
            type="button"
            className="rounded-lg px-4 py-3 text-left transition hover:bg-white/10"
            onClick={() => {
              onLogout()
              setIsMenuOpen(false)
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </nav>
    </>
  )
}
