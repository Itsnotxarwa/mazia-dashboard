import Sidebar from "./sidebar";
import KpiCards from "./kpiCards";

export default function Dashboard() {
    return(
        <div className="flex min-h-screen bg-white text-black">
            <Sidebar />

            <main className="flex-1 mt-8 mx-8">
                <KpiCards />
            </main>

        </div>
    )
}