import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import futureImg from "@/assets/future-direction.webp";
import TextReveal from "./TextReveal";
import TextScramble from "./TextScramble";

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
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
              className="w-12 h-px bg-primary/30 origin-left block"
            />
            <TextScramble text="WHERE THIS IS GOING" className="text-mono text-primary/50" delay={0.2} />
          </div>
          <div className="font-display font-light tracking-tight text-foreground text-4xl sm:text-5xl lg:text-6xl max-w-3xl">
            <TextReveal delay={0.3}>
              The trajectory
            </TextReveal>
            {" "}
            <TextReveal delay={0.6} className="text-primary">
              doesn't stop.
            </TextReveal>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-muted-foreground font-light text-lg mt-6 max-w-2xl leading-relaxed"
          >
            Every stage built capability for what comes next. The systems are getting more complex, the stakes higher, and the margin for error thinner. That's the point.
          </motion.p>
        </div>

        {/* Vectors with staggered card reveal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {VECTORS.map((vector, i) => (
            <motion.div
              key={vector.id}
              initial={{ opacity: 0, y: 60, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.9,
                delay: 0.3 + i * 0.15,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              className="group"
            >
              <div className="border border-primary/10 p-6 sm:p-8 bg-background/30 backdrop-blur-sm hover:border-primary/30 
                              hover:bg-primary/5 transition-all duration-700 h-full relative overflow-hidden">
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at 50% 0%, hsl(var(--primary) / 0.08) 0%, transparent 60%)",
                  }}
                />
                <TextScramble text={vector.id} className="text-mono text-primary/30 text-[10px] block mb-4" delay={0.5 + i * 0.2} />
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
                  transition={{ duration: 1.2, delay: 0.8 + i * 0.2, ease: [0.77, 0, 0.175, 1] }}
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
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-16 text-center"
        >
          <TextScramble
            text="SYSTEMS EVOLVING · TRAJECTORY ASCENDING · MISSION CONTINUES"
            className="text-mono text-muted-foreground/30 text-[10px] tracking-[0.3em]"
            delay={1.5}
            speed={15}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FutureDirectionSection;
