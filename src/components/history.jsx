import CallHistoryTable from "./callHistoryTable";
import Sidebar from "./sidebar";

export default function History() {
    return (
        <div className="flex min-h-screen bg-white text-black">
            <Sidebar />
            <main className="bg-gray-100 flex-1">
                <div className="flex-1 mt-4 mx-3 md:mx-8">
                    <h2 className="text-4xl font-bold mb-4">Historique des appels</h2>
                    <p className="text-lg text-black/70">Cette section affichera l'historique détaillé des appels traités par l'agent AI, y compris les dates, les durées, les statuts et d'autres informations pertinentes.</p>
                </div>
                <div className="p-4 md:p-6 lg:p-8">
                    <CallHistoryTable />
                </div>
            </main>
        </div>
    );
}