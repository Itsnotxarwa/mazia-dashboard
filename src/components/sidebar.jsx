import { useState } from "react";
import { LayoutDashboard, ChartColumn, Bot, Settings } from "lucide-react";
import Logo from "../assets/image.png";


export default function Sidebar() {
    const [active, setActive] = useState("dashboard");

    const handleNavClick = (name) => {
        setActive(name);
    };

    const links = [
        { name: "dashboard", label: "Tableau de bord", icon: <LayoutDashboard size={20} /> },
        { name: "history", label: "Historique des appels", icon: <ChartColumn size={20} /> },
        { name: "bot", label: "Mon IA téléphonique", icon: <Bot size={20} /> },
        { name: "settings", label: "Réglages", icon: <Settings size={20} /> },
    ];

    return(
            <div className="border border-r border-gray-300 bg-white">
            <aside className="flex flex-col w-68 px-6 h-full 
            py-8 transition-all duration-300 ease-in-out">
                <div className="flex items-center justify-center">
                    <img src={Logo} alt="Mazia" className="w-40" />
                </div>
                
                <nav className="space-y-2 mt-18">
                    {links.map((link) => (
                        <a
                        key={link.name}
                        className={`flex text-left transition-all duration-300 transform cursor-pointer
                            gap-3 px-4 py-2 text-nowrap text-sm
                            ${active === link.name ? "text-black font-medium bg-gray-100" : "text-gray-500 hover:bg-gray-100 hover:scale-105"}`}
                        onClick={() => handleNavClick(link.name)}
                        >
                            {link.icon}
                            <span className="transition-all duration-300 ease-in-out ">{link.label}</span>
                        </a>
                    ))}
                </nav>
                
            </aside>
            </div>

    )
}