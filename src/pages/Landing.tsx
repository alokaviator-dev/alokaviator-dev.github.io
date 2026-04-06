import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ParticleField from "@/components/ParticleField";
import heroImg from "@/assets/hero-portrait.webp";

const bootLines = [
  { text: "INITIALIZING CORE SYSTEMS...", delay: 0 },
  { text: "NEURAL LINK ................. ACTIVE", delay: 0.4 },
  { text: "SENSOR ARRAY ................ ONLINE", delay: 0.8 },
  { text: "TELEMETRY FEED .............. SYNCED", delay: 1.2 },
  { text: "ENCRYPTION LAYER ............ AES-256", delay: 1.6 },
  { text: "BIOMETRIC AUTH .............. VERIFIED", delay: 2.0 },
  { text: "CLEARANCE LEVEL ............. ALPHA", delay: 2.4 },
  { text: "SYSTEM STATUS ............... NOMINAL", delay: 2.8 },
];

const Landing = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"boot" | "hero">("boot");
  const [bootComplete, setBootComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBootComplete(true);
    }, 3600);

    const heroTimer = setTimeout(() => {
      setPhase("hero");
    }, 4200);

    return () => {
      clearTimeout(timer);
      clearTimeout(heroTimer);
    };
  }, []);

  const handleEnter = () => {
    navigate("/experience");
  };

  return (
    <div className="bg-background min-h-[100svh] overflow-hidden relative">
      <div className="noise-overlay absolute inset-0 pointer-events-none z-50" />

      <AnimatePresence mode="wait">
        {phase === "boot" && (
          <motion.div
            key="boot"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 bg-background flex items-center justify-center z-40 min-h-[100svh]"
          >
            {/* Scanline effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--accent-green) / 0.1) 2px, hsl(var(--accent-green) / 0.1) 4px)",
                }}
              />
            </div>

            {/* Corner brackets */}
            <div className="absolute top-6 left-6">
              <div className="w-12 h-12 border-l-2 border-t-2 border-primary/30" />
            </div>
            <div className="absolute top-6 right-6">
              <div className="w-12 h-12 border-r-2 border-t-2 border-primary/30" />
            </div>
            <div className="absolute bottom-6 left-6">
              <div className="w-12 h-12 border-l-2 border-b-2 border-primary/30" />
            </div>
            <div className="absolute bottom-6 right-6">
              <div className="w-12 h-12 border-r-2 border-b-2 border-primary/30" />
            </div>

            {/* Boot sequence */}
            <div className="w-full max-w-xl px-8">
              {/* System header */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 0.3 }}
                className="text-mono text-primary/60 mb-1 text-[10px]"
              >
                SRIVASTAV SYSTEMS v4.2.1
              </motion.div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5 }}
                className="h-px bg-primary/20 mb-8 origin-left"
              />

              {/* Boot lines */}
              <div className="space-y-2 font-mono">
                {bootLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: line.delay }}
                    className="text-xs md:text-sm text-primary/70 flex items-center gap-2"
                  >
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1] }}
                      transition={{ delay: line.delay + 0.2 }}
                      className="text-primary/40"
                    >
                      ›
                    </motion.span>
                    {line.text}
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: line.delay + 0.25 }}
                      className="text-primary ml-auto"
                    >
                      ✓
                    </motion.span>
                  </motion.div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="mt-10 relative">
                <div className="h-px bg-primary/10 w-full" />
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: bootComplete ? 1 : 0.85 }}
                  transition={{ duration: 3.2, ease: "easeInOut" }}
                  className="absolute top-0 left-0 h-px bg-primary/60 w-full origin-left"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: bootComplete ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-mono text-primary/50 text-[10px] mt-3 text-center"
                >
                  BOOT SEQUENCE COMPLETE — ENTERING MAINFRAME
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {phase === "hero" && (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-40 min-h-[100svh]"
          >
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
              transition={{ duration: 2, delay: 0.8, ease: "easeOut" }}
              className="absolute right-0 top-0 h-full w-[55%] z-[1]"
            >
              <img
                src={heroImg}
                alt="Alok Srivastav"
                className="h-full w-full object-cover object-center"
                width={1280}
                height={1600}
                fetchPriority="high"
                decoding="async"
              />
              <div className="absolute inset-0 gradient-fade-right" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
              <div className="absolute inset-0 bg-background/20" />
              <div className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-background via-background/80 to-transparent" />
            </motion.div>

            {/* HUD corners */}
            <div className="absolute top-8 left-8 z-20 pointer-events-none">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 1.5, duration: 1 }}
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
                transition={{ delay: 1.7, duration: 1 }}
                className="text-mono text-primary/60 text-right"
              >
                <span className="block">LAT 28.5383° N</span>
                <span className="block">LON 80.6036° W</span>
                <div className="w-8 h-8 border-r border-b border-primary/30 ml-auto mt-2" />
              </motion.div>
            </div>

            {/* Main text */}
            <div className="absolute inset-0 flex items-center z-20 rounded-none shadow-xl">
              <div className="px-6 sm:px-8 md:px-16 lg:px-24 max-w-3xl">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-mono text-primary/70 mb-3 md:mb-4"
                >
                  ANALOG ASTRONAUT · AERONAUTICAL ENGINEER · SYSTEMS ENGINEER
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="text-display text-foreground mb-3 md:mb-4 text-[clamp(2.2rem,6vw,7rem)] leading-[1.05]"
                >
                  I design systems others don't understand{" "}
                  <span className="text-primary">yet.</span>
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
                  transition={{ duration: 0.8, delay: 1.4 }}
                  onClick={handleEnter}
                  className="mt-6 md:mt-10 px-8 py-3 border border-primary/40 text-primary text-mono tracking-widest
                             hover:bg-primary/10 hover:border-primary/60 transition-all duration-500
                             glow-accent cursor-pointer rounded-lg shadow-none"
                >
                  ENTER
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Landing;
