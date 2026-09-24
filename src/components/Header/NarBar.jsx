import { useContext, useState } from "react"

import CurrentUserContext from "../../contexts/CurrentUserContext"
import EditUsers from "../Popup/form/EditUsers/EditUsers"

export default function NarBar({
  onLogout,
  handleOpenPopup,
  handleClosePopup,
}) {
  const [open, setOpen] = useState(false)
  const { userInfo } = useContext(CurrentUserContext)

  const editUserInfo = {
    title: "Editar perfil",
    children: <EditUsers user={userInfo} handleClosePopup={handleClosePopup} />,
  }

  return (
    <nav className="bg-[#02216B] text-white">
      <div className="flex items-center justify-between px-10 py-4">
        {/* Botón hamburguesa - solo móvil */}
        <button
          className="md:hidden cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? (
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

        <ul
          className={`${open ? "flex" : "hidden"} md:flex
            flex-col md:flex-row
            gap-4 md:gap-8
            absolute md:static
            top-[72px] left-0
            w-full md:w-auto
            bg-[#02216B] md:bg-transparent
            px-10 md:px-0
            py-4 md:py-0`}
        >
          <li>
            <div className="flex items-center gap-3">
              <div className="group relative h-12 w-12">
                <img
                  src={userInfo?.avatar}
                  alt={userInfo?.name || "Usuario"}
                  className="h-12 w-12 rounded-full border-2 border-gray-600 object-cover"
                />

                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <button
                    type="button"
                    className="text-white rotate-[100deg]"
                    aria-label="Editar perfil"
                    onClick={() => handleOpenPopup(editUserInfo)}
                  >
                    ✎
                  </button>
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white">
                  {userInfo?.name}
                </span>

                <span className="text-xs text-gray-400">{userInfo?.email}</span>
              </div>
            </div>
          </li>

          <li>
            <a
              className="hover:text-[#CD4BE7] transition-colors"
              href="#"
              onClick={(e) => {
                e.preventDefault()
                onLogout()
                setOpen(false)
              }}
            >
              Cerrar sesión
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
