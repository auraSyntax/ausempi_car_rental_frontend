import React, { Suspense } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Navbar, Hero, Footer } from "@/components/sections";

// Lazy load non-critical sections to improve initial page load performance
const VideoShowcase = React.lazy(() => import("@/components/sections/VideoShowcase"));
const Services = React.lazy(() => import("@/components/sections/Services"));
const ServicePackages = React.lazy(() => import("@/components/sections/ServicePackages"));
const Fleet = React.lazy(() => import("@/components/sections/Fleet"));
const ReserveCTA = React.lazy(() => import("@/components/sections/ReserveCTA"));
const About = React.lazy(() => import("@/components/sections/About"));
const Experience = React.lazy(() => import("@/components/sections/Experience"));
const AppDownload = React.lazy(() => import("@/components/sections/AppDownload"));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[50vh] bg-background">
    <div className="w-8 h-8 rounded-full border-t-2 border-r-2 border-primary animate-spin" />
  </div>
);

const Index = () => {
  return (
    <MainLayout>
      <Navbar />
      <Hero />
      <Suspense fallback={<LoadingFallback />}>
        <VideoShowcase />
        <Services />
        <ServicePackages />
        <Fleet />
        <ReserveCTA />
        <About />
        <Experience />
        <AppDownload />
      </Suspense>
      <Footer />
    </MainLayout>
  );
};

export default Index;
