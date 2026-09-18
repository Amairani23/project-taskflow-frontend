import { useState, useEffect } from "react"
import Header from "../Header/Header"
import Login from "../Login/Login"
import Register from "../Register/Register"
import { Routes, Route, Navigate } from "react-router-dom"
import Footer from "../Footer/Footer"
import MainUsers from "../Main/Users/MainUsers"
import MainAdmin from "../Main/Admin/MainAdmin"
import AdminRoute from "../ProtectedRoute/AdminRoute/AdminRoute"
import UsersRoute from "../ProtectedRoute/UsersRoute/UsersRoute"
import { useLogin } from "../../hooks/useLogin"
import { useRegister } from "../../hooks/useRegister"
import Project from "../Main/Users/Project/Project"
import { usePopup } from "../../hooks/usePopup"
import api from "../../utils/api"
import CurrentUserContext from "../../contexts/CurrentUserContext"

function App() {
  const { handleOpenPopup, handleClosePopup } = usePopup()

  //login
  const { user, userEmail, isLoggedIn, handleLogin, handleLogout } = useLogin(
    handleOpenPopup,
    handleClosePopup,
  )

  //registro
  const { handleRegistration } = useRegister(handleOpenPopup, handleClosePopup)

  //carga
  const [isLoading, setIsLoading] = useState(false)

  const louding = isLoading ? "Guardando..." : "Guardar"

  const [usuarios, setUsuarios] = useState([])
  const [projects, setProjects] = useState([])
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    api
      .getUsers()
      .then((data) => {
        setUsuarios(data)
      })
      .catch((error) => {
        console.error("ERROR:", error)
      })

    api
      .getInitialProject()
      .then((data) => {
        setProjects(data)
      })
      .catch((error) => {
        console.error("ERROR:", error)
      })

    api
      .getInitialTaskAdmin()
      .then((data) => {
        setTasks(data)
      })
      .catch((error) => {
        console.error("ERROR:", error)
      })
  }, [])

  // Agregar proyectos
  const handleAddProjectsSubmit = async (data) => {
    try {
      const newProject = await api.addProject(data)

      setProjects((currentProjects) => [newProject, ...currentProjects])
    } catch (error) {
      console.error(error)
    }
  }

  //Editar proyecto
  const handleUpdateProject = async (data) => {
    try {
      const updatedProject = await api.updateProjectInfo(data, data.id)

      setProjects((currentProjects) =>
        currentProjects.map((project) =>
          project._id === updatedProject._id ? updatedProject : project,
        ),
      )
    } catch (error) {
      console.error(error)
    }
  }

  //Eliminar proyecto
  const handleDeleteProject = async (projectId) => {
    try {
      await api.deleteProject(projectId)
      setProjects((currentProjects) =>
        currentProjects.filter((project) => project._id !== projectId),
      )
      return true
    } catch (error) {
      console.error(error)
    }
  }

  //Editar proyecto
  const handleUpdateTask = async (data) => {
    try {
      // data.id o data._id debe ser el taskId correcto de 24 caracteres
      const taskId = data.id || data._id
      const updatedTask = await api.updateTaskAdmin(
        data,
        data.idProject,
        taskId,
      )

      // 1. CORREGIDO: Evaluamos tanto ._id como .id de la respuesta del backend
      if (updatedTask && (updatedTask._id || updatedTask.id)) {
        const updatedTaskId = updatedTask._id || updatedTask.id

        setTasks((currentTasks) => {
          if (!Array.isArray(currentTasks)) {
            console.error(
              "setTasks falló: currentTasks no es un arreglo válido.",
              currentTasks,
            )
            return currentTasks
          }

          // 2. CORREGIDO: Buscamos la tarea por cualquiera de sus formas de ID posibles
          return currentTasks.map((task) => {
            const currentTaskId = task._id || task.id
            return currentTaskId === updatedTaskId ? updatedTask : task
          })
        })
      }
    } catch (error) {
      console.error("Error capturado al actualizar la tarea:", error)
      alert(
        "No se pudo actualizar la tarea. Hubo un problema en el servidor (Error 500).",
      )
    }
  }

  const handleCreateTask = async (data) => {
    try {
      const createdTask = await api.createTask(data, data.idProject)

      if (createdTask) {
        setTasks((currentTasks) => [...currentTasks, createdTask])
      }
    } catch (error) {
      console.error("Error creando tarea:", error)

      throw error
    }
  }

  //Eliminar tarea
  const handleDeleteTask = async (task) => {
    try {
      await api.deleteTask(task._id, task.idProject)

      setTasks((currentTasks) =>
        currentTasks.filter((currentTask) => currentTask._id !== task._id),
      )

      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  return (
    <>
      <CurrentUserContext.Provider
        value={{
          usuarios,
          projects,
          tasks,
          handleAddProjectsSubmit,
          handleUpdateProject,
          handleDeleteProject,
          handleUpdateTask,
          handleCreateTask,
          handleDeleteTask,
        }}
      >
        <Header
          userRole={user}
          userEmail={userEmail}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
        />
        <Routes>
          <Route path="/signin" element={<Login handleLogin={handleLogin} />} />

          <Route
            path="/signup"
            element={<Register handleRegistration={handleRegistration} />}
          />

          <Route
            path="/admin"
            element={
              <AdminRoute isLoggedIn={isLoggedIn}>
                <MainAdmin userEmail={userEmail} onLogout={handleLogout} />
              </AdminRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <UsersRoute isLoggedIn={isLoggedIn}>
                <MainUsers />
              </UsersRoute>
            }
          />

          <Route
            path="/project/:id"
            element={
              <UsersRoute isLoggedIn={isLoggedIn}>
                <Project />
              </UsersRoute>
            }
          />

          <Route
            path="*"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
        </Routes>
        <Footer />
      </CurrentUserContext.Provider>
    </>
  )
}

export default App
