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

function App() {
  const { handleOpenPopup, handleClosePopup } = usePopup()

  //login
  const { userEmail, isLoggedIn, handleLogin, handleLogout } = useLogin(
    handleOpenPopup,
    handleClosePopup,
  )

  //registro
  const { handleRegistration } = useRegister(handleOpenPopup, handleClosePopup)

  //carga
  const [isLoading, setIsLoading] = useState(false)

  const louding = isLoading ? "Guardando..." : "Guardar"

  return (
    <>
      <Header
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
              <MainAdmin />
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
    </>
  )
}

export default App
