import { useContext, useState } from "react"

import CurrentUserContext from "../../../../contexts/CurrentUserContext"

import guardar from "../../../../images/guardar-el-archivo.svg"

export default function EditUsers({ user, handleClosePopup }) {
  const { handleUpdateUser } = useContext(CurrentUserContext)
  const [avatar, setAvatar] = useState(user.avatar)
  const [name, setName] = useState(user.name)

  const [avatarError, setAvatarError] = useState("")
  const [nameError, setNameError] = useState("")

  const handleAvatarChange = (event) => {
    const value = event.target.value
    setAvatar(value)

    try {
      new URL(value)
      setAvatarError("")
    } catch {
      setAvatarError("Error: introduce una URL válida")
    }
  }

  const handleNameChange = (event) => {
    if (event.target.value.length < 3) {
      setNameError("Error: debe tener más de 2 caracteres y menos de 40")
    } else {
      setNameError("")
    }

    setName(event.target.value) 
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const data = {
      name,
      avatar,
    }

    await handleUpdateUser(data)
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
          value={name} 
          onChange={handleNameChange} 
        />
        <span className="min-h-5 text-sm text-red-500" id="owner-title-error">
          {nameError}
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
