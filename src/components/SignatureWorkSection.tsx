import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import droneImg from "@/assets/drone-system.jpg";
import systemsImg from "@/assets/systems-visual.jpg";

const SignatureWorkSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [80, -20]);

  return (
    <section ref={ref} className="relative bg-background overflow-hidden py-24 lg:py-0">
      <div className="noise-overlay absolute inset-0 pointer-events-none z-10" />

      {/* First project */}
      <div className="relative min-h-screen flex items-center">
        <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
          <img
            src={droneImg}
            alt="Autonomous drone system"
            loading="lazy"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
        </motion.div>

        {/* HUD overlay */}
        <div className="absolute inset-0 z-[5] pointer-events-none">
          <div className="absolute top-1/4 right-16 w-48 h-48 border border-primary/10 rounded-full" />
          <div className="absolute top-1/4 right-20 w-40 h-40 border border-primary/5 rounded-full mt-4 mr-4" />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.2 }}
            viewport={{ once: true }}
            className="absolute bottom-16 right-16 text-mono text-primary/40 text-right"
          >
            <span>CLASSIFICATION: RESTRICTED</span>
            <br />
            <span>STATUS: OPERATIONAL</span>
          </motion.div>
        </div>

        <div className="relative z-20 px-8 md:px-16 lg:px-24 max-w-2xl">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-mono text-primary/60 mb-6 block"
          >
            SIGNATURE WORK
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-display text-section text-foreground mb-6"
          >
            Autonomous
            <br />
            <span className="text-primary">defense systems.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-muted-foreground font-light text-lg leading-relaxed"
          >
            Designing UAV platforms that operate beyond human reaction time.
            Sensor fusion. Autonomous navigation. Precision at scale.
          </motion.p>
        </div>
      </div>

      {/* Second project */}
      <div className="relative min-h-screen flex items-center">
        <motion.div style={{ y: y2 }} className="absolute inset-0 z-0">
          <img
            src={systemsImg}
            alt="Command and control systems"
            loading="lazy"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/60" />
          <div className="absolute inset-0 bg-gradient-to-l from-background via-background/40 to-transparent" />
        </motion.div>

        <div className="relative z-20 px-8 md:px-16 lg:px-24 ml-auto max-w-2xl text-right">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-mono text-primary/60 mb-6 block"
          >
            COMMAND & CONTROL
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-display text-section text-foreground mb-6"
          >
            Systems that
            <br />
            <span className="text-primary">never sleep.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-muted-foreground font-light text-lg leading-relaxed"
          >
            Real-time monitoring. Multi-domain awareness.
            Architecture built for the fog of war.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default SignatureWorkSection;
