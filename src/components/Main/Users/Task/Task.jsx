import { useContext } from "react"
import CurrentUserContext from "../../../../contexts/CurrentUserContext"

import editar from "../../../../images/editar.png"

import EditTaks from "../../../Popup/form/EditTak/EditTak"

export default function Task({ task, onOpenPopup, handleClosePopup, id}) {
  const { usuarios } = useContext(CurrentUserContext)
  const userAssigned = usuarios.find((user) => user._id === task.assignedTo)

  const editTaskPopup = {
    title: "Editar tarea",
    children: <EditTaks task={task} handleClosePopup={handleClosePopup} proyectoAsociado={id} />,
  }

  return (
    <div className=" rounded-lg shadow-md p-6 bg-[#ffffff]/30 text-white mb-6">
      <div key={task._id}>
        <div className="grid grid-cols-5 gap-4 mt-3 ">
          {/* tareas */}
          <div className="col-span-4 rounded-lg text-left mb-3">
            <h3 className="font-semibold">Tarea: {task.title}</h3>
            <p>
              Asignado a: {userAssigned ? userAssigned.name : "Sin asignar"}
            </p>
          </div>
          <div className="rounded-lg text-right">
            <img
              src={editar}
              alt="Imagen superior"
              className="w-8 h-8 object-cover rounded-lg"
              onClick={() => onOpenPopup(editTaskPopup)}
            />
          </div>
        </div>
        <div className="flex flex-col items-end border-t border-gray-300 pt-2">
          <div className="flex items-center gap-2 ">
            <p className="capitalize">{task.prioridad}</p>

            {task.prioridad === "alta" ? (
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            ) : task.prioridad === "media" ? (
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            ) : (
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
