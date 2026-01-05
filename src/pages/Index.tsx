import {
  Navbar,
  Hero,
  Services,
  ServicePackages,
  Fleet,
  About,
  Experience,
  ReserveCTA,
  AppDownload,
  Footer,
} from "@/components/sections";
import MainLayout from "@/layouts/MainLayout";

const Index = () => {
  return (
    <MainLayout>
      <Navbar />
      <Hero />
      <Services />
      <ServicePackages />
      <Fleet />
      <ReserveCTA />
      <About />
      <Experience />
      <AppDownload />
      <Footer />
    </MainLayout>
  );
};

export default Index;
