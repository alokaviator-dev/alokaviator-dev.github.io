import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const nodes = [
  { x: 20, y: 30, label: "PERCEPTION" },
  { x: 50, y: 15, label: "DECISION" },
  { x: 80, y: 35, label: "ACTION" },
  { x: 35, y: 60, label: "FEEDBACK" },
  { x: 65, y: 65, label: "ADAPTATION" },
  { x: 50, y: 45, label: "CORE" },
];

const connections = [
  [0, 5], [1, 5], [2, 5], [3, 5], [4, 5],
  [0, 1], [1, 2], [2, 4], [4, 3], [3, 0],
];

const HowIThinkSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen w-full bg-background overflow-hidden flex items-center">
      <div className="noise-overlay absolute inset-0 pointer-events-none z-10" />

      <div className="container mx-auto px-8 md:px-16 relative z-20">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-mono text-primary/60 mb-8 block"
        >
          SYSTEMS THINKING
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-display text-section text-foreground mb-16"
        >
          How I <span className="text-primary">think.</span>
        </motion.h2>

        {/* Animated system diagram */}
        <motion.div style={{ opacity }} className="relative w-full max-w-4xl mx-auto aspect-[16/9]">
          <svg viewBox="0 0 100 80" className="w-full h-full">
            {/* Connection lines */}
            {connections.map(([a, b], i) => (
              <motion.line
                key={i}
                x1={nodes[a].x}
                y1={nodes[a].y}
                x2={nodes[b].x}
                y2={nodes[b].y}
                stroke="hsl(166, 44%, 36%)"
                strokeWidth="0.15"
                strokeOpacity="0.3"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.3 + i * 0.1 }}
              />
            ))}

            {/* Nodes */}
            {nodes.map((node, i) => (
              <motion.g
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
              >
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.label === "CORE" ? 2.5 : 1.5}
                  fill={node.label === "CORE" ? "hsl(166, 44%, 36%)" : "none"}
                  stroke="hsl(166, 44%, 36%)"
                  strokeWidth="0.3"
                  opacity={0.8}
                />
                {node.label === "CORE" && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="4"
                    fill="none"
                    stroke="hsl(166, 44%, 36%)"
                    strokeWidth="0.1"
                    opacity="0.3"
                    className="animate-pulse-glow"
                  />
                )}
                <text
                  x={node.x}
                  y={node.y + (node.label === "CORE" ? 5.5 : 4)}
                  textAnchor="middle"
                  fill="hsl(166, 44%, 36%)"
                  fontSize="1.8"
                  fontFamily="JetBrains Mono, monospace"
                  opacity="0.6"
                >
                  {node.label}
                </text>
              </motion.g>
            ))}
          </svg>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center text-muted-foreground font-light max-w-xl mx-auto mt-12 text-lg"
        >
          Closed-loop systems. Every input measured. Every output accountable.
          I architect systems that think before they act.
        </motion.p>
      </div>
    </section>
  );
};

export default HowIThinkSection;
