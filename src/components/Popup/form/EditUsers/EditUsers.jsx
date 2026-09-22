import { useContext, useState } from "react"
import guardar from "../../../../images/guardar-el-archivo.png"
import borrar from "../../../../images/borrar.png"
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function EditUsers({user, handleClosePopup}) {

  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)

  const [avatarError, setAvatarError] = useState("");
  const [nameError, setNameError] = useState("")
  const [emailError, setEmailError] = useState("")

   const handleAvatarChange = (event) => {
  const value = event.target.value;
  setAvatar(value);

  try {
    new URL(value);
    setAvatarError("");
  } catch {
    setAvatarError("Error: introduce una URL válida");
  }
};


  const handleNameChange = (event) => {
    if (event.target.value.length < 3) {
      setNameError("Error: debe tener más de 2 caracteres y menos de 40")
    } else {
      setNameError("")
    }

    setName(event.target.value) // Actualiza name cuando cambie la entrada
  }

  const handleEmailChange = (event) => {
    if (event.target.value.length < 3) {
      setEmailError("Error: debe tener más de 2 caracteres y menos de 40")
    } else {
      setEmailError("")
    }

    setEmail(event.target.value) // Actualiza email cuando cambie la entrada
  }


  const handleSubmit = (event) => {
     event.preventDefault(); 

     //setIsLoading(true);

     handleUpdateUser({ name, email, rol });
     handleClosePopup()
   };

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
        id="avatar"
        type="url"
        className="w-full border-b border-gray-300 bg-transparent px-1 py-3 text-lg text-white outline-none transition placeholder:text-gray-400 focus:border-green-600"
        name="avatar"
        placeholder="Enlace a la imagen"
        required
        value={avatar}
        onChange={handleAvatarChange}
      />

      <span className="min-h-5 text-sm text-red-500" id="avatar-error">
        {avatarError}
      </span>
    </label>


      <label className="popup__label">
        <input
          className="w-full border-b border-gray-300 bg-transparent px-1 py-3 text-lg text-white outline-none transition placeholder:text-gray-400 focus:border-green-600"
          id="owner-title"
          maxLength="40"
          minLength="2"
          name="projectTitle"
          placeholder="Title"
          required
          type="text"
          value={name} // Vincula description con la entrada
          onChange={handleNameChange} // Agrega el controlador onChange
        />
        <span className="min-h-5 text-sm text-red-500" id="owner-title-error">
          {nameError}
        </span>
      </label>

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
          value={email} 
          onChange={handleEmailChange}
        />
        <span
          className="min-h-5 text-sm text-red-500"
          id="owner-description-error"
        >
          {emailError}
        </span>
      </label>

      <div className="flex justify-end gap-5 mt-6">
        <button type="submit">
          <img src={guardar} type="submit" alt="" className="w-10 " />
        </button>
      </div>
    </form>
  )
}
