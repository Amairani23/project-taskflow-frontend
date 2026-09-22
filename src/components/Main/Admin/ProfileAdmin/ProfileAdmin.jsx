import editar from "../../../../images/editar.png"
import borrar from "../../../../images/borrar.png"

import RemoveCard from "../../../Popup/RemoveCard/RemoveCard"
import CurrentUserContext from "../../../../contexts/CurrentUserContext"
import { useContext } from "react"
import EditUsersAdmin from "../../../Popup/form/EditUsers/EditUserAdmin"

export default function ProfileAdmin({ handleOpenPopup, handleClosePopup }) {
  const { usuarios } = useContext(CurrentUserContext)

  function handleDeleteClick() {
    console.log("Eliminando usuario")
    // Aquí después puedes recibir el id del usuario
  }

  const removePopup = {
    title: "",
    children: <RemoveCard onDelete={handleDeleteClick} />,
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
                          onClick={() => handleOpenPopup({
                            title: "Editar usuario",
                            children: <EditUsersAdmin user={user} handleClosePopup={handleClosePopup} />,
                          }
                        )}
                        >
                          <img
                            src={editar}
                            alt="Editar"
                            className="w-7 sm:w-8"
                          />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOpenPopup(removePopup)}
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
