import { useEffect, useState } from "react";
import CardsData from "../data/cardsData";
import Bg from "../assets/bg.png";
import { Activity } from "lucide-react";

export default function KpiCards() {
    const [overview, setOverview] = useState(null);
    
    useEffect(() => {
        fetch("https://api.voixup.fr/dashboard/v1/overview")
        .then(res => res.json())
        .then(setOverview);
    }, []);
    
    if (!overview) return null;
    
    const cards = CardsData(overview);

    return(
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {cards.map((card, i) => {
                const Icon = card.icon;
                return(
                <div 
                key={i} 
                className="group relative  rounded-xl p-4 shadow-2xl transition-all 
                duration-300 hover:scale-[1.02]">
                    <img src={Bg} className="absolute inset-0 object-cover z-0 w-full h-full rounded-xl" />
                    <div className="relative z-50">
                        <p className="text-xs text-gray-300 flex justify-between">
                            <span>
                                {card.title}
                            </span> 
                            <span className={`${card.style} px-2 py-0.5 rounded-full text-[10px] 
                            flex gap-1 text-nowrap items-center justify-center`}>
                            <Icon size={12} />
                            {card.trendValue}
                            </span>
                        </p>
                        <div className="flex items-end justify-between mt-2">
                            <span className="text-2xl font-semibold text-white">
                                {card.value}
                            </span>
                        </div>
                        <p className="flex gap-1 items-center text-sm text-white mt-6">
                            <span>
                                {card.subtitle1}
                            </span> 
                        </p>
                        <p className="flex gap-1 items-center text-xs text-gray-50 mt-2">
                            <span>{card.subtitle2}</span> 
                        </p>
                    </div>
                </div>
            )})}
        </div>
    )
}