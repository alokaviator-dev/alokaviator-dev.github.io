import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import identityImg from "@/assets/identity-portrait.jpg";

const IdentitySection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const textY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} className="relative min-h-screen w-full bg-background overflow-hidden">
      <div className="noise-overlay absolute inset-0 pointer-events-none z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Image side */}
        <motion.div style={{ y: imgY }} className="relative h-[60vh] lg:h-auto overflow-hidden">
          <img
            src={identityImg}
            alt="Alok Srivastav portrait"
            loading="lazy"
            width={1024}
            height={1280}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background lg:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent lg:hidden" />
          {/* HUD overlay */}
          <div className="absolute bottom-6 left-6 text-mono text-primary/40">
            <span>PROFILE.02</span>
          </div>
        </motion.div>

        {/* Text side */}
        <motion.div
          style={{ y: textY }}
          className="flex items-center px-8 md:px-16 lg:px-20 py-16 lg:py-0"
        >
          <div className="max-w-lg">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-mono text-primary/60 mb-8 block"
            >
              IDENTITY
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-display text-section text-foreground mb-8"
            >
              Not a title.
              <br />
              <span className="text-primary">A trajectory.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-muted-foreground font-light leading-relaxed text-lg"
            >
              Aerospace engineer turned founder. Building defense systems
              at the intersection of autonomy, intelligence, and precision.
              Every system I build exists because the alternative was unacceptable.
            </motion.p>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6 }}
              className="h-px bg-primary/30 mt-12 origin-left"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IdentitySection;
