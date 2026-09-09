import { tasks } from "../../../../data/tasks"
import { users } from "../../../../data/users"
import { projects } from "../../../../data/projects"

import agregar from "../../../../images/btn-add-project.png"
import editar from "../../../../images/editar.png"
import borrar from "../../../../images/borrar.png"

import NewTask from "../../../Popup/form/NewTask/NewTask"
import RemoveCard from "../../../Popup/RemoveCard/RemoveCard"
import EditTaks from "../../../Popup/form/EditTaks/EditTaks"

export default function TaskAdmin({ handleOpenPopup }) {
  const addTaskPopup = {
    title: "Nueva tarea",
    children: <NewTask />,
  }

  const editTaskPopup = {
    title: "Editar tarea",
    children: <EditTaks />,
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
          <h1 className="text-white text-4xl mb-10">Tareas</h1>
          <button
            type="button"
            onClick={() => handleOpenPopup(addTaskPopup)}
            className="flex  items-center justify-center gap-3 rounded-xl border-2 border-dashed border-white/40 bg-white/10 px-4 text-lg font-semibold text-white transition hover:border-white/70 hover:bg-white/20 active:scale-[0.98]"
          >
            <img src={agregar} alt="" className="h-6 w-6 object-contain" />
            <span>Nueva Tarea</span>
          </button>
        </div>
        <div className="w-full overflow-hidden rounded-xl bg-white shadow-lg">
          <table className="w-full text-left">
            <thead className="bg-[#02216B] text-white">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold">Id</th>

                <th className="px-6 py-4 text-sm font-semibold">Tareas</th>

                <th className="px-6 py-4 text-sm font-semibold">Proyecto</th>

                <th className="px-6 py-4 text-sm font-semibold">Asignado</th>

                <th className="px-6 py-4 text-right text-sm font-semibold">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {tasks.map((task) => {
                const userAssigned = users.find(
                  (user) => user._id === task.assignade,
                )

                const projectAssigned = projects.find(
                  (project) => project._id === task.idProject,
                )
                return (
                  <tr key={task._id} className="transition hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {task._id}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {task.title}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {projectAssigned?.titleProject || "Sin asignar"}
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
                            onClick={() => handleOpenPopup(editTaskPopup)}
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
