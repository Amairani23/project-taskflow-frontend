import { useContext, useState } from "react"
import guardar from "../../../../images/guardar-el-archivo.png"
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function EditUsersAdmin({user,  handleClosePopup}) {

    const {handleUpdateUseraAdmin, projects} = useContext(CurrentUserContext)
  const [systemRol, setRol] = useState(user.systemRol)

  const [rolError, setRolError] = useState("")


  const haveProject = projects.some((project) => {
  const isOwner =
    project.ownerId?.toString() === user._id.toString()

  const isAssigned = project.assignedTo?.some(
    (userId) => userId.toString() === user._id.toString()
  )

  return isOwner || isAssigned
})

const handleRolChange = (event) => {
  const value = event.target.value

  setRol(value)
  setRolError("")
}


const handleSubmit = (event) => {
  event.preventDefault()

  if (haveProject) {
    setRolError(
      "Este usuario no puede ser administrador porque tiene proyectos asignados o propios."
    )
    return
  }

  const data = {
    id: user._id,
    systemRol,
  }

  handleUpdateUseraAdmin(data)
  handleClosePopup()
}




  return (
    <form
      className="flex w-full flex-col gap-5 p-5"
      name="profile-form"
      id="edit-profile-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="px-1 py-3 text-lg text-white">
        <p> {user.name} </p>
      </label>

      <label className="px-1 py-3 text-lg text-white">
        <p> {user.email} </p>
      </label>


      <label className="popup__label">
        <select
          value={systemRol}
          onChange={handleRolChange}
          required
          className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 text-sm text-white"
        >

          <option value="admin" disabled={haveProject}>Administrador</option>

          <option value="colaborador">Colaborador</option>

        </select>

        <span className="min-h-5 text-sm text-red-500">{rolError}</span>
      </label>

      <div className="flex justify-end gap-5 mt-6">
        <button type="submit">
          <img src={guardar} type="submit" alt="" className="w-10 " />
        </button>
      </div>
    </form>
  )
}
