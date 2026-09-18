import { useContext } from "react"
import CurrentUserContext from "../../../../contexts/CurrentUserContext"
import NewProject from "../../../Popup/form/NewProject/NewProject"
import TaskChart from "../Graphs/TaskChart/TaskChart"
import TaskCircule from "../Graphs/TaskChart/TaskCircule"

export default function Dashboard() {
  const { usuarios, projects, tasks } = useContext(CurrentUserContext)

  const addProjectPopup = {
    title: "Nuevo proyecto",
    children: <NewProject />,
  }

  const totalCompleted = tasks.reduce((acc, project) => {
    if (project.status === "completed") {
      acc += 1
    }

    return acc
  }, 0)

  return (
    <>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-white text-4xl mb-10">Tablero</h1>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className=" rounded-lg shadow-md p-8 bg-[#70CEBB]/48 text-white">
            <div className="grid grid-cols-4 gap-4 items-center mt-3">
              <div className="col-span-3">
                <h2 className="text-3xl font-semibold">Usuarios</h2>
                <div className="grid grid-cols-5 gap-4 items-center mt-3 ">
                  {/* tareas */}
                  <div className="rounded-lg text-right">
                    <p className="text-3xl">{usuarios.length}</p>
                  </div>
                  <div className="col-span-4 rounded-lg">
                    <p>Usuarios totales</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" rounded-lg shadow-md p-8 bg-[#70CEBB]/48 text-white">
            <div className="grid grid-cols-4 gap-4 items-center mt-3">
              <div className="col-span-3">
                <h2 className="text-3xl font-semibold">Proyectos</h2>
                <div className="grid grid-cols-5 gap-4 items-center mt-3 ">
                  {/* tareas */}
                  <div className="rounded-lg text-right">
                    <p className="text-3xl">{projects.length}</p>
                  </div>
                  <div className="col-span-4 rounded-lg">
                    <p>Proyectos totales</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" rounded-lg shadow-md p-8 bg-[#70CEBB]/48 text-white">
            <div className="grid grid-cols-4 gap-4 items-center mt-3">
              <div className="col-span-3">
                <h2 className="text-3xl font-semibold">Tareas</h2>
                <div className="grid grid-cols-5 gap-4 items-center mt-3 ">
                  {/* tareas */}
                  <div className="rounded-lg text-right">
                    <p className="text-3xl">{totalCompleted}</p>
                  </div>
                  <div className="col-span-4 rounded-lg">
                    <p>Tareas completas</p>
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-4 items-center mt-3 ">
                  {/* tareas */}
                  <div className="rounded-lg text-right">
                    <p className="text-3xl">{tasks.length}</p>
                  </div>
                  <div className="col-span-4 rounded-lg">
                    <p>Tareas totales</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
          <TaskChart tasks={tasks} />
          <TaskCircule tasks={tasks} />
        </section>
      </main>
    </>
  )
}
