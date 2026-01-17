
import {
    Wifi,
    BatteryCharging,
    Wine,
    Thermometer,
    Shield,
    Clock,
    Crown,
    Star,
    Briefcase
} from "lucide-react";

import luxurySedan from "@/assets/luxury-sedan.avif";
import luxurySuv from "@/assets/luxury-suv.avif";

export const homeServices = [
    {
        id: "sedan",
        title: "Luxury Sedan",
        subtitle: "Executive Excellence",
        description: "Experience the pinnacle of executive travel. Our premium sedans offer a sanctuary of calm and sophistication, designed for the discerning professional who values time and tranquility.",
        image: luxurySedan,
        index: "01",
        tiers: [
            { name: "Premium", icon: Briefcase, features: ["Professional chauffeur", "Complimentary water", "Phone charging"] },
            { name: "Luxury", icon: Crown, features: ["Elite chauffeur", "Premium refreshments", "Dedicated concierge"], highlighted: true },
        ],
        amenities: [
            { icon: Wifi, label: "High-Speed WiFi" },
            { icon: BatteryCharging, label: "Device Charging" },
            { icon: Wine, label: "Refreshments" },
            { icon: Thermometer, label: "Climate Control" },
        ],
    },
    {
        id: "suv",
        title: "Luxury SUV",
        subtitle: "Commanding Presence",
        description: "Uncompromising space meets unparalleled luxury. Our flagship SUVs provide a commanding perspective and abundant room, making every group journey an occasion of shared prestige.",
        image: luxurySuv,
        index: "02",
        tiers: [
            { name: "Premium", icon: Star, features: ["Up to 5 guests", "Luggage capacity", "Airport meet & greet"] },
            { name: "Luxury", icon: Crown, features: ["Up to 6 guests", "Expanded cargo", "VIP handling"], highlighted: true },
        ],
        amenities: [
            { icon: Shield, label: "Privacy Partition" },
            { icon: BatteryCharging, label: "Multiple Ports" },
            { icon: Clock, label: "Flexible Timing" },
            { icon: Thermometer, label: "Dual Climate" },
        ],
    },
];