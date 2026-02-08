import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";

export default function CallHistoryTable() {
    const [calls, setCalls] = useState(null);

    useEffect(() => {
        fetch("https://api.voixup.fr/dashboard/v1/history")
        .then(res => res.json())
        .then(data => setCalls(data.items));
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
    <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
        <table className="w-full text-sm text-left">
            <thead className="bg-[#032ca6]/5 text-[#032ca6]">
                <tr>
                    <th className="px-4 py-3">Date et Heure</th>
                    <th className="px-4 py-3">Durée de l'appel</th>
                    <th className="px-4 py-3">Numéro appelant</th>
                    <th className="px-4 py-3">Numéro appelé</th>
                    <th className="px-4 py-3">Raison de fin</th>
                    <th className="px-4 py-3">Status</th>
                </tr>
            </thead>
            
            <tbody>
                {calls.map((call) => (
                    <tr
                    className="border-t border-[#032ca6]/30 font-medium hover:bg-[#032ca6]/5 
                    transition text-[16px]"
                    >
                        <td className="px-4 py-3">{formatDate(call.created_at)} {" "} {formatTime(call.created_at)}</td>
                        <td className="px-4 py-3">{formatDuration(call.duration_seconds)}</td>
                        <td className="px-4 py-3">{call.from_number}</td>
                        <td className="px-4 py-3">{call.to_number}</td>
                        <td className="px-4 py-3">{call.disconnect_reason}</td>
                        <td className="px-4 py-3 flex items-center gap-2">
                            {call.call_status === "ANSWERED" ? (
                                <span className="flex items-center gap-1 bg-green-600 p-1 text-white rounded-full">
                                    <Check size={12} />
                                </span>
                                ) : (
                                <span className="flex items-center gap-1 bg-red-600 p-1 text-white rounded-full">
                                    <X size={12} />
                                </span>
                            )}
                            {call.call_status}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
}
