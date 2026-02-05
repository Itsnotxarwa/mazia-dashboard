import { useEffect, useState } from "react";
import CardsData from "../data/cardsData";
import Sidebar from "./sidebar";
import KpiCards from "./kpiCards";
import PieChartAIHuman from "./PieChart";
import CallsBarChart from "./CallsBarChart";

export default function Dashboard() {
    const [overview, setOverview] = useState(null);
    
    useEffect(() => {
        fetch("https://api.voixup.fr/dashboard/v1/overview")
        .then(res => res.json())
        .then(setOverview);
    }, []);

    console.log("data", overview)
    
    if (!overview) return null;
    
    const cards = CardsData(overview);

    return(
        <div className="flex min-h-screen bg-white text-black">
            <Sidebar />

            <main className="bg-gray-100 flex-1">
                <div className="flex-1 mt-4 mx-3 md:mx-8">
                <KpiCards cards={cards} />
                <div className="mt-8 flex flex-col lg:flex-row items-center gap-4 w-full justify-between">
                    <CallsBarChart last7Days={overview.volume.calls_last_7_days} last30Days={overview.volume.calls_last_30_days} />
                    <PieChartAIHuman agentEnded={overview.termination.agent_ended} humanEnded={overview.termination.human_ended} />
                </div>
                </div>
            </main>

        </div>
    )
}