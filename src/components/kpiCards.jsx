import CardsData from "../data/cardsData";
import Bg from "../assets/bg.png";
import { TrendingUp, Activity } from "lucide-react";

export default function kpiCards() {
    return(
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {CardsData.map((card, i) => {
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
                            <span className="text-green-700 bg-green-200 px-1 rounded-full text-[10px] flex gap-1 text-nowrap items-center">
                            <Icon size={12} />
                            +77%
                            vs hier
                            </span>
                        </p>
                        <div className="flex items-end justify-between mt-2">
                            <span className="text-2xl font-semibold text-white">
                                {card.value}
                            </span>
                        </div>
                        <p className="flex gap-1 items-center text-sm text-white mt-6">
                            <span>Activité de votre L'AI</span> 
                            <Activity size={12} />
                        </p>
                        <p className="flex gap-1 items-center text-xs text-gray-500 mt-2">
                            <span>Appels traités par l'agent AI</span> 
                        </p>
                    </div>
                </div>
            )})}
        </div>
    )
}