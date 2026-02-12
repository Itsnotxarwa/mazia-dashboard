import { PieChart, Pie, Sector, Tooltip, Cell } from "recharts";

const COLORS = ["#032ca6", "#a0b0e0"]; 

const renderActiveShape = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
}) => {
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";
    
    return (
    <g>
        <text x={cx} y={cy-15} textAnchor="middle" fill={fill} fontWeight="bold">
            {payload.name.split(" ").map((word, i) => (
                <tspan key={i} x={cx} dy={i === 0 ? 8 : 18}>
                    {word}
                </tspan>
            ))}
        </text>
        
        <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        />
        <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">
            {`Calls ${value}`}
        </text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
            {`(${(percent * 100).toFixed(1)}%)`}
        </text>
    </g>
);
};

export default function CustomPieAIHuman({ agentEnded, humanEnded }) {
    const data = [
        { name: "Raccroché par l’agent", value: agentEnded },
        { name: "Raccroché par l'interlocuteur", value: humanEnded },
    ];
    return (
    <div className=" text-black bg-white w-full lg:w-80 flex flex-col items-center justify-center
    p-4 rounded-lg shadow-md">
        <h3 className="text-2xl text-center tracking-tight">Répartition AI / Humain</h3>
        <PieChart width={380} height={350}>
            <Pie
                activeIndex={0}
                activeShape={renderActiveShape}
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
            </Pie>
            <Tooltip />
        </PieChart>
    </div>
);
}
