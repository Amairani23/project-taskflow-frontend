import { useContext, useState } from "react"

import CurrentUserContext from "../../../../contexts/CurrentUserContext"

import guardar from "../../../../images/guardar-el-archivo.svg"

export default function NewTask({ handleClosePopup }) {
  const { usuarios, projects, handleCreateTask } =
    useContext(CurrentUserContext)

  const [title, setTitle] = useState("")
  const [status, setStatus] = useState("pending")
  const [priority, setPriority] = useState("alta")
  const [projectId, setProjectId] = useState("")
  const [assignedTo, setAssignedTo] = useState(null)

  const [titleError, setTitleError] = useState("")
  const [projectError, setProjectError] = useState("")
  const [priorityError, setPriorityError] = useState("")
  const [assignedError, setAssignedError] = useState("")

  const handleTitleChange = (event) => {
    const value = event.target.value

    setTitle(value)

    if (value.length < 3) {
      setTitleError("El título debe tener más de 2 caracteres")
    } else if (value.length > 40) {
      setTitleError("El título no puede tener más de 40 caracteres")
    } else {
      setTitleError("")
    }
  }

  const handleProjectChange = (event) => {
    const value = event.target.value

    setProjectId(value)
    setProjectError("")

    // MUY IMPORTANTE:
    // Si cambia de proyecto, quitamos el usuario anterior
    // porque podría no pertenecer al nuevo proyecto.
    setAssignedTo(null)
    setAssignedError("")
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

  const selectedProject = projects?.find((project) => project._id === projectId)

  const projectUsers = usuarios
    ? usuarios.filter((user) =>
        selectedProject?.assignedTo?.some((projectUser) => {
          const projectUserId =
            typeof projectUser === "object" ? projectUser._id : projectUser

          return projectUserId === user._id
        }),
      )
    : []

  const handleUserChange = (event) => {
    const userId = event.target.value

    const selectedUser = projectUsers.find((user) => user._id === userId)

    if (!selectedUser) {
      setAssignedTo(null)
      return
    }

    setAssignedTo(selectedUser)
    setAssignedError("")
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    let valid = true

    if (title.length < 3 || title.length > 40) {
      setTitleError("El título debe tener entre 3 y 40 caracteres")
      valid = false
    }

    if (!projectId) {
      setProjectError("Debes seleccionar un proyecto")
      valid = false
    }

    if (!priority) {
      setPriorityError("Debes seleccionar una prioridad")
      valid = false
    }

    if (!assignedTo) {
      setAssignedError("Debes seleccionar un usuario")
      valid = false
    }

    if (!valid) return

    // Como assignedTo es un objeto, enviamos solamente el _id
    const assignedUserId =
      typeof assignedTo === "object" ? assignedTo._id : assignedTo

    const data = {
      title,
      status,
      prioridad: priority,
      idProject: projectId,
      assignedTo: assignedUserId,
    }

    try {
      await handleCreateTask(data)

      handleClosePopup()
    } catch (error) {
      console.error("Error creando tarea:", error)
    }
  }

  return (
    <form
      className="flex w-full flex-col gap-5 p-5"
      onSubmit={handleSubmit}
      noValidate
    >
      <label className="popup__label">
        <input
          className="w-full border-b border-gray-300 bg-transparent px-1 py-3 text-lg text-white outline-none transition placeholder:text-gray-400 focus:border-green-600"
          maxLength="40"
          minLength="3"
          placeholder="Título de la tarea"
          required
          type="text"
          value={title}
          onChange={handleTitleChange}
        />

        <span className="min-h-5 text-sm text-red-500">{titleError}</span>
      </label>

      <label className="popup__label">
        <select
          value={projectId}
          onChange={handleProjectChange}
          required
          className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 text-sm text-white"
        >
          <option value="" disabled>
            Seleccionar proyecto
          </option>

          {projects?.map((project) => (
            <option key={project._id} value={project._id}>
              {project.titleProject}
            </option>
          ))}
        </select>

        <span className="min-h-5 text-sm text-red-500">{projectError}</span>
      </label>

      <label className="popup__label">
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          required
          className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 text-sm text-white"
        >
          <option value="pending">Pendiente</option>

          <option value="progress">En progreso</option>

          <option value="completed">Completada</option>
        </select>
      </label>

      <label className="popup__label">
        <select
          value={priority}
          onChange={handlePriorityChange}
          required
          className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 text-sm text-white"
        >

          <option value="alta">Alta</option>

          <option value="media">Media</option>

          <option value="baja">Baja</option>
        </select>

        <span className="min-h-5 text-sm text-red-500">{priorityError}</span>
      </label>

      <p className="mb-1 text-xl font-semibold text-blue-300">
        Usuario asignado:
      </p>

      <select
        value={assignedTo?._id || ""}
        onChange={handleUserChange}
        disabled={!projectId}
        required
        className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 text-sm text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        <option value="" disabled>
          {!projectId
            ? "Primero selecciona un proyecto"
            : "Seleccionar usuario"}
        </option>

        {projectUsers.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>

      <span className="min-h-5 text-sm text-red-500">{assignedError}</span>

      {assignedTo && (
        <div className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white">
          Usuario seleccionado: <strong>{assignedTo.name}</strong>
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <button type="submit">
          <img src={guardar} alt="Guardar" className="w-10" />
        </button>
      </div>
    </form>
  )
}
