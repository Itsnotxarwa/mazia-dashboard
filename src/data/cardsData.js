import { TrendingUp, TrendingDown, Clock, CheckCircle, XCircle } from "lucide-react";

const res = await fetch("https://api.voixup.fr/dashboard/v1/overview");
const data = await res.json();

const today = data.volume.calls_today;
const yesterday = data.volume.calls_last_7_days - today;

const diff = today - yesterday;
const percent = yesterday ? Math.round((diff / yesterday) * 100) : 0;

const CardsData = (data) => [
{
    id: "calls_today",
    title: "Appels aujourd’hui",
    value: data.volume.calls_today,
    unit: "appels",
    icon: diff >= 0 ? TrendingUp : TrendingDown,
    trend: diff >= 0 ? "up" : "down",
    trendValue: `${diff >= 0 ? "+" : ""}${percent}% vs hier`,
    subtitle1: "Activité de l'AI aujourd'hui",
    subtitle2: "Appels traités par l'agent AI",
    style: diff >= 0 ? "text-green-700 bg-green-200" : "text-red-700 bg-red-200",
},
{
    id: "total_duration_seconds",
    title: "Durée totale (secondes)",
    value: data.time.total_duration_seconds,
    icon: Clock,
    trendValue: `secondes`,
    subtitle1: "Temps total d'appels",
    subtitle2: "Durée totale des appels traités",    
    style: "border border-black rounded-full font-medium"
},
{
    id: "answered_calls",
    title: "Appels répondus",
    value: data.call_status.answered,
    icon: CheckCircle,
    trendValue: "appels",
    subtitle1: "Appels répondus par l'agent AI",
    subtitle2: "Nombre d'appels traités avec succès",
    style: "border border-black rounded-full font-medium"
},
{
    id: "missed_calls",
    title: "Appels manqués",
    value: data.call_status["not_answered/rejected"],
    icon: XCircle,
    trendValue: "appels",
    subtitle1: "Appels manqués par l'agent AI",
    subtitle2: "Nombre d'appels non traités ou rejetés",
    style: "text-red-700 bg-red-200 rounded-full font-medium"
}
];

export default CardsData;