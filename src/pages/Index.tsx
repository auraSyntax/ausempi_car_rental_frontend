import {
  Navbar,
  Hero,
  Services,
  ServicePackages,
  Fleet,
  About,
  Experience,
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
      <About />
      <Experience />
      <AppDownload />
      <Footer />
    </MainLayout>
  );
};

export default Index;
