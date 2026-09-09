import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

export default function TaskChart({ tasks }) {
  const pending = tasks.filter((task) => task.prioridad === "media").length

  const progress = tasks.filter((task) => task.prioridad === "alta").length

  const completed = tasks.filter((task) => task.prioridad === "baja").length

  const data = [
    {
      name: "Alta",
      tareas: pending,
    },
    {
      name: "Media",
      tareas: progress,
    },
    {
      name: "Baja",
      tareas: completed,
    },
  ]

  return (
    <div className="w-full rounded-xl bg-white p-6 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        Prioridad de tareas
      </h2>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

            <XAxis dataKey="name" tick={{ fill: "#374151" }} />

            <YAxis allowDecimals={false} tick={{ fill: "#374151" }} />

            <Tooltip />

            <Bar dataKey="tareas" fill="#02216B" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
