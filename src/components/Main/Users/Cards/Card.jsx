import { useNavigate } from "react-router"
import { useContext } from "react"

import borrar from "../../../../images/borrar.png"
import abrir from "../../../../images/abrir-doc.png"

import RemoveCard from "../../../Popup/RemoveCard/RemoveCard"
import CurrentUserContext from "../../../../contexts/CurrentUserContext"

export default function Card({ card, onOpenPopup, onCardDelete }) {
  const navigate = useNavigate()
  const { usuarios, userEmail } = useContext(CurrentUserContext)

  const handleClick = () => {
    navigate(`/project/${card._id}`)
  }

  const currentUser = usuarios.find((usuario) => usuario.email === userEmail)

  const isOwner = currentUser._id == card.ownerId

  const removePopup = {
    title: "",
    children: <RemoveCard onDelete={handleDeleteClick} />,
  }

  function handleDeleteClick() {
    onCardDelete(card._id)
  }

  return (
    <div className=" rounded-lg shadow-md p-8 bg-[#70CEBB]/48 text-white">
      <div className="grid grid-cols-4 gap-4 items-center mt-3">
        <div className="col-span-3">
          <h2 className="text-3xl font-semibold">{card.titleProject}</h2>
          <div className="grid grid-cols-5 gap-4 items-center mt-3 ">
            {/* tareas */}
            <div className="rounded-lg text-right">
              <p className="text-3xl">{card.totalTasks || 0}</p>
            </div>
            <div className="col-span-4 rounded-lg">
              <p>Tareas</p>
            </div>
          </div>
          {/* pendientes */}
          <div className="grid grid-cols-5 gap-4 items-center">
            <div className="rounded-lg text-right">
              <p className="text-3xl">{card.pendingTasks || 0}</p>
            </div>
            <div className="col-span-4  rounded-lg">
              <p>Pendientes</p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col items-end gap-15">
            {isOwner && (
              <img
                src={borrar}
                alt="Imagen superior"
                className="w-8 h-8 object-cover rounded-lg"
                onClick={() => onOpenPopup(removePopup)}
              />
            )}
            <img
              src={abrir}
              alt="Imagen inferior"
              className="w-8 h-8 object-cover rounded-lg  cursor-pointer"
              onClick={handleClick}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
