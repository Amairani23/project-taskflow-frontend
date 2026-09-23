import { Link } from "react-router-dom"
import { useState } from "react"

import logo from "../../images/logo-blanco.svg"

export default function Login({ handleLogin }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    handleLogin({
      email: data.email,
      password: data.password,
    })
  }

  return (
    <div className="min-h-screen flex justify-center bg-gradient-to-b from-[#02216B] to-[#CD4BE7]">
      <div className="w-100 px-3 text-white">
        <img
          alt="Logotipo taskFlow"
          className="w-full max-w-[400px] h-auto mx-auto"
          src={logo}
        />
        <h1 className="text-2xl font-bold text-center mb-6">Iniciar sesión</h1>
        <form action="" className="login__form" onSubmit={handleSubmit}>
          <input
            className="w-full border p-3 rounded-lg mb-4"
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={data.email}
            onChange={handleChange}
          />

          <input
            className="w-full border p-3 rounded-lg mb-4"
            type="password"
            name="password"
            placeholder="Contraseña"
            value={data.password}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-[#02216B] text-white p-3 rounded-lg"
          >
            Inicia sesión
          </button>
        </form>
        <div className="mt-6 font-bold text-center">
          <p>¿Ya eres miembro?</p>
          <Link to="/signup" className="register__login-link">
            Registrate aquí
          </Link>
        </div>
      </div>
    </div>
  )
}
