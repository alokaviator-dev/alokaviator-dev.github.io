import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import droneImg from "@/assets/drone-project.jpg";
import commandImg from "@/assets/command-center.jpg";
import neuralImg from "@/assets/neural-interface.jpg";
import suitImg from "@/assets/suit-helmet-cinematic.jpg";
import roverImg from "@/assets/rover-workshop-cinematic.jpg";

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
  status: string;
  align: "left" | "right";
}

const PROJECTS: Project[] = [
  {
    id: "01",
    label: "AUTONOMOUS SYSTEMS",
    title: "Autonomous",
    titleAccent: "Fixed-Wing UAV.",
    problem: "UAV systems bottlenecked by human reaction time.",
    constraint: "Sub-200ms latency in GPS-denied, EW-active zones.",
    approach: "Sensor-fusion architecture with onboard ML inference for autonomous navigation.",
    outcome: "Fully autonomous threat avoidance in contested airspace.",
    image: droneImg,
    status: "OPERATIONAL",
    align: "left",
  },
  {
    id: "02",
    label: "COMMAND & CONTROL",
    title: "Web-based",
    titleAccent: "Ground Control Systems.",
    problem: "Multi-domain data exceeds human cognitive bandwidth.",
    constraint: "99.99% uptime, zero single points of failure.",
    approach: "Event-driven C2 with automated threat classification and predictive awareness.",
    outcome: "40% faster threat response across air, ground, and cyber.",
    image: commandImg,
    status: "ACTIVE",
    align: "right",
  },
  {
    id: "03",
    label: "HUMAN-MACHINE INTERFACE",
    title: "Pressure-suit",
    titleAccent: "integration.",
    problem: "Operating in isolation with high dependency on systems and crew coordination.",
    constraint: "Confined habitat. Limited resources. Simulated mission protocols under continuous pressure.",
    approach: "Structured execution, real-time problem solving, and maintaining system reliability under constrained conditions.",
    outcome: "Sustained operational continuity and improved decision-making under pressure.",
    image: suitImg,
    status: "TESTING",
    align: "left",
  },
  {
    id: "04",
    label: "PLANETARY ROBOTICS",
    title: "Autonomous",
    titleAccent: "Rover ops.",
    problem: "20-min comms delay makes teleoperation impossible.",
    constraint: "Hours of autonomous operation on unknown terrain.",
    approach: "Onboard nav stack with terrain classification and hazard avoidance.",
    outcome: "98% objective completion in 14-day lunar analog mission.",
    image: roverImg,
    status: "MISSION COMPLETE",
    align: "right",
  },
  {
    id: "05",
    label: "NEURAL SYSTEMS",
    title: "Cognitive",
    titleAccent: "augmentation.",
    problem: "Operator cognitive overload in high-stakes environments.",
    constraint: "Non-invasive, compatible with existing defense infrastructure.",
    approach: "Neural-feedback loop dynamically adjusting information density.",
    outcome: "60% reduction in operator error rate under stress.",
    image: neuralImg,
    status: "PROTOTYPE",
    align: "left",
  },
];

const ProjectSection = ({ project, index }: { project: Project; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const isRight = project.align === "right";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="relative w-full py-16 sm:py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        <div className={`flex flex-col ${isRight ? "lg:flex-row-reverse" : "lg:flex-row"} gap-8 lg:gap-16 items-center`}>
          
          {/* Image side */}
          <motion.div style={{ y: imgY }} className="w-full lg:w-1/2 relative group">
            <div className="relative overflow-hidden aspect-[16/10] rounded-sm">
              {/* HUD corners */}
              <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-primary/20" />
                <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-primary/20" />
                <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-primary/20" />
                <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-primary/20" />
              </div>

              <img
                src={project.image}
                alt={project.label}
                loading="lazy"
                width={1920}
                height={1080}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-background/30 group-hover:bg-background/10 transition-colors duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

              {/* Status pill */}
              <div className="absolute top-4 left-4 z-10">
                <span className="text-mono text-[9px] sm:text-[10px] text-primary/70 bg-background/40 backdrop-blur-sm px-2.5 py-1 border border-primary/10">
                  {project.status}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Text side */}
          <div className={`w-full lg:w-1/2 ${isRight ? "lg:text-right" : "lg:text-left"}`}>
            {/* Project number & label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-5"
              style={{ justifyContent: isRight ? "flex-end" : "flex-start" }}
            >
              <span className="text-mono text-primary/30 text-[10px]">{project.id}</span>
              <span className="w-8 h-px bg-primary/20" />
              <span className="text-mono text-primary/50 text-[10px]">{project.label}</span>
            </motion.div>

            {/* Title */}
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display font-light tracking-tight text-foreground text-3xl sm:text-4xl lg:text-5xl leading-[1.1] mb-6"
            >
              {project.title}{" "}
              <span className="text-primary">{project.titleAccent}</span>
            </motion.h3>

            {/* Data rows — sleek inline layout */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-3"
            >
              {[
                { label: "PROBLEM", value: project.problem },
                { label: "CONSTRAINT", value: project.constraint },
                { label: "APPROACH", value: project.approach },
              ].map((field) => (
                <div key={field.label} className={`flex ${isRight ? "flex-row-reverse" : "flex-row"} gap-3 items-baseline`}>
                  <span className="text-mono text-primary/30 text-[9px] shrink-0 w-16 sm:w-20"
                    style={{ textAlign: isRight ? "left" : "right" }}
                  >
                    {field.label}
                  </span>
                  <p className="text-muted-foreground font-light text-sm leading-relaxed">{field.value}</p>
                </div>
              ))}

              {/* Outcome — highlighted */}
              <div className={`flex ${isRight ? "flex-row-reverse" : "flex-row"} gap-3 items-baseline pt-2 border-t border-primary/10`}>
                <span className="text-mono text-primary/50 text-[9px] shrink-0 w-16 sm:w-20"
                  style={{ textAlign: isRight ? "left" : "right" }}
                >
                  OUTCOME
                </span>
                <p className="text-foreground/90 font-light text-sm leading-relaxed">{project.outcome}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Separator */}
      {index < PROJECTS.length - 1 && (
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 mt-16 sm:mt-24 lg:mt-32">
          <div className="h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
        </div>
      )}
    </motion.div>
  );
};

const SignatureWorkSection = () => {
  return (
    <section className="relative bg-background overflow-hidden">
      <div className="noise-overlay absolute inset-0 pointer-events-none z-0" />

      {/* Section header */}
      <div className="relative z-10 pt-20 sm:pt-32 pb-8 sm:pb-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="w-12 h-px bg-primary/30" />
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-mono text-primary/50"
            >
              SIGNATURE WORK
            </motion.span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-display font-light tracking-tight text-foreground text-4xl sm:text-5xl lg:text-6xl"
          >
            Systems I've <span className="text-primary">built.</span>
          </motion.h2>
        </div>
      </div>

      {/* Projects */}
      <div className="relative z-10">
        {PROJECTS.map((project, index) => (
          <ProjectSection key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default SignatureWorkSection;
