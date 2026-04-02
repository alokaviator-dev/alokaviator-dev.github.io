import { motion } from "framer-motion";
import IdentitySection from "@/components/IdentitySection";
import HowIThinkSection from "@/components/HowIThinkSection";
import PressureSection from "@/components/PressureSection";
import SignatureWorkSection from "@/components/SignatureWorkSection";
import PhilosophySection from "@/components/PhilosophySection";
import FinalCTA from "@/components/FinalCTA";
import CursorGlow from "@/components/CursorGlow";

const Experience = () => {
  return (
    <>
      {/* Reveal wipe — peels away to show content */}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-[100] origin-right bg-background"
      />
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 0.7, delay: 0.25, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-[99] origin-right"
        style={{ background: "linear-gradient(135deg, hsl(var(--deep-green)), hsl(var(--background)))" }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="bg-background min-h-screen"
      >
        <CursorGlow />
        <IdentitySection />
        <HowIThinkSection />
        <PressureSection />
        <SignatureWorkSection />
        <PhilosophySection />
        <FinalCTA />
      </motion.div>
    </>
  );
};

export default Experience;
