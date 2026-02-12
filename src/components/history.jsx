import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CallHistoryTable from "./callHistoryTable";
import Sidebar from "./sidebar";
import CallDetails from "./callDetails";

export default function History() {
    const [selectedCall, setSelectedCall] = useState(null);
    const [open, setOpen] = useState(true);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768);
        }
        handleResize();
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize);
    }, [])

    useEffect(() => {
        if (!isSmallScreen) {
            const id = requestAnimationFrame(() => setOpen(true));
            return () => cancelAnimationFrame(id);
        }
    }, [isSmallScreen]);
    return (
        <div className="flex min-h-screen text-black">
            {isSmallScreen && !open && (
                <div
                className="fixed left-0 top-0 h-full w-5 z-50 bg-transparent"
                onMouseDown={() => setOpen(true)}
                onTouchStart={() => setOpen(true)}
                />
            )}
            
            <motion.div
            animate={{ 
                width: isSmallScreen ? (open ? (window.innerWidth >= 1024 ? "17rem" : "4.5rem") : 0) : "auto"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="shrink-0 "
            >
                <Sidebar />
            </motion.div>
            <main onClick={() => isSmallScreen && open && setOpen(false)} className="relative bg-gray-100 flex-1">
                <div className="flex-1 mt-4 mx-3 md:mx-8">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Historique des appels</h2>
                    <p className="text-sm md:text-lg text-black/70">Cette section affichera l'historique détaillé des appels traités par l'agent AI, y compris les dates, les durées, les statuts et d'autres informations pertinentes.</p>
                </div>
                <div className="p-2 md:p-6 lg:p-8">
                    <CallHistoryTable selectedCall={selectedCall} setSelectedCall={setSelectedCall} />
                </div>
                {selectedCall && (
                    <CallDetails selectedCall={selectedCall} setSelectedCall={setSelectedCall} />
                )}
            </main>
        </div>
    );
}