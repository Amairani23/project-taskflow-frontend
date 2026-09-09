import { users } from "../../../../data/users"

import editar from "../../../../images/editar.png"
import borrar from "../../../../images/borrar.png"

import RemoveCard from "../../../Popup/RemoveCard/RemoveCard"
import EditUsers from "../../../Popup/form/EditUsers/EditUsers"

export default function ProfileAdmin({ handleOpenPopup }) {
  const userEditPopup = {
    title: "Editar usuario",
    children: <EditUsers />,
  }

  function handleDeleteClick() {
    onCardDelete()
  }

  const removePopup = {
    title: "",
    children: <RemoveCard onDelete={handleDeleteClick} />,
  }

  return (
    <div>
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between mb-6">
          <h1 className="text-white text-4xl mb-10">Usuarios</h1>
        </div>
        <div className="w-full overflow-hidden rounded-xl bg-white shadow-lg">
          <table className="w-full text-left">
            <thead className="bg-[#02216B] text-white">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold">Id</th>

                <th className="px-6 py-4 text-sm font-semibold">Nombre</th>

                <th className="px-6 py-4 text-sm font-semibold">Correo</th>
                <th className="px-6 py-4 text-sm font-semibold">Rol</th>

                <th className="px-6 py-4 text-right text-sm font-semibold">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {users.map((users) => {
                return (
                  <tr key={users._id} className="transition hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {users._id}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {users.name}
                    </td>

                    <td className="px-6 py-4 text-gray-600">{users.email}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {users.systemRol}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-10">
                        <button type="submit">
                          <img
                            src={editar}
                            type="submit"
                            alt=""
                            className="w-10 "
                            onClick={() => handleOpenPopup(userEditPopup)}
                          />
                        </button>
                        <button type="submit">
                          <img
                            src={borrar}
                            alt=""
                            className="w-10 "
                            onClick={() => handleOpenPopup(removePopup)}
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
