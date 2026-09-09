import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function TaskCircule({ tasks }) {
  const pending = tasks.filter((task) => task.status === "pending").length

  const progress = tasks.filter((task) => task.status === "progress").length

  const completed = tasks.filter((task) => task.status === "completed").length

  const data = [
    {
      name: "Pendientes",
      value: pending,
    },
    {
      name: "En proceso",
      value: progress,
    },
    {
      name: "Completadas",
      value: completed,
    },
  ]

  const COLORS = ["#ce651f", "#D1AA3F", "#70CEBB"]

  return (
    <div className="w-full rounded-xl bg-white p-6 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        Estado de tareas
      </h2>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
