import { useEffect, useState } from "react";
import CardsData from "../data/cardsData";
import Sidebar from "./sidebar";
import Overview from "./overview";


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
                <Overview cards={cards} overview={overview} />
            </main>

        </div>
    )
}