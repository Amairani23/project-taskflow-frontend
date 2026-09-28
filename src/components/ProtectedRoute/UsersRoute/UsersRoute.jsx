import { Navigate } from "react-router-dom"

export default function UsersRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    // Si el usuario no ha iniciado sesión, devuelve un componente Navigate que envía al usuario a /login
    return <Navigate to="/signin" replace />
  }

  // De otra forma, renderiza el componente hijo de la ruta protegida.
  return children
}
