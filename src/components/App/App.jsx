import { useState, useEffect } from "react"
import { useLogin } from "../../hooks/useLogin"
import { useRegister } from "../../hooks/useRegister"
import { usePopup } from "../../hooks/usePopup"
import { Routes, Route, Navigate } from "react-router-dom"

import Header from "../Header/Header"
import Login from "../Login/Login"
import Register from "../Register/Register"
import Footer from "../Footer/Footer"
import MainUsers from "../Main/Users/MainUsers"
import MainAdmin from "../Main/Admin/MainAdmin"
import AdminRoute from "../ProtectedRoute/AdminRoute/AdminRoute"
import UsersRoute from "../ProtectedRoute/UsersRoute/UsersRoute"
import Project from "../Main/Users/Project/Project"
import CurrentUserContext from "../../contexts/CurrentUserContext"
import Popup from "../Popup/Popup"
import api from "../../utils/api"
import InfoLoading from "../Popup/InfoTooltip/InfoLoading"

function App() {
  const { popup, handleOpenPopup, handleClosePopup } = usePopup()

  //carga
  const [isLoading, setIsLoading] = useState(false)

  //login
  const { user, userEmail, isLoggedIn, handleLogin, handleLogout } = useLogin(
    handleOpenPopup,
    handleClosePopup,
  )

  //registro
  const { handleRegistration } = useRegister({
    handleOpenPopup,
    handleClosePopup,
  })

  const [usuarios, setUsuarios] = useState([])
  const [projects, setProjects] = useState([])
  const [tasks, setTasks] = useState([])

  const userInfo = usuarios.find((usuario) => usuario.email === userEmail)

  useEffect(() => {
    if (!isLoggedIn || !user) return

    const loadInitialData = async () => {
      setIsLoading(true)

      try {
        const [usersData, projectsData, tasksData] = await Promise.all([
          api.getUsers(),
          api.getInitialProject(),
          user === "admin" ? api.getInitialTaskAdmin() : Promise.resolve([]),
        ])

        setUsuarios(usersData)
        setProjects(projectsData)
        setTasks(tasksData)
      } catch (error) {
        console.error("Error cargando datos iniciales:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadInitialData()
  }, [isLoggedIn, user])

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

  //Recargar proyectos
  const reloadProjects = async () => {
    try {
      const data = await api.getInitialProject()
      setProjects(data)
    } catch (error) {
      console.error(error)
    }
  }

  //Editar tarea
  const handleUpdateTask = async (data) => {
    try {
      const taskId = data.id || data._id
      const updatedTask = await api.updateTaskAdmin(
        data,
        data.idProject,
        taskId,
      )

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

          return currentTasks.map((task) => {
            const currentTaskId = task._id || task.id
            return currentTaskId === updatedTaskId ? updatedTask : task
          })
        })
      }
    } catch (error) {
      console.error("Error capturado al actualizar la tarea:", error)
    }
  }

  //Agregar tarea
  const handleCreateTask = async (data) => {
    try {
      await api.createTask(data, data.idProject)
      await loadTasks()
      await reloadProjects()
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

  //Recarga tareas
  const loadTasks = async () => {
    try {
      const data = await api.getInitialTaskAdmin()
      setTasks(data)
    } catch (error) {
      console.error("Error cargando tareas:", error)
    }
  }

  //Editar Rol del usuario
  const handleUpdateUseraAdmin = async (data) => {
    try {
      const newData = await api.updateUserAdmin(data, data.id)

      setUsuarios((usuarios) =>
        usuarios.map((usuario) =>
          usuario._id === newData._id ? newData : usuario,
        ),
      )

      handleClosePopup()
    } catch (error) {
      console.error(error)
    }
  }

  //Editar usuario
  const handleUpdateUser = async (data) => {
    try {
      const updatedUser = await api.updateUserInfo(data)

      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((usuario) =>
          usuario._id === updatedUser._id ? updatedUser : usuario,
        ),
      )
    } catch (error) {
      console.error(error)
    }
  }

  // Eliminar usuario
  async function handleUserDelete(userId) {
   try {
   await api.deleteUser(userId);

  setUsuarios((state) =>
    state.filter((currentCard) => currentCard._id !== userId)
  );

  handleClosePopup();
  } catch (error) {
      console.error(error)
    }
}


  return (
    <>
      <CurrentUserContext.Provider
        value={{
          usuarios,
          projects,
          tasks,
          user,
          userEmail,
          userInfo,
          isLoading,
          handleUpdateUser,
          handleUserDelete,
          handleUpdateUseraAdmin,
          handleAddProjectsSubmit,
          handleUpdateProject,
          handleDeleteProject,
          handleUpdateTask,
          handleCreateTask,
          handleDeleteTask,
          reloadProjects,
          loadTasks,
          setIsLoading,
        }}
      >
        {isLoading ? (
          <InfoLoading  />
        ) : (
          <>
            <Header
              userRole={user}
              isLoggedIn={isLoggedIn}
              onLogout={handleLogout}
            />
            <Routes>
              <Route
                path="/signin"
                element={<Login handleLogin={handleLogin} />}
              />

              <Route
                path="/signup"
                element={<Register handleRegistration={handleRegistration} />}
              />

              <Route
                path="/admin"
                element={
                  <AdminRoute isLoggedIn={isLoggedIn}>
                    <MainAdmin onLogout={handleLogout} />
                  </AdminRoute>
                }
              />

              <Route
                path="/dashboard"
                element={
                  <UsersRoute isLoggedIn={isLoggedIn}>
                    <MainUsers userRole={user} />
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
          </>
        )}
        {popup && (
          <Popup onClose={handleClosePopup} title={popup.title}>
            {popup.children}
          </Popup>
        )}
      </CurrentUserContext.Provider>
    </>
  )
}

export default App
