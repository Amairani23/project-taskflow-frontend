import { useState } from "react"
// import CurrentUserContext from "../../../../../contexts/CurrentUserContext";
import guardar from "../../../../images/guardar-el-archivo.png"
import borrar from "../../../../images/borrar.png"

export default function EditTaks() {
  // const { currentUser, handleUpdateUser, louding, setIsLoading } =
  //   useContext(CurrentUserContext); // Obtiene el objeto currentUser

  // const [name, setName] = useState(currentUser.name); // Agrega la variable de estado para name
  // const [description, setDescription] = useState(currentUser.about); // Agrega la variable de estado para description

  const [descriptionError, setDescriptionError] = useState("")
  const [statusError, setStatusError] = useState("")
  const [prioridadError, setPrioridadError] = useState("")
  const [assignadeError, setAssignadeError] = useState("")

  const handleNameChange = (event) => {
    if (event.target.value.length < 3) {
      setNameError("Error: debe tener más de 2 caracteres y menos de 40")
    } else {
      setNameError("")
    }

    //setName(event.target.value) // Actualiza name cuando cambie la entrada
  }

  const handleDescriptionChange = (event) => {
    if (event.target.value.length < 3) {
      setDescriptionError("Error: debe tener más de 2 caracteres y menos de 40")
    } else {
      setDescriptionError("")
    }

    //setDescription(event.target.value) // Actualiza description cuando cambie la entrada
  }

  // const handleSubmit = (event) => {
  //   event.preventDefault(); // Evita el comportamiento predeterminado del envío de formularios

  //   setIsLoading(true);

  //   handleUpdateUser({ name, about: description }); // Actualiza la información del usuario
  // };

  return (
    <form
      className="flex w-full flex-col gap-5 p-5"
      name="profile-form"
      id="edit-profile-form"
      noValidate
      //onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          className="w-full border-b border-gray-300 bg-transparent px-1 py-3 text-lg text-white outline-none transition placeholder:text-gray-400 focus:border-green-600"
          id="owner-description"
          maxLength="200"
          minLength="2"
          name="userDescription"
          placeholder="Description"
          required
          type="text"
          // value={description} // Vincula description con la entrada
          //onChange={handleDescriptionChange} // Agrega el controlador onChange
        />
        <span
          className="min-h-5 text-sm text-red-500"
          id="owner-description-error"
        >
          {descriptionError}
        </span>
      </label>
      <label className="popup__label">
        <input
          className="w-full border-b border-gray-300 bg-transparent px-1 py-3 text-lg text-white outline-none transition placeholder:text-gray-400 focus:border-green-600"
          id="owner-assignade"
          maxLength="40"
          minLength="2"
          name="userAssignade"
          placeholder="Assignade"
          required
          type="text"
          // value={name} // Bind name to input
          //onChange={handleNameChange} // Agrega el controlador onChange
        />
        <span className="min-h-5 text-sm text-red-500" id="owner-name-error">
          {assignadeError}
        </span>
      </label>
      <label className="popup__label">
        <input
          className="w-full border-b border-gray-300 bg-transparent px-1 py-3 text-lg text-white outline-none transition placeholder:text-gray-400 focus:border-green-600"
          id="owner-status"
          maxLength="40"
          minLength="2"
          name="userStatus"
          placeholder="Estatus"
          required
          type="text"
          // value={name} // Bind name to input
          //onChange={handleNameChange} // Agrega el controlador onChange
        />
        <span className="min-h-5 text-sm text-red-500" id="owner-name-error">
          {statusError}
        </span>
      </label>
      <label className="popup__label">
        <input
          className="w-full border-b border-gray-300 bg-transparent px-1 py-3 text-lg text-white outline-none transition placeholder:text-gray-400 focus:border-green-600"
          id="owner-prioridad"
          maxLength="40"
          minLength="2"
          name="userPrioridad"
          placeholder="Prioridad"
          required
          type="text"
          // value={name} // Bind name to input
          //onChange={handleNameChange} // Agrega el controlador onChange
        />
        <span className="min-h-5 text-sm text-red-500" id="owner-name-error">
          {prioridadError}
        </span>
      </label>

      <div className="flex justify-end gap-5 mt-6">
        <button type="submit">
          <img src={guardar} type="submit" alt="" className="w-10 " />
        </button>
        <button type="submit">
          <img src={borrar} alt="" className="w-10 " />
        </button>
      </div>
    </form>
  )
}
