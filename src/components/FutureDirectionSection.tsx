import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import futureImg from "@/assets/future-direction.jpg";

const VECTORS = [
  {
    id: "V.01",
    label: "AUTONOMOUS DEFENSE",
    description: "Systems that decide, act, and adapt without human latency. Building the next generation of autonomous platforms for contested environments.",
  },
  {
    id: "V.02",
    label: "HIGH-RELIABILITY ENGINEERING",
    description: "Zero-failure-tolerance architecture. Systems designed for missions where downtime equals loss—applying aerospace rigor to defense infrastructure.",
  },
  {
    id: "V.03",
    label: "HUMAN-AI INTEGRATION",
    description: "Cognitive augmentation that scales human capability without adding cognitive load. The operator becomes more dangerous, not more overwhelmed.",
  },
];

const FutureDirectionSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1]);
  const textY = useTransform(scrollYProgress, [0, 1], [80, -40]);

  return (
    <section ref={ref} className="relative min-h-[120vh] w-full overflow-hidden flex items-center">
      <div className="noise-overlay absolute inset-0 pointer-events-none z-10" />

      {/* Background image */}
      <motion.div style={{ scale: imgScale }} className="absolute inset-0 z-0">
        <img
          src={futureImg}
          alt="Future defense command center"
          loading="lazy"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/80" />
      </motion.div>

      {/* Content */}
      <motion.div style={{ y: textY }} className="relative z-20 container mx-auto px-6 md:px-16 py-20">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="w-12 h-px bg-primary/30" />
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-mono text-primary/50"
            >
              WHERE THIS IS GOING
            </motion.span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-display font-light tracking-tight text-foreground text-4xl sm:text-5xl lg:text-6xl max-w-3xl"
          >
            The trajectory <span className="text-primary">doesn't stop.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-muted-foreground font-light text-lg mt-6 max-w-2xl leading-relaxed"
          >
            Every stage built capability for what comes next. The systems are getting more complex, the stakes higher, and the margin for error thinner. That's the point.
          </motion.p>
        </div>

        {/* Vectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {VECTORS.map((vector, i) => (
            <motion.div
              key={vector.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="group"
            >
              <div className="border border-primary/10 p-6 sm:p-8 bg-background/30 backdrop-blur-sm hover:border-primary/30 transition-all duration-500 h-full">
                <span className="text-mono text-primary/30 text-[10px] block mb-4">{vector.id}</span>
                <h3 className="text-mono text-primary text-sm mb-4 tracking-wider">{vector.label}</h3>
                <p className="text-muted-foreground font-light text-sm leading-relaxed">
                  {vector.description}
                </p>
                {/* Glow line at bottom */}
                <motion.div
                  className="h-px bg-gradient-to-r from-primary/40 to-transparent mt-6"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
                  style={{ transformOrigin: "left" }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Signal line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 text-center"
        >
          <span className="text-mono text-muted-foreground/30 text-[10px] tracking-[0.3em]">
            SYSTEMS EVOLVING · TRAJECTORY ASCENDING · MISSION CONTINUES
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FutureDirectionSection;
