import { TrendingUp, Clock } from "lucide-react";

const CardsData = [
{
    id: "total_calls",
    title: "Appels aujourd’hui",
    value: 1248,
    unit: "appels",
    icon: TrendingUp,
},
{
    id: "avg_call_duration",
    title: "Durée totale (minutes)",
    value: "3m 42s",
    icon: Clock,
},
{
    id: "resolution_rate",
    title: "Durée moyenne",
    value: 78,
    unit: "%",
    icon: Clock,
}
];

export default CardsData;