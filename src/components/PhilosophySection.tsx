import { motion } from "framer-motion";

const words = [
  { text: "Simplicity", delay: 0 },
  { text: "is the ultimate", delay: 0.3 },
  { text: "sophistication.", delay: 0.6 },
];

const PhilosophySection = () => {
  return (
    <section className="relative min-h-screen w-full bg-background flex items-center justify-center overflow-hidden">
      {/* Removed noise-overlay for performance */}

      {/* Subtle background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative z-20 px-8 text-center max-w-5xl">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-mono text-primary/60 mb-16 block"
        >
          PHILOSOPHY
        </motion.span>

        <div className="text-display text-hero text-foreground">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: word.delay }}
              className={`block ${i === 2 ? "text-primary" : ""}`}
            >
              {word.text}
            </motion.span>
          ))}
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 1 }}
          className="h-px bg-primary/20 mt-16 mx-auto max-w-xs origin-center"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-mono text-muted-foreground mt-8"
        >
          EVERY SYSTEM. EVERY LINE. EVERY DECISION.
        </motion.p>
      </div>
    </section>
  );
};

export default PhilosophySection;
