import { useContext, useState } from "react"
import { useSearch } from "../../../../hooks/useSearch"

import NewTask from "../../../Popup/form/NewTask/NewTask"
import RemoveCard from "../../../Popup/RemoveCard/RemoveCard"
import EditTak from "../../../Popup/form/EditTak/EditTak"
import CurrentUserContext from "../../../../contexts/CurrentUserContext"
import SearchBar from "../SearchBar/SearchBar"

import agregar from "../../../../images/btn-add-project.svg"
import editar from "../../../../images/editar.svg"
import borrar from "../../../../images/borrar.svg"

export default function TaskAdmin({ handleOpenPopup, handleClosePopup }) {
  const { projects, tasks, usuarios, handleDeleteTask } =
    useContext(CurrentUserContext)
  const { resultstask, searchTerm, handleSearch } = useSearch()
  const [taskToDelete, setTaskToDelete] = useState(null)

  const addTaskPopup = {
    title: "Nueva tarea",
    children: <NewTask handleClosePopup={handleClosePopup} />,
  }

  async function handleDeleteClick(taskId) {
    const task = tasks.find((task) => task._id === taskId)

    if (!task) {
      console.error("No se encontró la tarea:", taskId)
      return
    }

    const deleted = await handleDeleteTask(task)

    if (deleted) {
      setTaskToDelete(null)
      handleClosePopup()
    }
  }

  const handlerEditTask = (task, proyectoAsociado) =>
    handleOpenPopup({
      title: "Editar tarea",
      children: (
        <EditTak
          task={task}
          handleClosePopup={handleClosePopup}
          proyectoAsociado={proyectoAsociado}
        />
      ),
    })

  const handlerDeleteTask = (task) => {
    setTaskToDelete(task._id)

    handleOpenPopup({
      title: "",
      children: <RemoveCard onDelete={() => handleDeleteClick(task._id)} />,
    })
  }

  return (
    <div>
      <main className="w-full px-2 py-6 sm:px-4 sm:py-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl text-white sm:text-4xl">Tareas</h1>

          <button
            type="button"
            onClick={() => handleOpenPopup(addTaskPopup)}
            className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-dashed border-white/40 bg-white/10 px-4 py-3 text-base font-semibold text-white transition hover:border-white/70 hover:bg-white/20 active:scale-[0.98] sm:w-auto sm:text-lg"
          >
            <img src={agregar} alt="" className="h-6 w-6 object-contain" />

            <span>Nueva tarea</span>
          </button>
        </div>

        <SearchBar placeholder="Buscar" onQuery={handleSearch} />

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
                  Creado por
                </th>

                <th className="px-3 py-3 text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                  Tarea
                </th>

                <th className="px-3 py-3 text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                  Estado
                </th>

                <th className="px-3 py-3 text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                  Prioridad
                </th>

                <th className="px-3 py-3 text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                  Asignado
                </th>

                <th className="px-3 py-3 text-right text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                  Acciones
                </th>
              </tr>
            </thead>
            {searchTerm ? (
              <tbody className="divide-y divide-gray-200">
                {resultstask.length === 0 ? (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-6 py-10 text-center text-gray-500"
                    >
                      No hay resultados.
                    </td>
                  </tr>
                ) : (
                  resultstask.map((task, index) => {
                    const proyectoAsociado = projects.find(
                      (p) => p._id === task.idProject,
                    )
                    const nombreProyecto = proyectoAsociado
                      ? proyectoAsociado.titleProject
                      : "Sin proyecto"

                    const usuarioAsignado = usuarios.find(
                      (p) => p._id === task.assignedTo,
                    )
                    const nombreUsuario = usuarioAsignado
                      ? usuarioAsignado.name
                      : "Sin asignar"

                    const owner = usuarios.find(
                      (usuario) => usuario._id === proyectoAsociado?.ownerId,
                    )

                    return (
                      <tr
                        key={task._id}
                        className="transition hover:bg-gray-50"
                      >
                        <td className="px-3 py-3 text-sm font-medium text-gray-800 sm:px-6 sm:py-4">
                          {index + 1}
                        </td>

                        <td className="px-3 py-3 text-sm text-gray-600 sm:px-6 sm:py-4">
                          {new Date(task.createdAt).toLocaleDateString("es-MX")}
                        </td>

                        <td className="px-3 py-3 text-sm font-medium text-gray-800 sm:px-6 sm:py-4">
                          {nombreProyecto}
                        </td>

                        <td className="px-3 py-3 text-sm text-gray-600 sm:px-6 sm:py-4">
                          {owner?.name || "Sin asignar"}
                        </td>

                        <td className="px-3 py-3 text-sm font-medium text-gray-800 sm:px-6 sm:py-4">
                          {task.title}
                        </td>

                        <td className="px-3 py-3 text-sm text-gray-600 sm:px-6 sm:py-4">
                          {task.status}
                        </td>

                        <td className="flex gap-3 items-center px-3 py-3 text-sm text-gray-600 sm:px-6 sm:py-4">
                          {task.prioridad === "alta" ? (
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          ) : task.prioridad === "media" ? (
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          ) : (
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          )}
                          {task.prioridad}
                        </td>

                        <td className="px-3 py-3 text-sm font-medium text-gray-800 sm:px-6 sm:py-4">
                          {nombreUsuario}
                        </td>

                        <td className="px-3 py-3 sm:px-6 sm:py-4">
                          <div className="flex justify-end gap-3">
                            <button
                              type="button"
                              onClick={() =>
                                handlerEditTask(task, proyectoAsociado)
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
                              onClick={() => handlerDeleteTask(task)}
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
                  })
                )}
              </tbody>
            ) : (
              <tbody className="divide-y divide-gray-200">
                {tasks.map((task, index) => {
                  const proyectoAsociado = projects.find(
                    (p) => p._id === task.idProject,
                  )
                  const nombreProyecto = proyectoAsociado
                    ? proyectoAsociado.titleProject
                    : "Sin proyecto"

                  const usuarioAsignado = usuarios.find(
                    (p) => p._id === task.assignedTo,
                  )
                  const nombreUsuario = usuarioAsignado
                    ? usuarioAsignado.name
                    : "Sin asignar"

                  const owner = usuarios.find(
                    (usuario) => usuario._id === proyectoAsociado?.ownerId,
                  )

                  return (
                    <tr key={task._id} className="transition hover:bg-gray-50">
                      <td className="px-3 py-3 text-sm font-medium text-gray-800 sm:px-6 sm:py-4">
                        {index + 1}
                      </td>

                      <td className="px-3 py-3 text-sm text-gray-600 sm:px-6 sm:py-4">
                        {new Date(task.createdAt).toLocaleDateString("es-MX")}
                      </td>

                      <td className="px-3 py-3 text-sm font-medium text-gray-800 sm:px-6 sm:py-4">
                        {nombreProyecto}
                      </td>

                      <td className="px-3 py-3 text-sm text-gray-600 sm:px-6 sm:py-4">
                        {owner?.name || "Sin asignar"}
                      </td>

                      <td className="px-3 py-3 text-sm font-medium text-gray-800 sm:px-6 sm:py-4">
                        {task.title}
                      </td>

                      <td className="px-3 py-3 text-sm text-gray-600 sm:px-6 sm:py-4">
                        {task.status}
                      </td>

                      <td className="flex gap-3 items-center px-3 py-3 text-sm text-gray-600 sm:px-6 sm:py-4">
                        {task.prioridad === "alta" ? (
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        ) : task.prioridad === "media" ? (
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        ) : (
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        )}
                        {task.prioridad}
                      </td>

                      <td className="px-3 py-3 text-sm font-medium text-gray-800 sm:px-6 sm:py-4">
                        {nombreUsuario}
                      </td>

                      <td className="px-3 py-3 sm:px-6 sm:py-4">
                        <div className="flex justify-end gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              handlerEditTask(task, proyectoAsociado)
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
                            onClick={() => handlerDeleteTask(task)}
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
            )}
          </table>
        </div>
      </main>
    </div>
  )
}
