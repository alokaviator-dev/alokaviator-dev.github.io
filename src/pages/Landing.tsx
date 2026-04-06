import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ParticleField from "@/components/ParticleField";
import MagneticButton from "@/components/MagneticButton";
import TextScramble from "@/components/TextScramble";
import TextReveal from "@/components/TextReveal";
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
    const timer = setTimeout(() => setBootComplete(true), 3600);
    const heroTimer = setTimeout(() => setPhase("hero"), 4200);
    return () => { clearTimeout(timer); clearTimeout(heroTimer); };
  }, []);

  const handleEnter = () => navigate("/experience");

  return (
    <div className="bg-background min-h-[100svh] overflow-hidden relative">
      <div className="noise-overlay absolute inset-0 pointer-events-none z-50" />

      <AnimatePresence mode="wait">
        {phase === "boot" && (
          <motion.div
            key="boot"
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
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
              {/* Scanning beam */}
              <motion.div
                className="absolute left-0 right-0 h-px bg-primary/20"
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* Corner brackets */}
            {[
              "top-6 left-6 border-l-2 border-t-2",
              "top-6 right-6 border-r-2 border-t-2",
              "bottom-6 left-6 border-l-2 border-b-2",
              "bottom-6 right-6 border-r-2 border-b-2",
            ].map((pos, i) => (
              <motion.div
                key={i}
                className={`absolute ${pos.split(" ").slice(0, 2).join(" ")}`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className={`w-12 h-12 ${pos.split(" ").slice(2).join(" ")} border-primary/30`} />
              </motion.div>
            ))}

            {/* Boot sequence */}
            <div className="w-full max-w-xl px-8">
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
                transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] }}
                className="h-px bg-primary/20 mb-8 origin-left"
              />

              <div className="space-y-2 font-mono">
                {bootLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: line.delay, ease: [0.215, 0.61, 0.355, 1] }}
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
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: line.delay + 0.25, type: "spring", stiffness: 300 }}
                      className="text-primary ml-auto"
                    >
                      ✓
                    </motion.span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 relative">
                <div className="h-px bg-primary/10 w-full" />
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: bootComplete ? 1 : 0.85 }}
                  transition={{ duration: 3.2, ease: "easeInOut" }}
                  className="absolute top-0 left-0 h-px bg-primary/60 w-full origin-left"
                />
                {/* Glowing tip on progress bar */}
                <motion.div
                  className="absolute top-0 h-px w-8 bg-primary"
                  style={{ filter: "blur(4px)" }}
                  initial={{ left: "0%" }}
                  animate={{ left: bootComplete ? "100%" : "85%" }}
                  transition={{ duration: 3.2, ease: "easeInOut" }}
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
            transition={{ duration: 1.2, ease: [0.215, 0.61, 0.355, 1] }}
            className="fixed inset-0 z-40 min-h-[100svh]"
          >
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
              initial={{ opacity: 0, scale: 1.1, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
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
                <TextScramble text="SYS.ONLINE" className="text-mono text-primary/60 mt-2 block" delay={1.8} />
              </motion.div>
            </div>

            <div className="absolute bottom-8 right-8 z-20 pointer-events-none">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 1.7, duration: 1 }}
                className="text-mono text-primary/60 text-right"
              >
                <TextScramble text="LAT 28.5383° N" className="text-mono text-primary/60 block" delay={2} />
                <TextScramble text="LON 80.6036° W" className="text-mono text-primary/60 block" delay={2.2} />
                <div className="w-8 h-8 border-r border-b border-primary/30 ml-auto mt-2" />
              </motion.div>
            </div>

            {/* Main text */}
            <div className="absolute inset-0 flex items-center z-20">
              <div className="px-6 sm:px-8 md:px-16 lg:px-24 max-w-3xl">
                <TextScramble
                  text="ANALOG ASTRONAUT · ENGINEER · SYSTEMS ARCHITECT"
                  className="text-mono text-primary/70 mb-3 md:mb-4 block"
                  delay={0.3}
                  speed={20}
                />

                <div className="text-display text-foreground mb-3 md:mb-4 text-[clamp(2.2rem,6vw,7rem)] leading-[1.05]">
                  <TextReveal delay={0.6} staggerChildren={0.05}>
                    I design systems others don't understand
                  </TextReveal>
                  {" "}
                  <TextReveal delay={1.2} className="text-primary" staggerChildren={0.08}>
                    yet.
                  </TextReveal>
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                  className="text-subtitle text-muted-foreground font-light tracking-wide"
                >
                  Alok Srivastav
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.8 }}
                  className="mt-6 md:mt-10"
                >
                  <MagneticButton
                    onClick={handleEnter}
                    strength={0.4}
                    className="px-8 py-3 border border-primary/40 text-primary text-mono tracking-widest
                               hover:bg-primary/10 hover:border-primary/60 transition-all duration-500
                               glow-accent cursor-pointer rounded-lg shadow-none relative overflow-hidden group"
                  >
                    <span className="relative z-10">ENTER</span>
                    <motion.span
                      className="absolute bottom-0 left-0 right-0 h-px bg-primary"
                      animate={{ scaleX: [0, 1, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </MagneticButton>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Landing;
