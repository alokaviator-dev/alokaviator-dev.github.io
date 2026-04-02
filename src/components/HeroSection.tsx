import { motion } from "framer-motion";
import heroImg from "@/assets/hero-portrait.jpg";
import ParticleField from "./ParticleField";

interface HeroSectionProps {
  onEnter: () => void;
}

const HeroSection = ({ onEnter }: HeroSectionProps) => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-background">
      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay z-10 pointer-events-none" />

      {/* Particle field */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <ParticleField />
      </div>

      {/* Grid lines HUD */}
      <div className="absolute inset-0 z-[5] pointer-events-none opacity-[0.04]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(hsl(var(--accent-green) / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--accent-green) / 0.3) 1px, transparent 1px)
          `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Hero image - right side */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: 1.2, ease: "easeOut" }}
        className="absolute right-0 top-0 h-full w-[55%] z-[1]"
      >
        <img
          src={heroImg}
          alt="Alok Srivastav"
          className="h-full w-full object-cover object-center"
          width={1024}
          height={1280}
        />
        {/* Gradient overlays for blending */}
        <div className="absolute inset-0 gradient-fade-right" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
        <div className="absolute inset-0 bg-background/20" />
        {/* Edge blur */}
        <div className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-background via-background/80 to-transparent" />
      </motion.div>

      {/* HUD corner elements */}
      <div className="absolute top-8 left-8 z-20 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 2, duration: 1 }}
          className="text-mono text-primary/60"
        >
          <div className="w-8 h-8 border-l border-t border-primary/30" />
          <span className="mt-2 block">SYS.ONLINE</span>
        </motion.div>
      </div>

      <div className="absolute bottom-8 right-8 z-20 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="text-mono text-primary/60 text-right"
        >
          <span className="block">LAT 28.5383° N</span>
          <span className="block">LON 80.6036° W</span>
          <div className="w-8 h-8 border-r border-b border-primary/30 ml-auto mt-2" />
        </motion.div>
      </div>

      {/* Main text - left side */}
      <div className="absolute inset-0 flex items-center z-20">
        <div className="px-8 md:px-16 lg:px-24 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-mono text-primary/70 mb-6"
          >
            ANALOG ASTRONAUT · AEROSPACE ENGINEER · SYSTEMS ARCHITECT
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-display text-hero text-foreground mb-6"
          >
            I design systems others don't understand <span className="text-primary">yet.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-subtitle text-muted-foreground font-light tracking-wide"
          >
            Alok Srivastav
          </motion.p>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            onClick={onEnter}
            className="mt-12 px-8 py-3 border border-primary/40 text-primary text-mono tracking-widest
                       hover:bg-primary/10 hover:border-primary/60 transition-all duration-500
                       glow-accent cursor-pointer"
          >
            ENTER
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
