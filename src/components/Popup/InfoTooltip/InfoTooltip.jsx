import successImage from "../../../images/success.png"
import errorImage from "../../../images/error.png"

export default function InfoTooltip({ isSuccess }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl  p-8 text-center ">
      <img
        src={isSuccess ? successImage : errorImage}
        alt={isSuccess ? "Registro exitoso" : "Error en el registro"}
        className="mb-4 h-28 w-28 object-contain"
      />

      <h2
        className={`max-w-md text-xl font-bold ${
          isSuccess ? "text-green-600" : "text-red-600"
        }`}
      >
        {isSuccess
          ? "¡Correcto! Ya estás registrado."
          : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
      </h2>
    </div>
  )
}
