import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import pressureImg from "@/assets/pressure-mission.jpg";

const PressureSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 0.95]);
  const imgY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const textY = useTransform(scrollYProgress, [0, 1], [60, -30]);

  return (
    <section ref={ref} className="relative min-h-[120vh] w-full bg-background overflow-hidden">
      <div className="noise-overlay absolute inset-0 pointer-events-none z-10" />

      {/* Full-width parallax image */}
      <motion.div
        style={{ scale: imgScale, y: imgY }}
        className="absolute inset-0 z-0"
      >
        <img
          src={pressureImg}
          alt="Lunar analog mission"
          loading="lazy"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/80" />
      </motion.div>

      {/* HUD overlay elements */}
      <div className="absolute top-12 right-12 z-20 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          viewport={{ once: true }}
          className="text-mono text-primary/50 text-right"
        >
          <span>MISSION LOG</span>
          <br />
          <span>ANALOG.04</span>
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        style={{ y: textY }}
        className="relative z-20 flex items-center min-h-[120vh] px-8 md:px-16 lg:px-24"
      >
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-mono text-primary/60 mb-8 block"
          >
            PRESSURE TESTED
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-display text-section text-foreground mb-8"
          >
            Forged under
            <br />
            <span className="text-primary">extreme conditions.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-muted-foreground font-light leading-relaxed text-lg"
          >
            Lunar analog missions. Isolation protocols. Decision-making when
            every variable is hostile. These aren't credentials—they're proof
            that pressure doesn't break the system. It reveals it.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
};

export default PressureSection;
