import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";

const NODES = [
  { x: 15, y: 25, label: "PERCEPTION", size: 6 },
  { x: 50, y: 10, label: "DECISION", size: 7 },
  { x: 85, y: 25, label: "ACTION", size: 6 },
  { x: 30, y: 55, label: "FEEDBACK", size: 5 },
  { x: 70, y: 55, label: "ADAPTATION", size: 5 },
  { x: 50, y: 35, label: "CORE", size: 10 },
  { x: 20, y: 75, label: "SIGNAL", size: 4 },
  { x: 80, y: 75, label: "OUTPUT", size: 4 },
  { x: 50, y: 80, label: "LOOP", size: 5 },
  { x: 10, y: 50, label: "INPUT", size: 4 },
  { x: 90, y: 50, label: "RESULT", size: 4 },
];

const CONNECTIONS: [number, number][] = [
  [0, 5], [1, 5], [2, 5], [3, 5], [4, 5],
  [0, 1], [1, 2], [2, 4], [4, 3], [3, 0],
  [6, 3], [7, 4], [8, 6], [8, 7],
  [9, 0], [9, 3], [10, 2], [10, 4],
  [6, 9], [7, 10], [8, 5],
];

const HowIThinkSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [visibleNodes, setVisibleNodes] = useState<Set<number>>(new Set());

  const buildProgress = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  useEffect(() => {
    const unsub = buildProgress.on("change", (v) => {
      const count = Math.floor(v * NODES.length);
      const newSet = new Set<number>();
      for (let i = 0; i < count; i++) newSet.add(i);
      setVisibleNodes(newSet);
    });
    return unsub;
  }, [buildProgress]);

  const handleNodeHover = useCallback((i: number | null) => setHoveredNode(i), []);

  return (
    <section
      ref={ref}
      className="relative min-h-[120vh] w-full overflow-hidden flex items-center"
      style={{ background: "linear-gradient(180deg, hsl(160,100%,5%) 0%, hsl(0,0%,0%) 40%, hsl(160,100%,5%) 100%)" }}
    >
      {/* Removed: noise-overlay, ParticleLayer canvas, GridBackground SVG */}

      {/* Radial glow behind core */}
      <div
        className="absolute z-0 pointer-events-none"
        style={{
          left: "50%",
          top: "45%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, hsl(166 44% 36% / 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-6 md:px-16 relative z-20 py-20">
        {/* Header */}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-mono text-primary/60 mb-6 block"
        >
          SYSTEMS THINKING
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-display text-section text-foreground mb-6"
        >
          How I <span className="text-primary">think.</span>
        </motion.h2>

        {/* System Visualization — removed FlowingParticle, removed SVG filter */}
        <motion.div style={{ opacity }} className="relative w-full max-w-5xl mx-auto aspect-[16/9] my-8">
          <svg viewBox="0 0 100 90" className="w-full h-full">
            {/* Connection lines — static, no flowing particles */}
            {CONNECTIONS.map(([a, b], i) => {
              const na = NODES[a];
              const nb = NODES[b];
              const isVisible = visibleNodes.has(a) && visibleNodes.has(b);
              const isHighlighted = hoveredNode === a || hoveredNode === b;
              return (
                <motion.line
                  key={`conn-${i}`}
                  x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                  stroke="hsl(166,44%,36%)"
                  strokeWidth={isHighlighted ? "0.3" : "0.15"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isVisible ? (isHighlighted ? 0.7 : 0.25) : 0 }}
                  transition={{ duration: 0.8, delay: i * 0.05 }}
                />
              );
            })}

            {/* Nodes — removed glow filter, removed pulse ring */}
            {NODES.map((node, i) => {
              const isVisible = visibleNodes.has(i);
              const isHovered = hoveredNode === i;
              const isCore = node.label === "CORE";
              const r = isCore ? 3 : node.size * 0.25;
              return (
                <motion.g
                  key={`node-${i}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: isVisible ? 1 : 0,
                    scale: isVisible ? 1 : 0,
                  }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  onMouseEnter={() => handleNodeHover(i)}
                  onMouseLeave={() => handleNodeHover(null)}
                  style={{ cursor: "pointer" }}
                >
                  {/* Main circle */}
                  <motion.circle
                    cx={node.x} cy={node.y}
                    r={r}
                    fill={isCore ? "hsl(166,44%,36%)" : "hsl(160,100%,10%)"}
                    stroke="hsl(166,44%,36%)"
                    strokeWidth={isHovered ? "0.4" : "0.2"}
                    animate={{ r: isHovered ? r * 1.3 : r }}
                    transition={{ duration: 0.3 }}
                  />
                  {/* Inner dot */}
                  {!isCore && (
                    <circle cx={node.x} cy={node.y} r={r * 0.4} fill="hsl(166,44%,36%)" opacity="0.8" />
                  )}
                  {/* Label */}
                  <motion.text
                    x={node.x}
                    y={node.y + (isCore ? 6 : 4.5)}
                    textAnchor="middle"
                    fill="hsl(166,44%,36%)"
                    fontSize={isCore ? "2" : "1.5"}
                    fontFamily="'JetBrains Mono', monospace"
                    animate={{ opacity: isHovered ? 1 : 0.5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {node.label}
                  </motion.text>
                </motion.g>
              );
            })}
          </svg>
        </motion.div>

        {/* Scroll-revealed text */}
        <motion.div style={{ y: textY }} className="max-w-2xl mx-auto text-center mt-8 space-y-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-foreground/90 font-light text-lg md:text-xl leading-relaxed"
          >
            Most optimize <span className="text-primary font-normal">components.</span>
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-foreground font-light text-lg md:text-xl leading-relaxed"
          >
            I optimize <span className="text-primary font-normal">systems under constraint.</span>
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="text-muted-foreground text-sm font-mono tracking-wider pt-4"
          >
            CLOSED-LOOP · MEASURED · ACCOUNTABLE
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowIThinkSection;
