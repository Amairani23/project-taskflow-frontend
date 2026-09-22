import { useState, useContext } from "react"

import RemoveCard from "../../../Popup/RemoveCard/RemoveCard"
import CurrentUserContext from "../../../../contexts/CurrentUserContext"
import EditUsersAdmin from "../../../Popup/form/EditUsers/EditUserAdmin"

import editar from "../../../../images/editar.png"
import borrar from "../../../../images/borrar.png"

export default function ProfileAdmin({ handleOpenPopup, handleClosePopup }) {
  const { usuarios, handleDeleteUser } = useContext(CurrentUserContext)
  const [usersToDelete, setUsersToDelete] = useState(null)

  async function handleDeleteClick(userId) {
    console.log("1. ProfileAdmin:", userId)

    const deleted = await handleDeleteUser(userId)

    if (deleted) {
      setUsersToDelete(null)
      handleClosePopup()
    }
  }

  const handleRemoveUser = (user) => {
    console.log("Usuario seleccionado:", user)
    console.log("ID seleccionado:", user?._id)

    if (!user?._id) {
      console.error("Este usuario no tiene _id:", user)
      return
    }

    setUsersToDelete(user._id)

    handleOpenPopup({
      title: "",
      children: <RemoveCard onDelete={() => handleDeleteClick(user._id)} />,
    })
  }

  const handleEditUser = (user) => {
    handleOpenPopup({
      title: "Editar usuario",
      children: (
        <EditUsersAdmin user={user} handleClosePopup={handleClosePopup} />
      ),
    })
  }

  return (
    <div>
      <main className="w-full px-2 py-6 sm:px-4 sm:py-8">
        {/* Encabezado */}
        <div className="mb-6">
          <h1 className="text-3xl text-white sm:text-4xl">Usuarios</h1>
        </div>

        {/* Tabla */}
        <div className="max-w-full overflow-x-auto rounded-xl bg-white shadow-lg">
          <table className="w-full min-w-[600px] text-left">
            <thead className="bg-[#02216B] text-white">
              <tr>
                <th className="px-3 py-3 text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                  Id
                </th>

                <th className="px-3 py-3 text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                  Imagen
                </th>

                <th className="px-3 py-3 text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                  Nombre
                </th>

                <th className="px-3 py-3 text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                  Correo
                </th>

                <th className="px-3 py-3 text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                  Rol
                </th>

                <th className="px-3 py-3 text-right text-xs font-semibold sm:px-6 sm:py-4 sm:text-sm">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {usuarios.map((user, index) => {
                return (
                  <tr key={user._id} className="transition hover:bg-gray-50">
                    <td className="px-3 py-3 text-sm font-medium text-gray-800 sm:px-6 sm:py-4">
                      {index + 1}
                    </td>

                    <td className="px-3 py-3 text-sm font-medium text-gray-800 sm:px-6 sm:py-4">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    </td>

                    <td className="px-3 py-3 text-sm font-medium text-gray-800 sm:px-6 sm:py-4">
                      {user.name}
                    </td>

                    <td className="px-3 py-3 text-sm text-gray-600 sm:px-6 sm:py-4">
                      {user.email}
                    </td>

                    <td className="px-3 py-3 text-sm text-gray-600 sm:px-6 sm:py-4">
                      {user.systemRol}
                    </td>

                    <td className="px-3 py-3 sm:px-6 sm:py-4">
                      <div className="flex justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => handleEditUser(user)}
                        >
                          <img
                            src={editar}
                            alt="Editar"
                            className="w-7 sm:w-8"
                          />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleRemoveUser(user)}
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
          </table>
        </div>
      </main>
    </div>
  )
}
