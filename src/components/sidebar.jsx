import { NavLink } from "react-router-dom";
import { LayoutDashboard, ChartColumn, Bot, Settings } from "lucide-react";
import Logo from "../assets/image.png";
import Logo2 from "../assets/image_logo.png";


export default function Sidebar() {

    const links = [
        { name: "dashboard", label: "Tableau de bord", href: "/dashboard", icon: <LayoutDashboard size={20} /> },
        { name: "history", label: "Historique des appels", href: "/history", icon: <ChartColumn size={20} /> },
        { name: "bot", label: "Mon IA téléphonique", href:"/bot", icon: <Bot size={20} /> },
        { name: "settings", label: "Réglages", href: "/settings", icon: <Settings size={20} /> },
    ];


    return(
            <div className="border border-r border-gray-300 bg-white">
            <aside className="flex flex-col w-25 lg:w-68 px-6 h-full 
            py-8 transition-all duration-300 ease-in-out">
                <div className="hidden lg:flex items-center justify-center">
                    <img src={Logo} alt="Mazia" className="w-40" />
                </div>

                <div className="flex lg:hidden items-center justify-center">
                    <img src={Logo2} alt="Mazia" className="w-14" />
                </div>
                
                <nav className="space-y-2 mt-18">
                    {links.map((link) => (
                        <NavLink
                        to={link.href}
                        key={link.name}
                        className={({ isActive }) => `flex text-left transition-all duration-300 transform cursor-pointer
                            gap-3 px-4 py-2 text-nowrap text-sm
                            ${isActive
                                ? "text-black font-medium bg-gray-100"
                                : "text-gray-500 hover:bg-gray-100 hover:scale-105"
                            }`
                        }
                        >
                            {link.icon}
                            <span className="transition-all duration-300 ease-in-out hidden md:block">{link.label}</span>
                        </NavLink>
                    ))}
                </nav>
                
            </aside>
            </div>

    )
}