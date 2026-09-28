export default function RemoveCard({ onDelete }) {
  function handleSubmit(e) {
    e.preventDefault()
    onDelete()
  }

  return (
    <div>
      <form
        className="flex flex-col items-center gap-6"
        name="delete-form"
        onSubmit={handleSubmit}
      >
        <p className="text-center text-lg font-medium text-white mt-6">
          ¿Estás seguro de que quieres eliminar este elemento?
        </p>

        <div className="flex w-full justify-center gap-4">
          <button
            className="rounded-lg bg-red-600 px-8 py-3 font-semibold text-white transition hover:bg-red-700 active:scale-95"
            type="submit"
          >
            Sí
          </button>
        </div>
      </form>
    </div>
  )
}
