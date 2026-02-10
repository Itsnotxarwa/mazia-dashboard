import { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function CallsBarChart({ last7Days, last30Days }) {
  const [range, setRange] = useState("7"); 
  const data = useMemo(() => {
    const source = range === "7" ? last7Days : last30Days;

    return source.map((item) => ({
      day: item.date,      
      calls: item.count,   
    }));
  }, [range, last7Days, last30Days]);
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
        <BarChart data={[...data].reverse()}>
          <XAxis 
          interval={0}
          angle={-45}
          textAnchor="end"
          dataKey="day" 
          height={60}
          tickFormatter={(day) =>
          new Date(day).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "short",
          })
          } 
          tick={{ dy: 10, fontSize: 12, fill: "#a0b0e0" }} 
          tickLine={false}
          stroke="#a0b0e0" />
          <YAxis hide />
          <Tooltip />
          <Legend />
          <Bar dataKey="calls" fill="#a0b0e0" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
