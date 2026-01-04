import {
  Navbar,
  Hero,
  Services,
  Fleet,
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
      <Fleet />
      <Experience />
      <AppDownload />
      <Footer />
    </MainLayout>
  );
};

export default Index;
