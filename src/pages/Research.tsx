import { motion } from "framer-motion";
import CursorGlow from "@/components/CursorGlow";
import TopNav from "@/components/TopNav";

const RESEARCH_NOTES = [
  {
    id: "RN-001",
    title: "Failure Propagation in Autonomous Chains",
    body: "When a single subsystem fails in a tightly coupled autonomy stack, the cascade isn't linear, it's exponential. Designing for graceful degradation means building decision boundaries that isolate failure domains before they compound.",
    tags: ["AUTONOMY", "FAULT TOLERANCE"],
  },
  {
    id: "RN-002",
    title: "Constraint as Architecture",
    body: "Resource-constrained environments force architectural clarity. When compute, power, and bandwidth are scarce, every abstraction layer must justify its existence. The best systems emerge from the tightest constraints.",
    tags: ["SYSTEMS", "DESIGN"],
  },
  {
    id: "RN-003",
    title: "Closed-Loop Decision Latency",
    body: "The gap between sensing and acting defines system competence. Reducing decision latency isn't about faster processors,  it's about eliminating unnecessary deliberation in the control loop.",
    tags: ["CONTROL", "REAL-TIME"],
  },
  {
    id: "RN-004",
    title: "Operator Trust Calibration",
    body: "Autonomous systems fail when operators either over-trust or under-trust them. The interface between human judgment and machine execution requires explicit trust boundaries, not implicit assumptions.",
    tags: ["HUMAN-MACHINE", "OPERATIONS"],
  },
  {
    id: "RN-005",
    title: "Signal Integrity Under Noise",
    body: "In degraded communication environments, the system that survives isn't the one with the strongest signal, it's the one that knows how to act on incomplete information without catastrophic misinterpretation.",
    tags: ["COMMS", "RESILIENCE"],
  },
  {
    id: "RN-006",
    title: "Mission-Critical State Management",
    body: "State is the enemy of reliability in long-duration missions. Every piece of mutable state is a potential failure vector. Stateless where possible, deterministic where not.",
    tags: ["RELIABILITY", "STATE"],
  },
  {
    id: "RN-007",
    title: "The Cost of Abstraction in Embedded Systems",
    body: "Abstraction trades runtime cost for developer velocity. In embedded contexts, that trade-off has hard physical limits — thermal, power, timing. Know where your abstractions break.",
    tags: ["EMBEDDED", "TRADE-OFFS"],
  },
  {
    id: "RN-008",
    title: "Testing in Non-Reproducible Environments",
    body: "Field conditions don't repeat. Simulation covers the expected; structured chaos testing covers the rest. A system untested under adversarial conditions is an untested system.",
    tags: ["TESTING", "VALIDATION"],
  },
];

const ResearchEntry = ({
  note,
  index,
}: {
  note: (typeof RESEARCH_NOTES)[0];
  index: number;
}) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.7, delay: index * 0.08 }}
    className="group relative border-b border-border/40 last:border-b-0"
  >
    <div className="py-10 md:py-14 px-2 md:px-0 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4 md:gap-10 items-start">
      {/* ID marker */}
      <span className="text-mono text-primary/40 group-hover:text-primary/70 transition-colors duration-500 pt-1">
        {note.id}
      </span>

      <div className="space-y-4">
        {/* Title */}
        <h3 className="text-display text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors duration-500 leading-tight">
          {note.title}
        </h3>

        {/* Body */}
        <p className="text-muted-foreground font-light text-sm md:text-base leading-relaxed max-w-2xl">
          {note.body}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-1">
          {note.tags.map((tag) => (
            <span
              key={tag}
              className="text-mono text-[10px] tracking-[0.15em] text-primary/50 border border-primary/15 px-2.5 py-1 group-hover:border-primary/30 group-hover:text-primary/70 transition-all duration-500"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>

    {/* Hover accent line */}
    <motion.div
      className="absolute left-0 top-0 w-[2px] h-full bg-primary origin-top"
      initial={{ scaleY: 0 }}
      whileHover={{ scaleY: 1 }}
      transition={{ duration: 0.4 }}
    />
  </motion.article>
);

const Research = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-background min-h-screen"
    >
      <TopNav />
      <CursorGlow />

      {/* Noise */}
      <div className="noise-overlay fixed inset-0 pointer-events-none z-10" />

      {/* Header */}
      <header className="relative z-20 pt-28 md:pt-40 pb-16 md:pb-24 px-6 md:px-16">
        <div className="container mx-auto max-w-4xl">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-mono text-primary/50 mb-6 block"
          >
            FIELD NOTES
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-display text-section text-foreground mb-6"
          >
            Research<span className="text-primary">.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-muted-foreground font-light text-lg md:text-xl max-w-xl leading-relaxed"
          >
            Applied thinking on systems, autonomy, and operating under
            constraint.
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.7 }}
            className="h-px bg-border/60 mt-12 origin-left"
          />
        </div>
      </header>

      {/* Entries */}
      <main className="relative z-20 px-6 md:px-16 pb-32">
        <div className="container mx-auto max-w-4xl">
          {RESEARCH_NOTES.map((note, i) => (
            <ResearchEntry key={note.id} note={note} index={i} />
          ))}
        </div>

        {/* Footer marker */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="container mx-auto max-w-4xl mt-20 text-center"
        >
          <span className="text-mono text-muted-foreground/40">
            END OF LOG — {RESEARCH_NOTES.length} ENTRIES
          </span>
        </motion.div>
      </main>
    </motion.div>
  );
};

export default Research;
