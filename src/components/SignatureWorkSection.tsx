import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import droneImg from "@/assets/drone-project.jpg";
import commandImg from "@/assets/command-center.jpg";
import neuralImg from "@/assets/neural-interface.jpg";
import suitImg from "@/assets/suit-helmet-cinematic.jpg";
import roverImg from "@/assets/lunar-rover-cinematic.jpg";

interface Project {
  id: string;
  label: string;
  title: string;
  titleAccent: string;
  problem: string;
  constraint: string;
  approach: string;
  outcome: string;
  image: string;
  classification: string;
  status: string;
  align: "left" | "right";
}

const PROJECTS: Project[] = [
  {
    id: "01",
    label: "AUTONOMOUS SYSTEMS",
    title: "Autonomous",
    titleAccent: "defense platforms.",
    problem: "Existing UAV systems rely on human operators for real-time decision-making — a bottleneck that doesn't scale.",
    constraint: "Sub-200ms latency requirement in GPS-denied environments with active electronic warfare.",
    approach: "Designed sensor-fusion architecture combining LiDAR, thermal, and inertial data with onboard ML inference for autonomous navigation.",
    outcome: "Operational UAV platform with fully autonomous waypoint navigation and threat avoidance in contested airspace.",
    image: droneImg,
    classification: "RESTRICTED",
    status: "OPERATIONAL",
    align: "left",
  },
  {
    id: "02",
    label: "COMMAND & CONTROL",
    title: "Systems that",
    titleAccent: "never sleep.",
    problem: "Multi-domain operations generate overwhelming data streams that exceed human cognitive bandwidth.",
    constraint: "Must maintain 99.99% uptime across distributed nodes with zero single points of failure.",
    approach: "Architected event-driven C2 system with real-time sensor aggregation, automated threat classification, and predictive situational awareness.",
    outcome: "24/7 autonomous monitoring across air, ground, and cyber domains with 40% faster threat response.",
    image: commandImg,
    classification: "TOP SECRET",
    status: "ACTIVE",
    align: "right",
  },
  {
    id: "03",
    label: "HUMAN-MACHINE INTERFACE",
    title: "Pressure-suit",
    titleAccent: "integration systems.",
    problem: "Astronaut pressure suits limit dexterity and situational awareness during EVA operations.",
    constraint: "Must function in extreme temperature ranges (-150°C to +120°C) with zero electromagnetic interference.",
    approach: "Developed haptic feedback integration and heads-up display overlay for enhanced spatial awareness inside pressure suits.",
    outcome: "Reduced EVA task completion time by 35% during analog mission testing at simulated lunar conditions.",
    image: suitImg,
    classification: "CONFIDENTIAL",
    status: "TESTING",
    align: "left",
  },
  {
    id: "04",
    label: "PLANETARY ROBOTICS",
    title: "Autonomous",
    titleAccent: "surface exploration.",
    problem: "Communication delays of up to 20 minutes make real-time rover teleoperation impossible on planetary surfaces.",
    constraint: "Rover must navigate unknown terrain, avoid hazards, and complete science objectives with zero human input for hours.",
    approach: "Built autonomous navigation stack with terrain classification, hazard avoidance, and science-target prioritization using onboard compute.",
    outcome: "Demonstrated fully autonomous rover operations during 14-day lunar analog mission with 98% objective completion.",
    image: roverImg,
    classification: "RESTRICTED",
    status: "MISSION COMPLETE",
    align: "right",
  },
  {
    id: "05",
    label: "NEURAL SYSTEMS",
    title: "Cognitive",
    titleAccent: "augmentation.",
    problem: "Operators in high-stakes environments suffer cognitive overload, leading to delayed decisions and errors.",
    constraint: "Non-invasive solution required. Must integrate with existing defense infrastructure without hardware modification.",
    approach: "Designed neural-feedback loop that monitors operator cognitive load and dynamically adjusts information density in real-time.",
    outcome: "Reduced operator error rate by 60% in simulated high-stress command scenarios.",
    image: neuralImg,
    classification: "TOP SECRET",
    status: "PROTOTYPE",
    align: "left",
  },
];

const HudCorners = ({ className = "" }: { className?: string }) => (
  <div className={`absolute inset-0 pointer-events-none ${className}`}>
    <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-primary/30" />
    <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-primary/30" />
    <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-primary/30" />
    <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-primary/30" />
  </div>
);

const DataField = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-1">
    <span className="text-mono text-primary/40 text-[10px] sm:text-xs block">{label}</span>
    <p className="text-muted-foreground font-light text-sm sm:text-base leading-relaxed">{value}</p>
  </div>
);

const ProjectSection = ({ project, index }: { project: Project; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const textY = useTransform(scrollYProgress, [0, 1], [40, -20]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1]);

  const isRight = project.align === "right";

  return (
    <div ref={ref} className="relative min-h-screen w-full overflow-hidden">
      {/* Full-bleed parallax image */}
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0 z-0">
        <img
          src={project.image}
          alt={project.label}
          loading="lazy"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/70" />
        <div className={`absolute inset-0 ${
          isRight
            ? "bg-gradient-to-l from-background via-background/50 to-transparent"
            : "bg-gradient-to-r from-background via-background/50 to-transparent"
        }`} />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/40" />
      </motion.div>

      {/* Noise */}
      <div className="noise-overlay absolute inset-0 pointer-events-none z-[5]" />

      {/* HUD overlay */}
      <div className="absolute inset-0 z-[6] pointer-events-none hidden md:block">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.15 }}
          viewport={{ once: true }}
          className={`absolute top-16 ${isRight ? "left-16" : "right-16"}`}
        >
          <div className="w-32 h-32 lg:w-48 lg:h-48 border border-primary/10 rounded-full" />
          <div className="absolute top-4 left-4 w-24 h-24 lg:w-40 lg:h-40 border border-primary/5 rounded-full" />
        </motion.div>

        {/* Scan line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.5 }}
          className={`absolute top-1/2 ${isRight ? "right-0 origin-right" : "left-0 origin-left"} w-1/3 h-px bg-gradient-to-r from-primary/20 to-transparent`}
        />
      </div>

      {/* Classification badge */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.3 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className={`absolute bottom-8 sm:bottom-16 ${isRight ? "left-6 sm:left-16 text-left" : "right-6 sm:right-16 text-right"} z-20 text-mono text-primary/40`}
      >
        <span>CLASSIFICATION: {project.classification}</span>
        <br />
        <span>STATUS: {project.status}</span>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: textY }}
        className={`relative z-20 flex items-center min-h-screen px-6 sm:px-8 md:px-16 lg:px-24 py-20 ${
          isRight ? "justify-end" : "justify-start"
        }`}
      >
        <div className={`max-w-xl lg:max-w-2xl ${isRight ? "text-right" : "text-left"}`}>
          {/* Project number & label */}
          <motion.div
            initial={{ opacity: 0, x: isRight ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6 sm:mb-8"
          >
            <span className="text-mono text-primary/40 text-[10px] sm:text-xs">
              PROJECT {project.id}
            </span>
            <span className="text-mono text-primary/60 ml-4 sm:ml-6 text-[10px] sm:text-xs">
              {project.label}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-display text-section text-foreground mb-8 sm:mb-12"
          >
            {project.title}
            <br />
            <span className="text-primary">{project.titleAccent}</span>
          </motion.h2>

          {/* Data fields with HUD frame */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative p-4 sm:p-6"
          >
            <HudCorners />
            <div className={`space-y-4 sm:space-y-6 ${isRight ? "text-right" : "text-left"}`}>
              <DataField label="PROBLEM" value={project.problem} />
              <DataField label="CONSTRAINT" value={project.constraint} />
              <DataField label="APPROACH" value={project.approach} />
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="space-y-1"
              >
                <span className="text-mono text-primary/60 text-[10px] sm:text-xs block">OUTCOME</span>
                <p className="text-foreground font-light text-sm sm:text-base leading-relaxed">{project.outcome}</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Divider line */}
      {index < PROJECTS.length - 1 && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-primary/20 to-transparent z-20" />
      )}
    </div>
  );
};

const SignatureWorkSection = () => {
  return (
    <section className="relative bg-background">
      {/* Section header */}
      <div className="relative z-10 flex items-center justify-center py-20 sm:py-32">
        <div className="text-center px-6">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-mono text-primary/60 mb-4 sm:mb-6 block"
          >
            SIGNATURE WORK
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-display text-section text-foreground"
          >
            Systems I've <span className="text-primary">built.</span>
          </motion.h2>
        </div>
      </div>

      {/* Projects */}
      {PROJECTS.map((project, index) => (
        <ProjectSection key={project.id} project={project} index={index} />
      ))}
    </section>
  );
};

export default SignatureWorkSection;
