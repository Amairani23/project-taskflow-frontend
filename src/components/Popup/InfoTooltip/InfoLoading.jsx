export default function InfoLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#02216B] to-[#CD4BE7]">
      <div className="flex flex-col items-center gap-3">
        <i className="circle-preloader"></i>
        <p className="text-2xl text-white">Cargando...</p>
      </div>
    </div>

  )
}
