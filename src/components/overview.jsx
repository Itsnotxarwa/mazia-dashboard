import KpiCards from "./kpiCards";
import PieChartAIHuman from "./PieChart";
import CallsBarChart from "./CallsBarChart";

export default function Overview({cards, overview}) {
    return (
        <div className="flex-1 mt-4 mx-3 md:mx-8">
            <KpiCards cards={cards} />
            <div className="mt-8 flex flex-col lg:flex-row items-center gap-4 w-full justify-between">
                <CallsBarChart last7Days={overview.daily_counts.last_7_days} last30Days={overview.daily_counts.last_30_days} />
                <PieChartAIHuman agentEnded={overview.termination.agent_ended} humanEnded={overview.termination.human_ended} />
            </div>
        </div>
    );
}