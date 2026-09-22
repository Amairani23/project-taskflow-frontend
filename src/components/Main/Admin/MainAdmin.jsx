import { useState } from "react"
import { usePopup } from "../../../hooks/usePopup"

import Popup from "../../Popup/Popup"
import Dashboard from "./Dashboard/Dashboard"
import ProjectsAdmin from "./ProjectsAdmin/ProjectsAdmin"
import TaskAdmin from "./TaskAdmin/TaskAdmin"
import ProfileAdmin from "./ProfileAdmin/ProfileAdmin"
import Sidebar from "../../Header/Sidebar"

export default function MainAdmin({  onLogout }) {
  const [section, setSection] = useState("inicio")
  const { popup, handleOpenPopup, handleClosePopup } = usePopup()

  return (
    <main className="flex min-h-screen bg-gradient-to-b from-[#02216B] to-[#CD4BE7]">
      {/* Navbar lateral */}
      <Sidebar
        setSection={setSection}
        onLogout={onLogout}
        handleOpenPopup={handleOpenPopup}
        handleClosePopup={handleClosePopup}
      />

      {/* Contenido */}
      <section className="min-h-screen w-full lg:ml-64 flex-1 p-8 ">
        {section === "inicio" && <Dashboard />}

        {section === "proyectos" && (
          <ProjectsAdmin
            handleOpenPopup={handleOpenPopup}
            handleClosePopup={handleClosePopup}
          />
        )}

        {section === "tareas" && (
          <TaskAdmin
            handleOpenPopup={handleOpenPopup}
            handleClosePopup={handleClosePopup}
          />
        )}

        {section === "perfil" && (
          <ProfileAdmin handleOpenPopup={handleOpenPopup} handleClosePopup={handleClosePopup} />
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
