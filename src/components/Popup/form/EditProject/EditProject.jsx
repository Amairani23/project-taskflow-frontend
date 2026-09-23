import { useContext, useState } from "react"
import CurrentUserContext from "../../../../contexts/CurrentUserContext"

import guardar from "../../../../images/guardar-el-archivo.svg"
import cerrar from "../../../../images/cerrar-simbolo-de-boton-circular-blanco.svg"

export default function EditProjects({ project, handleClosePopup }) {
  const { usuarios, handleUpdateProject } = useContext(CurrentUserContext)

  const [title, setTitle] = useState(project.titleProject)
  const [description, setDescription] = useState(project.descriptionProject)
  const [assignedTo, setAssignedTo] = useState(project.assignedTo || [])

  const [titleError, setTitleError] = useState("")
  const [descriptionError, setDescriptionError] = useState("")

  const handleTitleChange = (event) => {
    if (event.target.value.length < 3) {
      setTitleError("Error: debe tener más de 2 caracteres y menos de 40")
    } else {
      setTitleError("")
    }

    setTitle(event.target.value)
  }

  const handleDescriptionChange = (event) => {
    if (event.target.value.length < 3) {
      setDescriptionError("Error: debe tener más de 2 caracteres y menos de 40")
    } else {
      setDescriptionError("")
    }

    setDescription(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const data = {
      id: project._id,
      titleProject: title,
      descriptionProject: description,
      assignedTo: assignedTo.map((user) => user._id),
    }

    handleUpdateProject(data)
    handleClosePopup()
  }

  const handlerAssignedClick = (user) => {
    setAssignedTo((current) =>
        current.filter((id) => id._id !== user._id),
      )
    }

    const handleAssignUser = (event) => {
  const selectedUser = usuarios.find(
    (user) => user._id === event.target.value
  );

  if (!selectedUser) return;

  setAssignedTo((current) => {
    if (current.some((user) => user._id === selectedUser._id)) {
      return current;
    }

    return [...current, selectedUser];
  });
};


  return (
    <form
      className="flex w-full flex-col gap-5 p-5"
      name="profile-form"
      id="edit-profile-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label>
        <input
          className="w-full border-b border-gray-300 bg-transparent px-1 py-3 text-lg text-white outline-none transition placeholder:text-gray-400 focus:border-green-600"
          id="owner-title"
          maxLength="40"
          minLength="2"
          name="projectTitle"
          placeholder="Title"
          required
          type="text"
          value={title}
          onChange={handleTitleChange}
        />
        <span className="min-h-5 text-sm text-red-500" id="owner-title-error">
          {titleError}
        </span>
      </label>
      <label>
        <input
          className="w-full border-b border-gray-300 bg-transparent px-1 py-3 text-lg text-white outline-none transition placeholder:text-gray-400 focus:border-green-600"
          id="owner-description"
          maxLength="200"
          minLength="2"
          name="userDescription"
          placeholder="Description"
          required
          type="text"
          value={description}
          onChange={handleDescriptionChange}
        />
        <span
          className="min-h-5 text-sm text-red-500"
          id="owner-description-error"
        >
          {descriptionError}
        </span>
      </label>

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
              <span className="text-lsm text-white">{user.name}</span>

              <button
                className="flex h-8 w-8 items-center justify-center rounded-full  transition hover:bg-red-600"
                type="button"
                onClick={() => handlerAssignedClick(user)}
              >
                <img src={cerrar} alt="Eliminar usuario" className="w-4" />
              </button>
            </div>
          )
        })}
      </div>

      <select
        value=""
        onChange={handlerAssignedClick}
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

      <div className="flex justify-end gap-5 mt-6">
        <button type="submit">
          <img src={guardar} type="submit" alt="" className="w-10 " />
        </button>
      </div>
    </form>
  )
}
