import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import identityImg from "@/assets/identity-portrait.webp";
import TextReveal from "./TextReveal";
import TextScramble from "./TextScramble";
import HorizontalWipe from "./HorizontalWipe";
import Marquee from "./Marquee";

const MARQUEE_ITEMS = [
  "ANALOG ASTRONAUT", "SYSTEMS ARCHITECT", "UAV ENGINEER", "DEFENSE TECH",
  "AUTONOMOUS SYSTEMS", "SENSOR FUSION", "MISSION CRITICAL", "ZERO FAILURE TOLERANCE",
];

const IdentitySection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const textY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const imgRotate = useTransform(scrollYProgress, [0, 1], [2, -1]);

  return (
    <section ref={ref} className="relative min-h-screen w-full bg-background overflow-hidden">
      {/* Marquee strip at top */}
      <div className="absolute top-0 left-0 right-0 z-30 border-b border-border/20 bg-background/80 backdrop-blur-sm">
        <Marquee
          items={MARQUEE_ITEMS}
          speed={25}
          className="text-mono text-[10px] text-primary/30 py-2.5 tracking-[0.2em]"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Image side */}
        <motion.div style={{ y: imgY, rotateZ: imgRotate }} className="relative h-[60vh] lg:h-auto overflow-hidden">
          <HorizontalWipe delay={0.2}>
            <img
              src={identityImg}
              alt="Alok Srivastav portrait"
              loading="lazy"
              width={1024}
              height={1280}
              className="w-full h-full object-cover"
            />
          </HorizontalWipe>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background lg:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent lg:hidden" />
          {/* HUD overlay */}
          <motion.div
            className="absolute bottom-6 left-6 text-mono text-primary/40"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <TextScramble text="ALOK SRIVASTAV" className="text-mono text-primary/40" delay={1.2} />
          </motion.div>
        </motion.div>

        {/* Text side */}
        <motion.div
          style={{ y: textY }}
          className="flex items-center px-8 md:px-16 lg:px-20 py-16 lg:py-0"
        >
          <div className="max-w-lg">
            <TextScramble
              text="IDENTITY"
              className="text-mono text-primary/60 mb-8 block"
              delay={0.3}
            />

            <div className="text-display text-section text-foreground mb-8">
              <TextReveal delay={0.5} className="block">
                Not a title.
              </TextReveal>
              <TextReveal delay={0.8} className="block text-primary">
                A trajectory.
              </TextReveal>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-muted-foreground font-light leading-relaxed text-lg"
            >
              Analog astronaut, UAV systems engineer, and founder.<br />
              Building defense systems at the intersection of autonomy, intelligence, and precision.<br />
              Every system exists because the alternative is unacceptable.
            </motion.p>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 1.4, ease: [0.77, 0, 0.175, 1] }}
              className="h-px bg-primary/30 mt-12 origin-left"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IdentitySection;
