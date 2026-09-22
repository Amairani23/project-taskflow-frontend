import { useContext, useState } from "react"
import guardar from "../../../../images/guardar-el-archivo.png"
import cerrar from "../../../../images/cerrar-simbolo-de-boton-circular-blanco.png"
import CurrentUserContext from "../../../../contexts/CurrentUserContext"

export default function EditTakUser({
  task,
  handleClosePopup,
  proyectoAsociado,
  onTaskUpdated,
}) {
  const { usuarios, user, handleUpdateTask } = useContext(CurrentUserContext)

  const [title, setTitle] = useState(task.title || "")
  const [status, setStatus] = useState(task.status || "")
  const [priority, setPriority] = useState(task.prioridad || "")

  // La tarea SOLO tiene un usuario.
  const initialAssignedUser = Array.isArray(task.assignedTo)
    ? task.assignedTo[0] || null
    : task.assignedTo || null

  const [assignedTo, setAssignedTo] = useState(initialAssignedUser)

  const [titleError, setTitleError] = useState("")
  const [statusError, setStatusError] = useState("")
  const [priorityError, setPriorityError] = useState("")

  const handleTitleChange = (event) => {
    const value = event.target.value

    if (value.length < 3) {
      setTitleError("Error: debe tener más de 2 caracteres y menos de 40")
    } else {
      setTitleError("")
    }

    setTitle(value)
  }

  const handleStatusChange = (event) => {
    const value = event.target.value

    setStatus(value)

    if (!value) {
      setStatusError("Debes seleccionar un estado")
    } else {
      setStatusError("")
    }
  }

  const handlePriorityChange = (event) => {
    const value = event.target.value

    setPriority(value)

    if (!value) {
      setPriorityError("Debes seleccionar una prioridad")
    } else {
      setPriorityError("")
    }
  }

  // Usuarios que pertenecen al proyecto
  const projectUsers = usuarios
    ? usuarios.filter((user) =>
        proyectoAsociado?.assignedTo?.some((projectUser) => {
          const projectUserId =
            typeof projectUser === "object" ? projectUser._id : projectUser

          return projectUserId === user._id
        }),
      )
    : []

  const handleAddUser = (event) => {
    const userId = event.target.value

    const selectedUser = projectUsers.find((user) => user._id === userId)

    if (!selectedUser) return

    // Como SOLO puede haber un usuario,
    // simplemente reemplazamos el anterior.
    setAssignedTo(selectedUser)
  }

  const handleRemoveUser = () => {
    setAssignedTo(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    // Obtener el ID correctamente
    let userIdToSend

    if (assignedTo) {
      if (typeof assignedTo === "object") {
        userIdToSend = assignedTo._id
      } else {
        userIdToSend = assignedTo
      }
    }

    const data = {
      id: task._id,
      title,
      status,
      prioridad: priority,
      idProject: task.idProject,
      assignedTo: userIdToSend || undefined,
    }
    try {
      await handleUpdateTask(data)
      onTaskUpdated()
      handleClosePopup()
    } catch (error) {
      console.error("Error actualizando tarea:", error)
    }
  }

  // Obtener el ID del usuario actualmente asignado
  const assignedUserId = assignedTo
    ? typeof assignedTo === "object"
      ? assignedTo._id
      : assignedTo
    : null

  // Buscar información completa del usuario
  const fullAssignedUser = usuarios?.find((user) => user._id === assignedUserId)

  return (
    <form
      className="flex w-full flex-col gap-5 p-5"
      name="profile-form"
      id="edit-profile-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          className="w-full border-b border-gray-300 bg-transparent px-1 py-3 text-lg text-white outline-none transition placeholder:text-gray-400 focus:border-green-600"
          maxLength="200"
          minLength="2"
          placeholder="Description"
          required
          type="text"
          value={title}
          onChange={handleTitleChange}
        />

        <span className="min-h-5 text-sm text-red-500">{titleError}</span>
      </label>

      <label className="popup__label">
        <select
          value={status}
          onChange={handleStatusChange}
          required
          className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 text-sm text-white"
        >
          <option value="" disabled>
            Seleccionar estado
          </option>

          <option value="pending">Pendiente</option>

          <option value="progress">En progreso</option>

          <option value="completed">Completada</option>
        </select>

        <span className="min-h-5 text-sm text-red-500">{statusError}</span>
      </label>

      <label className="popup__label">
        <select
          value={priority}
          onChange={handlePriorityChange}
          required
          className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 text-sm text-white"
        >
          <option value="" disabled>
            Seleccionar prioridad
          </option>

          <option value="alta">Alta</option>

          <option value="media">Media</option>

          <option value="baja">Baja</option>
        </select>

        <span className="min-h-5 text-sm text-red-500">{priorityError}</span>
      </label>
      {user === "admin" && (
        <>
          <p className="mb-3 text-xl font-semibold text-blue-300">
            Usuario asignado a la tarea:
          </p>

          {assignedTo && (
            <div className="flex w-full items-center justify-between rounded-lg border border-gray-700 bg-gray-800 px-4 py-3">
              <span className="text-white">
                {fullAssignedUser?.name || "Usuario"}
              </span>

              <button
                className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-red-600"
                type="button"
                onClick={handleRemoveUser}
              >
                <img src={cerrar} alt="Eliminar usuario" className="w-4" />
              </button>
            </div>
          )}

          <select
            value=""
            onChange={handleAddUser}
            className="w-full cursor-pointer rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
          >
            <option value="" disabled>
              {assignedTo
                ? "Cambiar usuario"
                : "Seleccionar usuario del proyecto"}
            </option>

            {projectUsers.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </>
      )}

      <div className="mt-6 flex justify-end gap-5">
        <button type="submit">
          <img src={guardar} alt="Guardar" className="w-10" />
        </button>
      </div>
    </form>
  )
}
