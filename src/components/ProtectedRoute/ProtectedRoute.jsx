import { Navigate } from "react-router-dom"

function ProtectedRoute({ isLoggedIn, isRolLogged, children }) {
  if (!isLoggedIn) {
    // Si el usuario no ha iniciado sesión, devuelve un componente Navigate que envía al usuario a /login
    return <Navigate to="/signin" replace />
  }

  if (isRolLogged === "admin") {
    return <Navigate to="/admin" replace />
  }

  // De otra forma, renderiza el componente hijo de la ruta protegida.
  return children
}

export default ProtectedRoute
