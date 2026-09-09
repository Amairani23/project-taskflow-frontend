import { useState } from "react"

import logo from "../../../images/logo-horizontal-v.png"

import Popup from "../../Popup/Popup"
import Dashboard from "./Dashboard/Dashboard"
import ProjectsAdmin from "./ProjectsAdmin/ProjectsAdmin"
import TaskAdmin from "./TaskAdmin/TaskAdmin"
import ProfileAdmin from "./ProfileAdmin/ProfileAdmin"
import { usePopup } from "../../../hooks/usePopup"

export default function MainAdmin() {
  const [section, setSection] = useState("inicio")

  const { popup, handleOpenPopup, handleClosePopup } = usePopup()

  return (
    <main className="flex min-h-screen bg-gray-100">
      {/* Navbar lateral */}
      <nav className="fixed left-0 top-0 flex h-screen w-64 flex-col bg-[#02216B]  p-6 text-white shadow-xl">
        <img
          alt="Logotipo Around The U.S."
          className="w-50  object-contain mb-10"
          src={logo}
        />

        <div className="flex flex-col gap-3 ">
          <a
            href="#"
            className="rounded-lg px-4 py-3 transition hover:bg-white/10"
            onClick={() => setSection("inicio")}
          >
            Tablero
          </a>

          <a
            href="#"
            className="rounded-lg px-4 py-3 transition hover:bg-white/10"
            onClick={() => setSection("proyectos")}
          >
            Proyectos
          </a>

          <a
            href="#"
            className="rounded-lg px-4 py-3 transition hover:bg-white/10"
            onClick={() => setSection("tareas")}
          >
            Tareas
          </a>

          <a
            href="#"
            className="rounded-lg px-4 py-3 transition hover:bg-white/10"
            onClick={() => setSection("perfil")}
          >
            Usuarios
          </a>
        </div>
      </nav>

      {/* Contenido */}
      <section className="ml-64 flex-1 p-8 bg-gradient-to-b from-[#02216B] to-[#CD4BE7]">
        {section === "inicio" && <Dashboard />}

        {section === "proyectos" && (
          <ProjectsAdmin handleOpenPopup={handleOpenPopup} />
        )}

        {section === "tareas" && (
          <TaskAdmin handleOpenPopup={handleOpenPopup} />
        )}

        {section === "perfil" && (
          <ProfileAdmin handleOpenPopup={handleOpenPopup} />
        )}
      </section>
      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  )
}
