import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Linkedin, Instagram, Phone } from "lucide-react";
import TextReveal from "./TextReveal";
import MagneticButton from "./MagneticButton";
import CountUp from "./CountUp";

const SOCIAL_LINKS = [
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/aloktech" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/alokbuilds/" },
  { icon: Phone, label: "Call", href: "tel:+918951951212" },
];

const STATS = [
  { value: 5, suffix: "+", label: "SYSTEMS BUILT" },
  { value: 14, suffix: " DAYS", label: "LUNAR ANALOG" },
  { value: 98, suffix: "%", label: "MISSION SUCCESS" },
];

const FinalCTA = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);

  return (
    <section ref={ref} className="relative min-h-screen w-full bg-background flex items-center justify-center overflow-hidden">
      {/* Animated background glow */}
      <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <motion.div style={{ scale }} className="relative z-20 text-center px-8">
        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap justify-center gap-8 sm:gap-16 mb-16"
        >
          {STATS.map((stat, i) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-light text-primary tracking-tight">
                <CountUp end={stat.value} suffix={stat.suffix} delay={0.3 + i * 0.2} />
              </div>
              <span className="text-mono text-[9px] text-muted-foreground/50 mt-2 block tracking-[0.15em]">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Title */}
        <div className="text-display text-hero text-foreground mb-12">
          <TextReveal delay={0.2}>
            Work with
          </TextReveal>
          {" "}
          <TextReveal delay={0.5} className="text-primary">
            me.
          </TextReveal>
        </div>

        {/* CTA button with magnetic effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <MagneticButton
            as="a"
            href="mailto:alok.aviator@gmail.com"
            strength={0.4}
            className="inline-block px-12 py-4 border border-primary/40 text-primary text-mono tracking-widest
                       hover:bg-primary/10 hover:border-primary/60 transition-all duration-500
                       glow-accent shadow-none relative overflow-hidden group"
          >
            <span className="relative z-10">INITIATE CONTACT</span>
            {/* Hover sweep effect */}
            <motion.span
              className="absolute inset-0 bg-primary/10 z-0"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.4, ease: [0.77, 0, 0.175, 1] }}
            />
          </MagneticButton>
        </motion.div>

        {/* Social links with stagger */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-10 flex items-center justify-center gap-6"
        >
          {SOCIAL_LINKS.map((link, i) => (
            <MagneticButton
              key={link.label}
              as="a"
              href={link.href}
              strength={0.3}
              className="group flex items-center gap-2 px-4 py-2.5 border border-border/30 text-muted-foreground/60
                         hover:border-primary/40 hover:text-primary transition-all duration-500"
            >
              <link.icon size={14} className="group-hover:text-primary transition-colors duration-500" />
              <span className="text-mono text-[10px] tracking-[0.12em]">{link.label.toUpperCase()}</span>
            </MagneticButton>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-24 text-mono text-muted-foreground/40"
        >
          <span>© 2026 ALOK SRIVASTAV</span>
          <br />
          <span className="text-[10px]">ALL SYSTEMS NOMINAL</span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FinalCTA;
