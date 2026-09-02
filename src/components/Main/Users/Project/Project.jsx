import { useParams } from "react-router"

import { projects } from "../../../../data/projects"
import { tasks } from "../../../../data/tasks"

import reloj from "../../../../images/reloj-blanco.png"
import progress from "../../../../images/proseso-blanco.png"
import cheque from "../../../../images/cheque-blanco.png"
import Task from "./Task/Task"

export default function Project() {
  const { id } = useParams()

  const project = projects.find((project) => project._id === id)
  const projectTasks = project
    ? tasks.filter((task) => task.idProject === project._id)
    : []

  const pendingTasks = projectTasks.filter((task) => task.status === "pending")

  const progressTasks = projectTasks.filter(
    (task) => task.status === "progress",
  )

  const completedTasks = projectTasks.filter(
    (task) => task.status === "completed",
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#02216B] to-[#CD4BE7]">
      <main className="container mx-auto px-4 py-8">
        {project ? (
          <>
            <h1 className="text-white text-4xl mb-5">{project.titleProject}</h1>
            <p className="text-white text-2xl mb-10">
              Descripción: {project.descriptionProject}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-[#30C7A9]/25 p-6 rounded-lg">
                <div class="flex items-center justify-center gap-2 mb-5">
                  <img class="w-5 h-5" src={reloj} />
                  <span className=" text-center text-white ">Pendiente</span>
                </div>
                {pendingTasks.map((task) => (
                  <Task task={task} />
                ))}
              </div>
              <div className="bg-[#D1AA3F]/25 p-6 rounded-lg">
                <div class="flex items-center justify-center gap-2 mb-5">
                  <img class="w-5 h-5" src={progress} />
                  <span className=" text-center text-white ">En proceso</span>
                </div>
                {progressTasks.map((task) => (
                  <Task task={task} />
                ))}
              </div>
              <div className="bg-[#42D147]/25 p-6 rounded-lg">
                <div class="flex items-center justify-center gap-2 mb-5">
                  <img class="w-5 h-5" src={cheque} />
                  <span className=" text-center text-white ">Hecho</span>
                </div>
                {completedTasks.map((task) => (
                  <Task task={task} />
                ))}
              </div>
            </div>
          </>
        ) : (
          <p>Proyecto no encontrado</p>
        )}
      </main>
    </div>
  )
}
