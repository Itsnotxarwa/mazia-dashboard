import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CardsData from "../data/cardsData";
import Sidebar from "./sidebar";
import Overview from "./overview";


export default function Dashboard() {
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

            <main 
            onClick={() => isSmallScreen && open && setOpen(false)}
            className="bg-gray-100 flex-1">
                <Overview cards={cards} overview={overview} />
            </main>

        </div>
    )
}