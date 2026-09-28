import { usePopup } from "../../../hooks/usePopup"
import { useContext } from "react"

import Card from "./Cards/Card"
import Popup from "../../Popup/Popup"
import NewProject from "../../Popup/form/NewProject/NewProject"
import CurrentUserContext from "../../../contexts/CurrentUserContext"

import agregar from "../../../images/btn-add-project.svg"

export default function MainUsers({ userRole }) {
  const { projects, handleDeleteProject } = useContext(CurrentUserContext)
  const { popup, handleOpenPopup, handleClosePopup } = usePopup()

  const addProjectPopup = {
    title: "Nuevo proyecto",
    children: (
      <NewProject handleClosePopup={handleClosePopup} userRole={userRole} />
    ),
  }

  async function handleDeleteClick(projectId) {
    const deleted = await handleDeleteProject(projectId)

    if (deleted) {
      handleClosePopup()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#02216B] to-[#CD4BE7]">
      <main className="container mx-auto px-4 py-8">
        <div className="flex w-full justify-between mb-6">
          <h1 className="text-white text-4xl mb-10">Proyectos</h1>
          <button
            type="button"
            onClick={() => handleOpenPopup(addProjectPopup)}
            className="flex  items-center justify-center gap-3 rounded-xl border-2 border-dashed border-white/40 bg-white/10 px-4 text-lg font-semibold text-white transition hover:border-white/70 hover:bg-white/20 active:scale-[0.98]"
          >
            <img src={agregar} alt="" className="h-6 w-6 object-contain" />
            <span>Nuevo proyecto</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((card) => (
            <Card
              key={card._id}
              card={card}
              onOpenPopup={handleOpenPopup}
              onCardDelete={handleDeleteClick}
            />
          ))}
        </div>
      </main>
      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </div>
  )
}
