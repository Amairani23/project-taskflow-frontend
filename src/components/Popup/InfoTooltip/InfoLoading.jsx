export default function InfoLoading() {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#02216B] to-[#CD4BE7]">
      <div className="flex flex-col items-center gap-3">
        <i className="circle-preloader"></i>
        <p className="mt-30 text-white text-2xl">Cargando...</p>
      </div>
    </div>
  )
}
