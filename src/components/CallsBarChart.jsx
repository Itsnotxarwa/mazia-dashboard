import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function CallsBarChart({ last7Days, last30Days }) {
  const [range, setRange] = useState("7"); 
  const last7DaysArray = Array(7).fill(last7Days);
  const last30DaysArray = Array(30).fill(last30Days);
  const data =
    range === "7"
      ? last7DaysArray.map((calls, i) => ({ day: `J-${6 - i}`, calls }))
      : last30DaysArray.map((calls, i) => ({ day: `J-${29 - i}`, calls }));
  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md">
      <div className="flex flex-col lg:flex-row space-y-6 justify-between items-start px-2 mb-8">
        <h3 className="text-lg font-semibold">Appels - Derniers {range} jours</h3>
        <select
          className="border border-[#032ca6]/10 outline-none focus:ring-2 focus:ring-[#032ca6]
          bg-white shadow-sm text-gray-700 rounded p-1"
          value={range}
          onChange={(e) => setRange(e.target.value)}
        >
          <option value="7">Derniers 7 jours</option>
          <option value="30">Derniers 30 jours</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="day" stroke="#ccc" />
          <YAxis stroke="#ccc" hide />
          <Tooltip />
          <Legend />
          <Bar dataKey="calls" fill="#a0b0e0" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
