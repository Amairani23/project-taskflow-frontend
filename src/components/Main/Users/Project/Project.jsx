import { useParams } from "react-router"

import { useNavigate } from "react-router"
import { usePopup } from "../../../../hooks/usePopup"

import reloj from "../../../../images/reloj-blanco.png"
import progress from "../../../../images/proseso-blanco.png"
import cheque from "../../../../images/cheque-blanco.png"
import agregar from "../../../../images/btn-add-project.png"
import Task from "../Task/Task"
import NewTaks from "../../../Popup/form/NewTask/NewTask"
import Popup from "../../../Popup/Popup"
import CurrentUserContext from "../../../../contexts/CurrentUserContext"
import { useContext, useEffect, useState } from "react"
import NewTaskUser from "../../../Popup/form/NewTask/NewTaskUser"
import api from "../../../../utils/api"

export default function Project() {
  const { projects } = useContext(CurrentUserContext)
  const { id } = useParams()
  const { popup, handleOpenPopup, handleClosePopup } = usePopup()
  const [tasksState, setTasksState] = useState([])

  const project = projects.find((project) => project._id === id)

   useEffect(() => {
  if (!id) return

  api
    .getInitialTask(id)
    .then((data) => {
      setTasksState(data)
    })
    .catch((error) => {
      console.error("ERROR:", error)
    })
}, [id])


  const projectTasks = tasksState
 

  const pendingTasks = projectTasks.filter((task) => task.status === "pending")

  const progressTasks = projectTasks.filter(
    (task) => task.status === "progress",
  )

  const completedTasks = projectTasks.filter(
    (task) => task.status === "completed",
  )

  const navigate = useNavigate()

  const addTaskPopup = {
    title: "Nueva tarea",
    children: <NewTaskUser handleClosePopup={handleClosePopup} projectId={project._id} />,
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#02216B] to-[#CD4BE7]">
      <main className="container mx-auto px-4 py-8">
        {project ? (
          <>
            <div className="flex justify-between mb-6">
              <div>
                <h1 className="text-white text-4xl ">{project.titleProject}</h1>
                <p className="text-white text-1xl ">
                  Descripción: {project.descriptionProject}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleOpenPopup(addTaskPopup)}
                className="flex  items-center justify-center gap-3 rounded-xl border-2 border-dashed border-white/40 bg-white/10 px-4 text-lg font-semibold text-white transition hover:border-white/70 hover:bg-white/20 active:scale-[0.98]"
              >
                <img src={agregar} alt="" className="h-6 w-6 object-contain" />
                <span>Nueva Tarea</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-[#30C7A9]/25 p-6 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-5">
                  <img className="w-5 h-5" src={reloj} />
                  <span className=" text-center text-white ">Pendiente</span>
                </div>
                {pendingTasks.map((task) => (
                  <Task
                    key={task._id}
                    task={task}
                    onOpenPopup={handleOpenPopup}
                    handleClosePopup={handleClosePopup}
                    id={id}
                  />
                ))}
              </div>
              <div className="bg-[#D1AA3F]/25 p-6 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-5">
                  <img className="w-5 h-5" src={progress} />
                  <span className=" text-center text-white ">En proceso</span>
                </div>
                {progressTasks.map((task) => (
                  <Task
                    key={task._id}
                    task={task}
                    onOpenPopup={handleOpenPopup}
                    handleClosePopup={handleClosePopup}
                    id={id}
                  />
                ))}
              </div>
              <div className="bg-[#42D147]/25 p-6 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-5">
                  <img className="w-5 h-5" src={cheque} />
                  <span className=" text-center text-white ">Hecho</span>
                </div>
                {completedTasks.map((task) => (
                  <Task
                    key={task._id}
                    task={task}
                    onOpenPopup={handleOpenPopup}
                    handleClosePopup={handleClosePopup}
                    id={id}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <p>Proyecto no encontrado</p>
        )}

        <div className="flex justify-end py-10">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 font-semibold text-white backdrop-blur-sm transition hover:bg-white/30 active:scale-95"
          >
            <span className="text-xl">←</span>
            Regresar
          </button>
        </div>
      </main>
      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </div>
  )
}
