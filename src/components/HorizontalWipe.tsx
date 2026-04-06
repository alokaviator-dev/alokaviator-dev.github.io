import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface HorizontalWipeProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "left" | "right";
}

const HorizontalWipe = ({ children, className = "", delay = 0, direction = "left" }: HorizontalWipeProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Reveal wipe */}
      <motion.div
        className="absolute inset-0 z-10 bg-primary"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: [0, 1, 1, 0] } : {}}
        transition={{
          duration: 1.2,
          delay,
          times: [0, 0.4, 0.6, 1],
          ease: [0.77, 0, 0.175, 1],
        }}
        style={{ transformOrigin: direction === "left" ? "left" : "right" }}
      />
      {/* Content reveals after wipe passes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.01, delay: delay + 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default HorizontalWipe;
