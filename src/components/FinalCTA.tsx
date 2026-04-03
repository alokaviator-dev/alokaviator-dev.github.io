import { motion } from "framer-motion";

const FinalCTA = () => {
  return (
    <section className="relative min-h-screen w-full bg-background flex items-center justify-center overflow-hidden">
      <div className="noise-overlay absolute inset-0 pointer-events-none z-10" />

      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[400px] h-[400px] rounded-full bg-primary/8 blur-[100px] animate-pulse-glow" />
      </div>

      <div className="relative z-20 text-center px-8">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="text-display text-hero text-foreground mb-12"
        >
          Work with <span className="text-primary">me.</span>
        </motion.h2>

        <motion.a
          href="mailto:alok.aviator@gmail.com"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="inline-block px-12 py-4 border border-primary/40 text-primary text-mono tracking-widest
                     hover:bg-primary/10 hover:border-primary/60 transition-all duration-500
                     glow-accent shadow-none"
        >
          INITIATE CONTACT
        </motion.a>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-24 text-mono text-muted-foreground/40"
        >
          <span>© 2026 ALOK SRIVASTAV</span>
          <br />
          <span className="text-[10px]">ALL SYSTEMS NOMINAL</span>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
