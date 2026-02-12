import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";

export default function CallHistoryTable({ setSelectedCall }) {
    const [calls, setCalls] = useState(null);

    useEffect(() => {
        fetch("https://api.voixup.fr/dashboard/v1/history")
        .then(res => res.json())
        .then(data => setCalls(data.records));
    }, []);
    console.log("calls", calls)

    if (!calls) return null;

    const formatDate = (datetime) => datetime.split("T")[0];
    const formatTime = (datetime) => datetime.split("T")[1].split("+")[0];

    const formatDuration = (seconds) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec.toString().padStart(2, "0")}`;
    };

    return (
    <div className="overflow-x-auto bg-white rounded-lg border border-gray-200 shadow-md">
        <table className="w-full text-sm text-left">
            <thead className="bg-[#032ca6]/5 text-[#032ca6]">
                <tr>
                    <th className="px-2 py-1 md:px-4 md:py-3">Date et Heure</th>
                    <th className="px-2 py-1 md:px-4 md:py-3">Durée de l'appel</th>
                    <th className="px-2 py-1 md:px-4 md:py-3">Numéro appelant</th>
                    <th className="px-2 py-1 md:px-4 md:py-3">Numéro appelé</th>
                    <th className="px-2 py-1 md:px-4 md:py-3 hidden lg:block">Raison de fin</th>
                    <th className="px-2 py-1 md:px-4 md:py-3">Status</th>
                </tr>
            </thead>
            
            <tbody>
                {calls.map((call) => (
                    <tr
                    key={call.id}
                    className="border-t cursor-pointer border-[#032ca6]/30 font-medium hover:bg-[#032ca6]/5 
                    transition text-sm md:text-[16px]"
                    onClick={() => setSelectedCall(call)}
                    >
                        <td className="px-2 py-1 md:px-4 md:py-3">{formatDate(call.created_at)} {" "} {formatTime(call.created_at)}</td>
                        <td className="px-2 py-1 md:px-4 md:py-3">{formatDuration(call.duration_seconds)}</td>
                        <td className="px-2 py-1 md:px-4 md:py-3 break-all">{call.from_number}</td>
                        <td className="px-2 py-1 md:px-4 md:py-3 break-all">{call.to_number}</td>
                        <td className="px-2 py-1 md:px-4 md:py-3 hidden lg:block">{call.disconnect_reason === "HANGUP_BY_CALLEE" ? "Raccroché par l'interlocuteur" : "Raccroché par l’agent"}</td>
                        <td className="px-2 py-1 md:px-4 md:py-3">
                            {call.call_status === "ANSWERED" ? (
                                <span className="flex items-center justify-center gap-1 md:bg-green-600 p-1 text-white rounded-full">
                                    <span className="p-1 md:p-0 bg-green-600 md:bg-none rounded-full flex items-center">
                                        <Check size={12} />
                                    </span>
                                    <span className="hidden md:block">Répondu</span>
                                </span>
                                ) : (
                                <span className="flex items-center gap-1 bg-red-600 p-1 text-white rounded-full">
                                    <X size={12} />
                                    Manqué
                                </span>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
}
