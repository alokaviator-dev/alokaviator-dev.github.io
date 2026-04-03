import { motion } from "framer-motion";
import IdentitySection from "@/components/IdentitySection";
import TrajectorySection from "@/components/TrajectorySection";
import HowIThinkSection from "@/components/HowIThinkSection";
import InflectionPointsSection from "@/components/InflectionPointsSection";
import PressureSection from "@/components/PressureSection";
import SignatureWorkSection from "@/components/SignatureWorkSection";
import FutureDirectionSection from "@/components/FutureDirectionSection";
import PhilosophySection from "@/components/PhilosophySection";
import FinalCTA from "@/components/FinalCTA";
import CursorGlow from "@/components/CursorGlow";

const Experience = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-background min-h-screen"
    >
      <CursorGlow />
      <IdentitySection />
      <TrajectorySection />
      <HowIThinkSection />
      <InflectionPointsSection />
      <PressureSection />
      <SignatureWorkSection />
      <FutureDirectionSection />
      <PhilosophySection />
      <FinalCTA />
    </motion.div>
  );
};

export default Experience;
