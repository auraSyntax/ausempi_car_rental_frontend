import { useParams } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { Navbar, Footer, ReserveCTA } from "@/components/sections";
import { ServiceHero } from "@/components/sections/service-details/ServiceHero";
import { ServiceOverview } from "@/components/sections/service-details/ServiceOverview";
import { ExperienceHighlights } from "@/components/sections/service-details/ExperienceHighlights";
import { TierBreakdown } from "@/components/sections/service-details/TierBreakdown";
import { VehicleShowcase } from "@/components/sections/service-details/VehicleShowcase";
import { UseCases } from "@/components/sections/service-details/UseCases";

const SERVICES_DATA = {
  "luxury-sedan": {
    title: "Luxury Sedan Service",
    tagline: "The Pinnacle of Executive Travel",
    heroImage: "https://images.unsplash.com/photo-1617469767053-d3b508a0d84d?auto=format&fit=crop&q=80",
    overviewText: "Experience the ultimate in executive transportation with our Luxury Sedan Service. Perfect for solo travelers or small groups seeking discretion, comfort, and sophistication.",
    overviewImage: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80",
    highlights: [
      { title: "Maximum Comfort", description: "Leather interiors and climate control for a relaxing journey." },
      { title: "Professional Chauffeurs", description: "Vetted, experienced drivers dedicated to your schedule." },
      { title: "Privacy & Safety", description: "Tinted windows and advanced safety features for peace of mind." },
      { title: "Premium Amenities", description: "Complimentary water, Wi-Fi, and charging ports." },
    ],
    showcase: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1603584173870-7f1370257925?auto=format&fit=crop&q=80",
    ],
  },
  "luxury-suv": {
    title: "Luxury SUV Service",
    tagline: "Spacious Elegance for Every Occasion",
    heroImage: "https://images.unsplash.com/photo-1606148695344-b6ed50bb3f5d?auto=format&fit=crop&q=80",
    overviewText: "Our Luxury SUV Service offers unparalleled space and presence. Ideal for groups, families, or those who prefer a commanding view of the road without compromising on luxury.",
    overviewImage: "https://images.unsplash.com/photo-1517524008436-bbdb53ac54b8?auto=format&fit=crop&q=80",
    highlights: [
      { title: "Spacious Cabin", description: "Ample legroom and luggage space for up to 6 passengers." },
      { title: "Executive Presence", description: "Make an entrance with our fleet of premium SUVs." },
      { title: "All-Weather Capability", description: "Safe and reliable transport regardless of road conditions." },
      { title: "Premium Entertainment", description: "High-end sound systems and rear-seat entertainment options." },
    ],
    showcase: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1605898835373-023bbba1d261?auto=format&fit=crop&q=80",
    ],
  },
};

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const service = SERVICES_DATA[serviceId as keyof typeof SERVICES_DATA] || SERVICES_DATA["luxury-sedan"];

  return (
    <MainLayout>
      <Navbar />
      <ServiceHero 
        title={service.title} 
        tagline={service.tagline} 
        image={service.heroImage} 
      />
      <ServiceOverview 
        text={service.overviewText} 
        image={service.overviewImage} 
      />
      <ExperienceHighlights highlights={service.highlights} />
      <TierBreakdown />
      <VehicleShowcase images={service.showcase} />
      <UseCases />
      <ReserveCTA />
      <Footer />
    </MainLayout>
  );
};

export default ServiceDetails;
