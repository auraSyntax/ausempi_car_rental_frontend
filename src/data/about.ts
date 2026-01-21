
import {
    Shield,
    UserCheck,
    Crown,
    Zap,
    Globe,
    Clock,
} from "lucide-react";


export const aboutImages = {
    whyChoose: {
        chauffeur: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2069&auto=format&fit=crop", // Professional driver
        amenities: "https://images.unsplash.com/photo-1632731557053-96b678cdb8b3?q=80&w=2070&auto=format&fit=crop" // Luxury car interior detail
    },
    gallery: [
        "https://images.unsplash.com/photo-1506015507548-c89324aca43c?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1570733577533-33bc0255375c?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop"
    ]
};

export const aboutSections = {
    values: [
        {
            title: "Exclusivity",
            text: "Every journey is a unique masterpiece, tailored precisely to your preferences and schedule.",
            icon: Crown
        },
        {
            title: "Integrity",
            text: "Transparent, honest, and professional service at every touchpoint of your experience.",
            icon: UserCheck
        },
        {
            title: "Innovation",
            text: "Leveraging the latest in automotive technology and logistics to ensure seamless travel.",
            icon: Zap
        }
    ],
    whyChoose: [
        {
            title: "Elite Chauffeurs",
            description: "Beyond driving, our chauffeurs are masters of hospitality and local navigation.",
            image: aboutImages.whyChoose.chauffeur
        },
        {
            title: "Bespoke Comfort",
            description: "In-vehicle amenities curated to your specific requirements and tastes.",
            image: aboutImages.whyChoose.amenities
        }
    ],
    stats: [
        { value: "8", label: "Years of Service", suffix: "+" },
        { value: "15", label: "Rides Completed", suffix: "K+" },
        { value: "25", label: "Global Regions", suffix: "+" },
        { value: "99", label: "Client Satisfaction", suffix: ".9%" }
    ],
    gallery: aboutImages.gallery
};

export const featuresList = [
    { icon: Globe, title: "Global Network", text: "Elite service available in 25+ major luxury hubs worldwide, from London to Dubai." },
    { icon: Clock, title: "Precision Timing", text: "Our 15-minute early arrival policy ensures you are never kept waiting." },
    { icon: Shield, title: "Full Privacy", text: "Strict non-disclosure agreements and tinted privacy glass for absolute discretion." }
];
