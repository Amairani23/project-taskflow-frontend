import { projects } from "../../../../data/projects"
import { users } from "../../../../data/users"

import agregar from "../../../../images/btn-add-project.png"
import editar from "../../../../images/editar.png"
import borrar from "../../../../images/borrar.png"

import NewProject from "../../../Popup/form/NewProject/NewProject"
import RemoveCard from "../../../Popup/RemoveCard/RemoveCard"
import EditProjects from "../../../Popup/form/EditProjects/EditProjects"

export default function ProjectsAdmin({ handleOpenPopup }) {
  const addProjectPopup = {
    title: "Nuevo proyecto",
    children: <NewProject />,
  }

  const projectEditPopup = {
    title: "Editar project",
    children: <EditProjects />,
  }

  function handleDeleteClick() {
    onCardDelete()
  }

  const removePopup = {
    title: "",
    children: <RemoveCard onDelete={handleDeleteClick} />,
  }

  return (
    <div>
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between mb-6">
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
        <div className="w-full overflow-hidden rounded-xl bg-white shadow-lg">
          <table className="w-full text-left">
            <thead className="bg-[#02216B] text-white">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold">Id</th>

                <th className="px-6 py-4 text-sm font-semibold">Proyecto</th>

                <th className="px-6 py-4 text-sm font-semibold">Tareas</th>

                <th className="px-6 py-4 text-sm font-semibold">Hecho por</th>

                <th className="px-6 py-4 text-right text-sm font-semibold">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {projects.map((project) => {
                const userAssigned = users.find(
                  (user) => user._id === project.ownerId,
                )
                return (
                  <tr key={project._id} className="transition hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {project._id}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {project.titleProject}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {project.descriptionProject}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {userAssigned?.name || "Sin asignar"}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-10">
                        <button type="submit">
                          <img
                            src={editar}
                            type="submit"
                            alt=""
                            className="w-10 "
                            onClick={() => handleOpenPopup(projectEditPopup)}
                          />
                        </button>
                        <button type="submit">
                          <img
                            src={borrar}
                            alt=""
                            className="w-10 "
                            onClick={() => handleOpenPopup(removePopup)}
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
