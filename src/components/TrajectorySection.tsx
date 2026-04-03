import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import foundationImg from "@/assets/trajectory-foundation.jpg";
import systemsImg from "@/assets/trajectory-systems.jpg";
import uavImg from "@/assets/trajectory-uav.jpg";
import researchImg from "@/assets/trajectory-research.jpg";
import roverImg from "@/assets/lunar-rover-cinematic.jpg";

interface Stage {
  id: string;
  label: string;
  title: string;
  titleAccent: string;
  org: string;
  period: string;
  description: string;
  skills: string[];
  insight: string;
  image: string;
  linkedProject?: string;
}

const STAGES: Stage[] = [
  {
    id: "01",
    label: "FOUNDATION",
    title: "Learning to",
    titleAccent: "see systems.",
    org: "CATIA · Early Engineering",
    period: "2019–2020",
    description: "Started with parametric design and mechanical systems. Learned that every constraint is a design opportunity—and that precision thinking scales to any domain.",
    skills: ["CATIA V5", "Parametric Modeling", "GD&T", "Systems Thinking"],
    insight: "Engineering isn't about parts. It's about relationships between parts.",
    image: foundationImg,
  },
  {
    id: "02",
    label: "SYSTEMS EXPOSURE",
    title: "From components to",
    titleAccent: "connected systems.",
    org: "ArthX · Embedded Systems · GCS",
    period: "2020–2021",
    description: "Transitioned from mechanical to embedded systems and ground control stations. First exposure to real-time telemetry, sensor fusion, and the pressure of systems that can't fail.",
    skills: ["Embedded C/C++", "Ground Control", "Telemetry", "Sensor Fusion"],
    insight: "The best system is the one the operator never has to think about.",
    image: systemsImg,
  },
  {
    id: "03",
    label: "UAV DESIGN",
    title: "Building what",
    titleAccent: "flies autonomous.",
    org: "Feynman Aerospace",
    period: "2021–2022",
    description: "Designed and built UAV platforms from airframe to avionics. Learned that autonomy isn't a feature—it's an architecture decision that changes everything downstream.",
    skills: ["UAV Architecture", "Flight Control", "Autonomous Nav", "CFD"],
    insight: "Autonomy is earned through reliability, not complexity.",
    image: uavImg,
  },
  {
    id: "04",
    label: "ADVANCED RESEARCH",
    title: "Pushing into",
    titleAccent: "defense-grade.",
    org: "Dautya Aerospace",
    period: "2022–2023",
    description: "Advanced into defense-grade research—systems that operate where failure isn't an option. Designed for EW-contested environments, GPS-denied navigation, and autonomous threat response.",
    skills: ["Defense Systems", "EW Countermeasures", "ML Inference", "HITL"],
    insight: "Defense engineering is civilian engineering minus the margin for error.",
    image: researchImg,
  },
  {
    id: "05",
    label: "EXTREME ENVIRONMENT",
    title: "Tested at the",
    titleAccent: "edge of Earth.",
    org: "Lunar Analog Mission",
    period: "2023–2024",
    description: "Deployed to extreme analog environments. Every system was tested under isolation, comms delay, thermal extremes, and cognitive pressure. This is where theory becomes proof.",
    skills: ["EVA Systems", "Isolation Ops", "Comms-Denied", "Crew Systems"],
    insight: "Pressure doesn't build character. It reveals architecture.",
    image: roverImg,
    linkedProject: "Pressure-suit integration",
  },
];

const TimelineNode = ({
  stage,
  index,
  isActive,
  isHovered,
  onHover,
}: {
  stage: Stage;
  index: number;
  isActive: boolean;
  isHovered: boolean;
  onHover: (i: number | null) => void;
}) => (
  <motion.div
    className="relative flex items-center gap-4 cursor-pointer group"
    onMouseEnter={() => onHover(index)}
    onMouseLeave={() => onHover(-1)}
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
  >
    {/* Node */}
    <div className="relative z-10 shrink-0">
      <motion.div
        className="w-4 h-4 rounded-full border-2 transition-colors duration-500"
        style={{
          borderColor: isActive ? "hsl(166 44% 36%)" : "hsl(0 0% 20%)",
          backgroundColor: isActive ? "hsl(166 44% 36%)" : "transparent",
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
          boxShadow: isActive
            ? "0 0 20px hsl(166 44% 36% / 0.4)"
            : "none",
        }}
        transition={{ duration: 0.3 }}
      />
      {/* Pulse ring for active */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-full border border-primary/30"
          animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </div>

    {/* Label */}
    <div className="flex flex-col">
      <span className="text-mono text-[9px] text-primary/40">{stage.id}</span>
      <span
        className={`text-mono text-[11px] transition-colors duration-300 ${
          isActive ? "text-primary" : "text-muted-foreground/50"
        } ${isHovered ? "text-primary" : ""}`}
      >
        {stage.label}
      </span>
    </div>
  </motion.div>
);

const StageDetail = ({ stage }: { stage: Stage }) => (
  <motion.div
    key={stage.id}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.6 }}
    className="space-y-6"
  >
    {/* Image */}
    <div className="relative overflow-hidden aspect-[16/9] rounded-sm">
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-primary/20" />
        <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-primary/20" />
        <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-primary/20" />
        <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-primary/20" />
      </div>
      <img
        src={stage.image}
        alt={stage.label}
        loading="lazy"
        width={1920}
        height={1080}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-background/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
      <div className="absolute top-4 left-4 z-10">
        <span className="text-mono text-[9px] text-primary/70 bg-background/40 backdrop-blur-sm px-2.5 py-1 border border-primary/10">
          STAGE {stage.id}
        </span>
      </div>
    </div>

    {/* Title */}
    <div>
      <span className="text-mono text-primary/50 text-[10px] block mb-2">{stage.org}</span>
      <h3 className="font-display font-light tracking-tight text-foreground text-2xl sm:text-3xl lg:text-4xl leading-[1.1]">
        {stage.title}{" "}
        <span className="text-primary">{stage.titleAccent}</span>
      </h3>
      <span className="text-mono text-muted-foreground/40 text-[10px] mt-2 block">{stage.period}</span>
    </div>

    {/* Description */}
    <p className="text-muted-foreground font-light leading-relaxed text-sm sm:text-base">
      {stage.description}
    </p>

    {/* Skills */}
    <div className="flex flex-wrap gap-2">
      {stage.skills.map((skill) => (
        <span
          key={skill}
          className="text-mono text-[9px] text-primary/60 border border-primary/15 px-2.5 py-1 bg-primary/5"
        >
          {skill}
        </span>
      ))}
    </div>

    {/* Insight */}
    <div className="border-l-2 border-primary/30 pl-4">
      <p className="text-foreground/80 font-light italic text-sm leading-relaxed">
        "{stage.insight}"
      </p>
    </div>
  </motion.div>
);

const TrajectorySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const buildProgress = useTransform(scrollYProgress, [0.1, 0.8], [0, 1]);

  useEffect(() => {
    const unsub = buildProgress.on("change", (v) => {
      const idx = Math.min(Math.floor(v * STAGES.length), STAGES.length - 1);
      if (idx >= 0) setActiveIndex(idx);
    });
    return unsub;
  }, [buildProgress]);

  const displayIndex = hoveredIndex >= 0 ? hoveredIndex : activeIndex;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[200vh] w-full overflow-hidden"
      style={{
        background: "linear-gradient(180deg, hsl(0 0% 0%) 0%, hsl(160 100% 3%) 50%, hsl(0 0% 0%) 100%)",
      }}
    >
      <div className="noise-overlay absolute inset-0 pointer-events-none z-10" />

      {/* Vertical glowing line — background element */}
      <div className="absolute left-[42px] sm:left-[60px] top-0 bottom-0 w-px z-0">
        <div className="absolute inset-0 bg-border/20" />
        <motion.div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary/60 via-primary/30 to-transparent"
          style={{ height: useTransform(scrollYProgress, [0.05, 0.85], ["0%", "100%"]) }}
        />
      </div>

      <div className="sticky top-0 min-h-screen flex items-center">
        <div className="container mx-auto px-6 md:px-16 relative z-20 py-20">
          {/* Section header */}
          <div className="mb-12 sm:mb-16 pl-10 sm:pl-14">
            <div className="flex items-center gap-4 mb-4">
              <span className="w-12 h-px bg-primary/30" />
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-mono text-primary/50"
              >
                TRAJECTORY
              </motion.span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="text-display text-section text-foreground"
            >
              The path of <span className="text-primary">becoming.</span>
            </motion.h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            {/* Timeline — left column */}
            <div className="lg:w-1/3 space-y-6 sm:space-y-8">
              {/* Vertical line connector */}
              {STAGES.map((stage, i) => (
                <TimelineNode
                  key={stage.id}
                  stage={stage}
                  index={i}
                  isActive={i <= activeIndex}
                  isHovered={i === hoveredIndex}
                  onHover={setHoveredIndex}
                />
              ))}
            </div>

            {/* Detail panel — right column */}
            <div className="lg:w-2/3">
              <AnimatePresence mode="wait">
                <StageDetail stage={STAGES[displayIndex]} />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrajectorySection;
