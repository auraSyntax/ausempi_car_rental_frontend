import { ReactNode } from "react";
import { motion } from "framer-motion";
import { pageTransition } from "@/lib/animations";
import { BackToTop } from "@/components/common/BackToTop";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-background"
    >
      {children}
      <BackToTop />
    </motion.div>
  );
};

export default MainLayout;
