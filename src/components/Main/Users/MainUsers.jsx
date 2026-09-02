import Card from "./Cards/Card"
import { projects } from "../../../data/projects"

export default function MainUsers() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#02216B] to-[#CD4BE7]">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-white text-4xl mb-10">Proyectos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((card) => (
            <Card key={card._id} card={card} />
          ))}
        </div>
      </main>
    </div>
  )
}
