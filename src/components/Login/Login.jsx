import { Link } from "react-router-dom"
import { useState } from "react"

import logo from "../../images/logo-blanco.svg"

export default function Login({ handleLogin }) {

  const [data, setData] = useState({
    email: "",
    password: "",
  })

  const isFormValid =
  data.email.trim().length >= 3 &&
  data.email.trim().length <= 40 &&
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) &&
  data.password.length >= 4



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
        <form action="" onSubmit={handleSubmit}>
          <input
            className="w-full border p-3 rounded-lg mb-4"
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={data.email}
            onChange={handleChange}
            required
          />

          <input
            className="w-full border p-3 rounded-lg mb-4"
            type="password"
            name="password"
            placeholder="Contraseña"
            value={data.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-[#02216B] p-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!isFormValid}
          >
            Inicia sesión
          </button>

        </form>
        <div className="mt-6 font-bold text-center">
          <p>¿Ya eres miembro?</p>
          <Link to="/signup" >
            Registrate aquí
          </Link>
        </div>
      </div>
    </div>
  )
}
