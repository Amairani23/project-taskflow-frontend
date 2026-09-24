import { useContext, useState } from "react"

import CurrentUserContext from "../../../../contexts/CurrentUserContext"

import guardar from "../../../../images/guardar-el-archivo.svg"
import cerrar from "../../../../images/cerrar-simbolo-de-boton-circular-blanco.svg"

export default function NewProject({ handleClosePopup, userRole }) {
  const { usuarios, handleAddProjectsSubmit } = useContext(CurrentUserContext)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [assignedTo, setAssignedTo] = useState([])

  const [titleError, setTitleRefError] = useState("")
  const [descriptionRefError, setDescriptionRefError] = useState("")

  const handleTitleChange = (event) => {
    if (event.target.value.length < 3) {
      setTitleRefError("Error: debe tener más de 2 caracteres y menos de 40")
    } else {
      setTitleRefError("")
    }

    setTitle(event.target.value) // Actualiza name cuando cambie la entrada
  }

  const handleDescriptionChange = (event) => {
    if (event.target.value.length < 3) {
      setDescriptionRefError(
        "Error: debe tener más de 2 caracteres y menos de 40",
      )
    } else {
      setDescriptionRefError("")
    }

    setDescription(event.target.value) // Actualiza description cuando cambie la entrada
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const data = {
      titleProject: title,
      descriptionProject: description,
      assignedTo: assignedTo.map((user) => user._id),
    }

    handleAddProjectsSubmit(data)
    handleClosePopup()
  }

  const handlerAssigned = (user) => {
      setAssignedTo((current) =>
          current.filter((id) => id._id !== user._id),
      )
    }

  const handleAssignUser = (event) => {
    const selectedUser = usuarios.find(
            (user) => user._id === event.target.value,
          )

    if (!selectedUser) return

    setAssignedTo((current) => {
      if (current.some((user) => user._id === selectedUser._id)) {
        return current
      }

    return [...current, selectedUser]
    })
  }

  return (
    <form
      className="flex w-full flex-col gap-5 p-5"
      id="new-card-form"
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          id="title"
          className="w-full border-b border-gray-300 bg-transparent px-1 py-3 text-lg text-white outline-none transition placeholder:text-gray-400 focus:border-green-600"
          name="titleProject"
          placeholder="Nombre del proyecto"
          type="text"
          required
          value={title}
          onChange={handleTitleChange}
        />
        <span className="min-h-5 text-sm text-red-500">{titleError}</span>
      </label>
      <label className="popup__label">
        <input
          id="description"
          className="w-full border-b border-gray-300 bg-transparent px-1 py-3 text-lg text-white outline-none transition placeholder:text-gray-400 focus:border-green-600"
          name="descriptionProject"
          placeholder="Descripción del proyecto"
          type="text"
          required
          value={description}
          onChange={handleDescriptionChange}
        />
        <span className="min-h-5 text-sm text-red-500">
          {descriptionRefError}
        </span>
      </label>
    {userRole === "admin" && (<>
      <p className="mb-3 text-xl font-semibold text-blue-300">
        Usuarios asignados al proyecto:
      </p>

      <div className="mb-5 flex flex-col gap-2">
        {assignedTo.map((user) => {
          return (
            <div
              key={user._id}
              className="flex w-full items-center justify-between rounded-lg border border-gray-700 bg-gray-800 px-4 py-3"
            >
              <span className="text-sm text-white">{user.name}</span>

              <button
                className="flex h-8 w-8 items-center justify-center rounded-full  transition hover:bg-red-600"
                type="button"
                onClick={() => handlerAssigned(user)}
              >
                <img src={cerrar} alt="Eliminar usuario" className="w-4" />
              </button>
            </div>
          )
        })}
      </div>

      <select
        value=""
        onChange={handleAssignUser}
        className="w-full cursor-pointer rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
      >
        <option value="" disabled className="bg-gray-800 text-gray-400">
          Seleccionar usuario
        </option>

        {usuarios.map((user) => (
          <option
            key={user._id}
            value={user._id}
            className="bg-gray-800 text-white"
          >
            {user.name}
          </option>
        ))}
      </select>

</>)}

      <div className="flex justify-end gap-5 mt-6">
        <button type="submit">
          <img src={guardar} type="submit" alt="" className="w-10 " />
        </button>
      </div>
    </form>
  )
}
