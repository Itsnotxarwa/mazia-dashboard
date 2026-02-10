import { X } from "lucide-react";

export default function CallDetails({ selectedCall, setSelectedCall }) {
    const parsedTranscription = JSON.parse(selectedCall.transcription);
    console.log("Parsed Transcription:", parsedTranscription);
    const formatDate = (datetime) => datetime.split("T")[0];

    const formatDuration = (seconds) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec.toString().padStart(2, "0")}`;
    };
    return (
    <div className="fixed inset-0 bg-black/40 z-50 p-0.5">
        <div className="bg-white rounded-lg h-screen mb-4 lg:ml-200 p-14 overflow-y-auto relative">
            <h2 className="font-bold text-lg mb-3">
                Conversation
            </h2>
            <p className="text-md text-[#032ca6] mb-3">
                Entre {" "} {selectedCall.from_number} et {" "} {selectedCall.to_number}
            </p>

            
                {parsedTranscription && parsedTranscription.length > 0 ? (
                    parsedTranscription.map((item, index) => (
                    <div 
                    key={index}
                    className={`space-y-2 flex flex-col max-w-xl mx-auto mt-4
                    ${item.role === "user" ? "items-start" : "items-end"}`}>
                        <div
                        className={`p-2 rounded w-115 ${
                        item.role === "user"
                        ? "bg-gray-100 text-left"
                        : "bg-blue-50 text-left"
                        }`}
                        >
                            <span className="font-semibold">
                                {item.role === "user" ? "Client" : "Agent"}:
                            </span>{" "}
                            {item.content}
                        </div>
                    </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 mt-6">
                        Aucune transcription disponible
                    </p>
                )}
            
            <div className="h-px w-full bg-[#032ca6] my-8"></div>

            <div className="space-y-1">
                <p className="flex justify-between font-semibold"><span className="text-[#032ca6] text-md font-semibold">Date:</span> {formatDate(selectedCall.created_at)}</p>
                <p className="flex justify-between font-semibold"><span className="text-[#032ca6] text-md font-semibold">Durée:</span> {formatDuration(selectedCall.duration_seconds)}</p>
                <p className="flex justify-between font-semibold"><span className="text-[#032ca6] text-md font-semibold">De:</span> {selectedCall.from_number}</p>
                <p className="flex justify-between font-semibold"><span className="text-[#032ca6] text-md font-semibold">À:</span> {selectedCall.to_number}</p>
                <p className="flex justify-between font-semibold"><span className="text-[#032ca6] text-md font-semibold">Statut:</span> {selectedCall.call_status === "ANSWERED" ? "Répondu" : "Manqué"}</p>
                <p className="flex justify-between font-semibold"><span className="text-[#032ca6] text-md font-semibold">Raison:</span> {selectedCall.disconnect_reason === "HANGUP_BY_CALLEE" ? "Raccroché par le destinataire" : "Raccroché par l’agent"}</p>
                <p className="flex justify-between font-semibold"><span className="text-[#032ca6] text-md font-semibold">Type d’appel:</span>{selectedCall.call_type === "inbound" ? "Entrant" : selectedCall.call_type === "outbound" ? "Sortant" : selectedCall.call_type}</p>
            </div>
            
            <button
            onClick={() => setSelectedCall(null)}
            className="absolute top-2 right-4 cursor-pointer mt-4 text-[#032ca6]
            transition-colors duration-300 hover:text-[#032ca6]/60"
            >
                <X  />
            </button>
        </div>
    </div>
    )
}