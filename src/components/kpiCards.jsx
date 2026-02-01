
export default function KpiCards({cards}) {


    return(
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {cards.map((card, i) => {
                const Icon = card.icon;
                return(
                <div 
                key={i} 
                className="group relative bg-linear-to-br from-white to-[#032ca6]/20  
                rounded-xl p-4 shadow-md transition-all border border-[#032ca6]/5
                duration-300 hover:scale-[1.02]">
                    <div className="relative z-50">
                        <p className="text-xs flex justify-between">
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
                            <span className="text-2xl font-semibold">
                                {card.value}
                            </span>
                        </div>
                        <p className="flex gap-1 items-center text-sm mt-6">
                            <span>
                                {card.subtitle1}
                            </span> 
                        </p>
                        <p className="flex gap-1 items-center text-xs mt-2">
                            <span>{card.subtitle2}</span> 
                        </p>
                    </div>
                </div>
            )})}
        </div>
    )
}