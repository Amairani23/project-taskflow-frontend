import { useRef, useContext, useState } from "react"
// import CurrentUserContext from "../../../../../contexts/CurrentUserContext"
import guardar from "../../../../images/guardar-el-archivo.png"

export default function NewProject() {
  //   const { handleAddPlaceSubmit, louding, setIsLoading } =
  //     useContext(CurrentUserContext);
  //   const titleRef = useRef();
  //   const urlRef = useRef();

  //   const [titleRefError, settitleRefError] = useState(" ");
  //   const [urlRefError, seturlRefError] = useState(" ");

  //   const newButtonClassName = `button popup__button edit-button ${
  //     titleRefError || urlRefError ? "popup__submit_disabled" : ""
  //   }`;
  const [titleRefError, setTitleRefError] = useState("")
  const [descriptionRefError, setDescriptionRefError] = useState("")

  const handleNameChange = (event) => {
    if (event.target.value.length < 3) {
      setTitleRefError("Error: debe tener más de 2 caracteres y menos de 40")
    } else {
      setTitleRefError("")
    }

    //setName(event.target.value) // Actualiza name cuando cambie la entrada
  }

  const handleDescriptionChange = (event) => {
    if (event.target.value.length < 3) {
      setDescriptionRefError(
        "Error: debe tener más de 2 caracteres y menos de 40",
      )
    } else {
      setDescriptionRefError("")
    }

    //setDescription(event.target.value) // Actualiza description cuando cambie la entrada
  }

  //   const handleTitleChange = (event) => {
  //   if (!event.target.value) {
  //     settitleRefError(" ");
  //   } else if (event.target.value.length < 3) {
  //     settitleRefError("Error: debe tener más de 2 caracteres y menos de 40");
  //   } else {
  //     settitleRefError("");
  //   }
  // };

  //   const handleImageChange = () => {
  //      if (!urlRef.current.value) {
  //     seturlRefError(" ");
  //     return;
  //   }

  //     try {
  //       new URL(urlRef.current.value); // Si esto falla, salta al catch
  //       // URL válida → ¿qué harías aquí?
  //       seturlRefError("");
  //     } catch {
  //       // URL inválida → ¿qué debería pasar aquí?
  //       seturlRefError("Error con la url");
  //     }
  //   };

  //   function handleSubmit(e) {
  //     e.preventDefault();

  //     setIsLoading(true);

  //     handleAddPlaceSubmit({
  //       name: titleRef.current.value,
  //       link: urlRef.current.value,
  //     });
  //   }

  return (
    <form className="flex w-full flex-col gap-5 p-5" id="new-card-form">
      <label className="popup__label">
        <input
          id="title"
          className="w-full border-b border-gray-300 bg-transparent px-1 py-3 text-lg text-white outline-none transition placeholder:text-gray-400 focus:border-green-600"
          name="titleProject"
          placeholder="Nombre del proyecto"
          type="text"
          required
          // ref={titleRef}
          // onChange={handleTitleChange}
        />
        <span className="min-h-5 text-sm text-red-500">{titleRefError}</span>
      </label>
      <label className="popup__label">
        <input
          id="description"
          className="w-full border-b border-gray-300 bg-transparent px-1 py-3 text-lg text-white outline-none transition placeholder:text-gray-400 focus:border-green-600"
          name="descriptionProject"
          placeholder="Descripción del proyecto"
          type="text"
          required
          // ref={titleRef}
          // onChange={handleTitleChange}
        />
        <span className="min-h-5 text-sm text-red-500">
          {descriptionRefError}
        </span>
      </label>
      <div className="flex justify-end gap-5 mt-6">
        <button type="submit">
          <img src={guardar} type="submit" alt="" className="w-10 " />
        </button>
      </div>
    </form>
  )
}
