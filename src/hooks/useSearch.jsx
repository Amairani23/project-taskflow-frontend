import { useContext, useState } from "react"
import CurrentUserContext from "../contexts/CurrentUserContext"

export const useSearch = () => {
  const { projects, tasks, usuarios } = useContext(CurrentUserContext)

  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (search) => {
    setSearchTerm(search.toLowerCase().trim())
  }

  // Búsqueda de proyectos
  const results = projects.filter((project) => {
    const projectName = project.titleProject?.toLowerCase() || ""

    // Buscar el usuario asignado al proyecto
    const assignedUsers =
      project.assignedTo?.map((user) => user.name?.toLowerCase()).join(" ") ||
      ""

    return (
      projectName.includes(searchTerm) || assignedUsers.includes(searchTerm)
    )
  })

  // Búsqueda de tareas
  const resultstask = tasks.filter((task) => {
    const taskName = task.title?.toLowerCase() || ""

    // Buscar el proyecto al que pertenece la tarea
    const project = projects.find((project) => project._id === task.idProject)

    const projectName = project?.titleProject?.toLowerCase() || ""

    // Buscar el usuario asignado a la tarea
    const assignedUser = usuarios.find((user) => user._id === task.assignedTo)

    const assignedUserName = assignedUser?.name?.toLowerCase() || ""

    return (
      taskName.includes(searchTerm) ||
      projectName.includes(searchTerm) ||
      assignedUserName.includes(searchTerm)
    )
  })

  return {
    results,
    resultstask,
    searchTerm,
    handleSearch,
  }
}
