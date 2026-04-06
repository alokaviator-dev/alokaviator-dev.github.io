import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import TextReveal from "./TextReveal";
import TextScramble from "./TextScramble";

const PhilosophySection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.95]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-3, 0, 2]);

  return (
    <section ref={ref} className="relative min-h-screen w-full bg-background flex items-center justify-center overflow-hidden">
      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ scale }}
      >
        <motion.div
          className="w-[800px] h-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, hsl(var(--primary) / 0.03) 40%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-px h-32 bg-gradient-to-b from-primary/20 to-transparent pointer-events-none"
        animate={{ y: [-20, 20, -20], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-32 h-px bg-gradient-to-r from-primary/20 to-transparent pointer-events-none"
        animate={{ x: [-20, 20, -20], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <motion.div style={{ scale, rotate }} className="relative z-20 px-8 text-center max-w-5xl">
        <TextScramble
          text="PHILOSOPHY"
          className="text-mono text-primary/60 mb-16 block"
          delay={0.2}
        />

        <div className="text-display text-hero text-foreground">
          <TextReveal delay={0.4} className="block" staggerChildren={0.06}>
            Simplicity
          </TextReveal>
          <TextReveal delay={0.7} className="block" staggerChildren={0.05}>
            is the ultimate
          </TextReveal>
          <TextReveal delay={1.0} className="block text-primary" staggerChildren={0.06}>
            sophistication.
          </TextReveal>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 1.5, ease: [0.77, 0, 0.175, 1] }}
          className="h-px bg-primary/20 mt-16 mx-auto max-w-xs origin-center"
        />

        <TextScramble
          text="EVERY SYSTEM. EVERY LINE. EVERY DECISION."
          className="text-mono text-muted-foreground mt-8 block"
          delay={1.8}
          speed={20}
        />
      </motion.div>
    </section>
  );
};

export default PhilosophySection;
