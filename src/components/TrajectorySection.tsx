import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import foundationImg from "@/assets/trajectory-foundation.jpg";
import systemsImg from "@/assets/trajectory-systems.jpg";
import uavImg from "@/assets/trajectory-uav.jpg";
import researchImg from "@/assets/trajectory-research.jpg";
import roverImg from "@/assets/lunar-rover-cinematic.jpg";

interface Award {
  title: string;
  context?: string;
}

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
  awards?: Award[];
}

const STAGES: Stage[] = [
  {
    id: "01",
    label: "FOUNDATION",
    title: "Learning to",
    titleAccent: "see systems.",
    org: "CATIA · Early Engineering",
    period: "2019–2020",
    description:
      "Started with parametric design and mechanical systems. Learned that every constraint is a design opportunity—and that precision thinking scales to any domain.",
    skills: ["CATIA V5", "Parametric Modeling", "GD&T", "Systems Thinking"],
    insight: "Engineering isn't about parts. It's about relationships between parts.",
    image: foundationImg,
    awards: [
      { title: "Design Innovation Award", context: "Parametric systems" },
    ],
  },
  {
    id: "02",
    label: "SYSTEMS EXPOSURE",
    title: "From components to",
    titleAccent: "connected systems.",
    org: "ArthX · Embedded Systems · GCS",
    period: "2020–2021",
    description:
      "Transitioned from mechanical to embedded systems and ground control stations. First exposure to real-time telemetry, sensor fusion, and the pressure of systems that can't fail.",
    skills: ["Embedded C/C++", "Ground Control", "Telemetry", "Sensor Fusion"],
    insight: "The best system is the one the operator never has to think about.",
    image: systemsImg,
    awards: [
      { title: "Best GCS Architecture", context: "ArthX review board" },
    ],
  },
  {
    id: "03",
    label: "UAV DESIGN",
    title: "Building what",
    titleAccent: "flies autonomous.",
    org: "Feynman Aerospace",
    period: "2021–2022",
    description:
      "Designed and built UAV platforms from airframe to avionics. Learned that autonomy isn't a feature—it's an architecture decision that changes everything downstream.",
    skills: ["UAV Architecture", "Flight Control", "Autonomous Nav", "CFD"],
    insight: "Autonomy is earned through reliability, not complexity.",
    image: uavImg,
    awards: [
      { title: "National UAV Competition — Top 5", context: "Autonomous flight" },
    ],
  },
  {
    id: "04",
    label: "ADVANCED RESEARCH",
    title: "Pushing into",
    titleAccent: "defense-grade.",
    org: "Dautya Aerospace",
    period: "2022–2023",
    description:
      "Advanced into defense-grade research—systems that operate where failure isn't an option. Designed for EW-contested environments, GPS-denied navigation, and autonomous threat response.",
    skills: ["Defense Systems", "EW Countermeasures", "ML Inference", "HITL"],
    insight: "Defense engineering is civilian engineering minus the margin for error.",
    image: researchImg,
    awards: [
      { title: "Defense Research Recognition", context: "EW systems contribution" },
    ],
  },
  {
    id: "05",
    label: "EXTREME ENVIRONMENT",
    title: "Tested at the",
    titleAccent: "edge of Earth.",
    org: "Lunar Analog Mission",
    period: "2023–2024",
    description:
      "Deployed to extreme analog environments. Every system was tested under isolation, comms delay, thermal extremes, and cognitive pressure. This is where theory becomes proof.",
    skills: ["EVA Systems", "Isolation Ops", "Comms-Denied", "Crew Systems"],
    insight: "Pressure doesn't build character. It reveals architecture.",
    image: roverImg,
  },
];

/* ─── Single Stage ─── */
const TrajectoryStage = ({
  stage,
  index,
  isActive,
}: {
  stage: Stage;
  index: number;
  isActive: boolean;
}) => {
  const isEven = index % 2 === 0;
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className="relative h-screen w-full flex items-center justify-center snap-center"
    >
      {/* Background image with parallax feel */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: isActive ? 1 : 1.1, opacity: isActive ? 0.15 : 0.05 }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <img
          src={stage.image}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-background/70" />
      </motion.div>

      {/* Content grid — alternating left/right */}
      <div className="relative z-10 container mx-auto px-6 md:px-16">
        <div
          className={`flex flex-col items-center gap-8 lg:gap-0 lg:grid lg:grid-cols-[1fr_80px_1fr] ${
            isEven ? "" : ""
          }`}
        >
          {/* Content side */}
          <motion.div
            className={`${isEven ? "lg:col-start-1" : "lg:col-start-3"} max-w-lg ${
              isEven ? "lg:text-right lg:ml-auto" : "lg:text-left lg:mr-auto"
            }`}
            initial={{ opacity: 0, y: 40 }}
            animate={{
              opacity: isActive ? 1 : 0,
              y: isActive ? 0 : 40,
            }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
          >
            {/* Org & period */}
            <motion.span
              className="text-mono text-primary/50 text-[10px] block mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {stage.org} — {stage.period}
            </motion.span>

            {/* Title */}
            <motion.h3
              className="font-display font-light tracking-tight text-foreground text-3xl sm:text-4xl lg:text-5xl leading-[1.1] mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              {stage.title}{" "}
              <span className="text-primary">{stage.titleAccent}</span>
            </motion.h3>

            {/* Description */}
            <motion.p
              className="text-muted-foreground font-light leading-relaxed text-sm sm:text-base mb-5"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 15 }}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              {stage.description}
            </motion.p>

            {/* Skills */}
            <motion.div
              className={`flex flex-wrap gap-2 mb-5 ${isEven ? "lg:justify-end" : ""}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              {stage.skills.map((skill, si) => (
                <motion.span
                  key={skill}
                  className="text-mono text-[9px] text-primary/70 border border-primary/15 px-2.5 py-1 bg-primary/5 backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    scale: isActive ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.4, delay: 0.35 + si * 0.05 }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>

            {/* Insight */}
            <motion.div
              className={`border-l-2 border-primary/30 pl-4 ${
                isEven ? "lg:border-l-0 lg:border-r-2 lg:pl-0 lg:pr-4 lg:text-right" : ""
              }`}
              initial={{ opacity: 0, x: isEven ? 20 : -20 }}
              animate={{
                opacity: isActive ? 1 : 0,
                x: isActive ? 0 : isEven ? 20 : -20,
              }}
              transition={{ duration: 0.7, delay: 0.45 }}
            >
              <p className="text-foreground/70 font-light italic text-sm leading-relaxed">
                "{stage.insight}"
              </p>
            </motion.div>
          </motion.div>

          {/* Center timeline node */}
          <div
            className={`${
              isEven ? "lg:col-start-2" : "lg:col-start-2 lg:row-start-1"
            } flex items-center justify-center relative order-first lg:order-none`}
          >
            {/* Node */}
            <motion.div
              className="relative z-10"
              animate={{
                scale: isActive ? 1 : 0.6,
              }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.div
                className="w-5 h-5 rounded-full border-2"
                animate={{
                  borderColor: isActive
                    ? "hsl(166, 44%, 36%)"
                    : "hsl(0, 0%, 20%)",
                  backgroundColor: isActive
                    ? "hsl(166, 44%, 36%)"
                    : "transparent",
                  boxShadow: isActive
                    ? "0 0 30px hsl(166 44% 36% / 0.5), 0 0 60px hsl(166 44% 36% / 0.2)"
                    : "none",
                }}
                transition={{ duration: 0.6 }}
              />
              {/* Pulse rings */}
              {isActive && (
                <>
                  <motion.div
                    className="absolute inset-0 rounded-full border border-primary/30"
                    animate={{ scale: [1, 3], opacity: [0.6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full border border-primary/20"
                    animate={{ scale: [1, 4], opacity: [0.4, 0] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: 0.5,
                    }}
                  />
                </>
              )}
            </motion.div>

            {/* Stage number label */}
            <motion.span
              className="absolute -bottom-8 text-mono text-[9px] text-primary/40"
              animate={{ opacity: isActive ? 1 : 0.3 }}
              transition={{ duration: 0.5 }}
            >
              {stage.id}
            </motion.span>
          </div>

          {/* Image side */}
          <motion.div
            className={`${
              isEven ? "lg:col-start-3" : "lg:col-start-1 lg:row-start-1"
            } max-w-md w-full`}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{
              opacity: isActive ? 1 : 0,
              scale: isActive ? 1 : 0.92,
            }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
          >
            <div className="relative overflow-hidden rounded-sm aspect-[4/3]">
              {/* Corner brackets */}
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
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-background/20 backdrop-blur-[1px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

              {/* Stage tag */}
              <div className="absolute top-4 left-4 z-10">
                <span className="text-mono text-[9px] text-primary/70 bg-background/50 backdrop-blur-md px-2.5 py-1 border border-primary/10">
                  STAGE {stage.id} — {stage.label}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

/* ─── Main Section ─── */
const TrajectorySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress to active stage — center-based activation
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // Each stage occupies 1/5 of the scroll. Activate when centered.
    const stageProgress = v * STAGES.length;
    const idx = Math.min(
      Math.max(Math.round(stageProgress - 0.5), 0),
      STAGES.length - 1
    );
    setActiveIndex(idx);
  });

  // Timeline fill progress
  const timelineFill = useTransform(scrollYProgress, [0, 0.95], ["0%", "100%"]);

  return (
    <section ref={sectionRef} className="relative w-full">
      {/* Background base */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(180deg, hsl(0 0% 0%) 0%, hsl(160 100% 2%) 30%, hsl(160 100% 3%) 50%, hsl(160 100% 2%) 70%, hsl(0 0% 0%) 100%)",
        }}
      />
      <div className="noise-overlay absolute inset-0 pointer-events-none z-[1]" />

      {/* Section header — sticky briefly */}
      <div className="sticky top-0 z-30 pointer-events-none">
        <div className="container mx-auto px-6 md:px-16 pt-20 pb-10">
          <div className="flex items-center gap-4 mb-4">
            <span className="w-12 h-px bg-primary/30" />
            <span className="text-mono text-primary/50">TRAJECTORY</span>
          </div>
          <h2 className="text-display text-section text-foreground">
            The path of <span className="text-primary">becoming.</span>
          </h2>
        </div>
      </div>

      {/* Center timeline line — fixed while scrolling through section */}
      <div className="hidden lg:block sticky top-0 h-screen pointer-events-none z-20">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px">
          {/* Base line */}
          <div className="absolute inset-0 bg-border/10" />
          {/* Filled progress */}
          <motion.div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary/60 via-primary/40 to-primary/20"
            style={{ height: timelineFill }}
          />
          {/* Glow at tip */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-[3px] h-16 rounded-full"
            style={{
              top: timelineFill,
              background:
                "linear-gradient(to bottom, hsl(166 44% 36% / 0.6), transparent)",
              filter: "blur(2px)",
            }}
          />
        </div>
      </div>

      {/* Stages */}
      <div className="relative z-10">
        {STAGES.map((stage, i) => (
          <TrajectoryStage
            key={stage.id}
            stage={stage}
            index={i}
            isActive={i === activeIndex}
          />
        ))}
      </div>

      {/* Stage indicators — fixed dots on right */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
        {STAGES.map((stage, i) => (
          <motion.div
            key={stage.id}
            className="group relative flex items-center justify-end"
          >
            {/* Tooltip on hover */}
            <motion.span
              className="absolute right-6 text-mono text-[9px] text-primary/60 whitespace-nowrap bg-background/80 backdrop-blur-sm px-2 py-1 border border-primary/10 pointer-events-none"
              initial={{ opacity: 0, x: 10 }}
              whileHover={{ opacity: 1, x: 0 }}
              animate={{ opacity: 0 }}
            >
              {stage.label}
            </motion.span>
            <motion.div
              className="w-2 h-2 rounded-full cursor-pointer transition-colors duration-500"
              animate={{
                backgroundColor:
                  i === activeIndex
                    ? "hsl(166, 44%, 36%)"
                    : "hsl(0, 0%, 20%)",
                scale: i === activeIndex ? 1.5 : 1,
                boxShadow:
                  i === activeIndex
                    ? "0 0 12px hsl(166 44% 36% / 0.5)"
                    : "none",
              }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.8 }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TrajectorySection;
