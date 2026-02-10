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
        <div className="bg-white rounded-lg min-h-screen lg:ml-68 p-14">
            <h2 className="font-bold text-lg mb-3">
                Conversation
            </h2>
            <p className="text-md text-[#032ca6] mb-3">
                Entre {" "} {selectedCall.from_number} et {" "} {selectedCall.to_number}
            </p>

            
                {parsedTranscription.map((item, index) => (
                    <div className={`space-y-2 flex flex-col max-w-xl mx-auto mt-4
                    ${item.role === "user" ? "items-start" : "items-end"}`}>
                    <div
                    key={index}
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
                ))}

            <div>
                <p><b>Date:</b> {formatDate(selectedCall.created_at)}</p>
                <p><b>Durée:</b> {formatDuration(selectedCall.duration_seconds)}</p>
                <p><b>De:</b> {selectedCall.from_number}</p>
                <p><b>À:</b> {selectedCall.to_number}</p>
                <p><b>Statut:</b> {selectedCall.call_status}</p>
                <p><b>Raison:</b> {selectedCall.disconnect_reason}</p>
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