import { useContext, useState } from "react"

import CurrentUserContext from "../../../../contexts/CurrentUserContext"

import guardar from "../../../../images/guardar-el-archivo.svg"

export default function NewTaskUser({
  handleClosePopup,
  projectId,
  onTaskCreated,
}) {
  const { handleCreateTask } = useContext(CurrentUserContext)

  const [title, setTitle] = useState("")
  const [status, setStatus] = useState("pending")
  const [priority, setPriority] = useState("alta")

  const [titleError, setTitleError] = useState("")
  const [priorityError, setPriorityError] = useState("")

  const handleTitleChange = (event) => {
    const value = event.target.value

    setTitle(value)

   if (event.target.value.length <= 2 || event.target.value.length > 40) {
      setTitleError("Error: debe tener más de 2 caracteres y menos de 40")
    } else {
      setTitleError("")
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

  const handleSubmit = async (event) => {
    event.preventDefault()

    let valid = true

    if (title.length < 3 || title.length > 40) {
      setTitleError("El título debe tener entre 3 y 40 caracteres")
      valid = false
    }

    if (!priority) {
      setPriorityError("Debes seleccionar una prioridad")
      valid = false
    }

    if (!valid) return

    const data = {
      title,
      status,
      prioridad: priority,
      idProject: projectId,
    }

    try {
      await handleCreateTask(data)
      onTaskCreated()
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
      <label>
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

      <label>
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

      <label>
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

      <div className="mt-6 flex justify-end">
        <button type="submit">
          <img src={guardar} alt="Guardar" className="w-10" />
        </button>
      </div>
    </form>
  )
}
