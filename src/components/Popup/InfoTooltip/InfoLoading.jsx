export default function InfoLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#02216B] to-[#CD4BE7]">
      <div className="flex flex-col items-center gap-3">
        <i className="circle-preloader"></i>
        <p className="mt-30 text-white text-2xl">Cargando...</p>
      </div>
    </div>
  )
}
