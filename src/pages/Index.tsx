import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import IdentitySection from "@/components/IdentitySection";
import HowIThinkSection from "@/components/HowIThinkSection";
import PressureSection from "@/components/PressureSection";
import SignatureWorkSection from "@/components/SignatureWorkSection";
import PhilosophySection from "@/components/PhilosophySection";
import FinalCTA from "@/components/FinalCTA";
import CursorGlow from "@/components/CursorGlow";

const Index = () => {
  const [entered, setEntered] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    setEntered(true);
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <div className="bg-background min-h-screen">
      <CursorGlow />

      {/* Hero always visible */}
      <HeroSection onEnter={handleEnter} />

      {/* Content sections */}
      <AnimatePresence>
        {entered && (
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <IdentitySection />
            <HowIThinkSection />
            <PressureSection />
            <SignatureWorkSection />
            <PhilosophySection />
            <FinalCTA />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
