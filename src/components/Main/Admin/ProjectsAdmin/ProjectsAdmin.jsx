import agregar from "../../../../images/btn-add-project.png"
import editar from "../../../../images/editar.png"
import borrar from "../../../../images/borrar.png"

import NewProject from "../../../Popup/form/NewProject/NewProject"
import RemoveCard from "../../../Popup/RemoveCard/RemoveCard"
import EditProject from "../../../Popup/form/EditProject/EditProject"
import CurrentUserContext from "../../../../contexts/CurrentUserContext"
import { useState, useContext } from "react"

export default function ProjectsAdmin({ handleOpenPopup, handleClosePopup }) {
  const { projects, handleDeleteProject } = useContext(CurrentUserContext)
  const [projectToDelete, setProjectToDelete] = useState(null)

  const addProjectPopup = {
    title: "Nuevo proyecto",
    children: <NewProject handleClosePopup={handleClosePopup} />,
  }

  async function handleDeleteClick(projectId) {
    const deleted = await handleDeleteProject(projectId)

    if (deleted) {
      setProjectToDelete(null)
      handleClosePopup()
    }
  }

  return (
    <div>
      <main className="w-full px-2 py-6 sm:px-4 sm:py-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl text-white sm:text-4xl">Proyectos</h1>

          <button
            type="button"
            onClick={() => handleOpenPopup(addProjectPopup)}
            className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-dashed border-white/40 bg-white/10 px-4 py-3 text-base font-semibold text-white transition hover:border-white/70 hover:bg-white/20 active:scale-[0.98] sm:w-auto sm:text-lg"
          >
            <img src={agregar} alt="" className="h-6 w-6 object-contain" />
            <span>Nuevo proyecto</span>
          </button>
        </div>

        <div className="max-w-full overflow-x-auto rounded-xl bg-white shadow-lg">
          <table className="w-full min-w-[600px] text-left">
            <thead className="bg-[#02216B] text-white">
              <tr>
                <th className="px-3 py-3 text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                  Id
                </th>

                <th className="px-3 py-3 text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                  Fecha
                </th>

                <th className="px-3 py-3 text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                  Proyecto
                </th>

                <th className="px-3 py-3 text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                  Descripción
                </th>

                <th className="px-3 py-3 text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                  Asignados
                </th>

                <th className="px-3 py-3 text-right text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {[...projects]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((project, index) => {
                  return (
                    <tr
                      key={project._id}
                      className="transition hover:bg-gray-50"
                    >
                      <td className="px-3 py-3 text-sm font-medium text-gray-800 sm:px-6 sm:py-4">
                        {index + 1}
                      </td>

                      <td className="px-3 py-3 text-sm text-gray-600 sm:px-6 sm:py-4">
                        {new Date(project.createdAt).toLocaleDateString(
                          "es-MX",
                        )}
                      </td>

                      <td className="px-3 py-3 text-sm font-medium text-gray-800 sm:px-6 sm:py-4">
                        {project.titleProject}
                      </td>

                      <td className="px-3 py-3 text-sm text-gray-600 sm:px-6 sm:py-4">
                        {project.descriptionProject}
                      </td>

                      <td className="px-3 py-3 text-sm text-gray-600 sm:px-6 sm:py-4">
                        {project.assignedTo?.length
                          ? project.assignedTo
                              .map((user) => user.name)
                              .join(", ")
                          : "Sin asignar"}
                      </td>

                      <td className="px-3 py-3 sm:px-6 sm:py-4">
                        <div className="flex justify-end gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              handleOpenPopup({
                                title: "Editar proyecto",
                                children: (
                                  <EditProject
                                    project={project}
                                    handleClosePopup={handleClosePopup}
                                  />
                                ),
                              })
                            }
                          >
                            <img
                              src={editar}
                              alt="Editar"
                              className="w-7 sm:w-8"
                            />
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setProjectToDelete(project._id)

                              handleOpenPopup({
                                title: "",
                                children: (
                                  <RemoveCard
                                    onDelete={() =>
                                      handleDeleteClick(project._id)
                                    }
                                  />
                                ),
                              })
                            }}
                          >
                            <img
                              src={borrar}
                              alt="Eliminar"
                              className="w-7 sm:w-8"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
