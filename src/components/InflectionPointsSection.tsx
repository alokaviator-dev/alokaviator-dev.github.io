import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import investorImg from "@/assets/investor-meet-cinematic.jpg";
import roverImg from "@/assets/lunar-rover-cinematic.jpg";
import uavImg from "@/assets/trajectory-uav.jpg";

interface InflectionPoint {
  id: string;
  moment: string;
  title: string;
  description: string;
  image: string;
  impact: string;
  textRight?: boolean;
}

const POINTS: InflectionPoint[] = [
  {
    id: "IP.01",
    moment: "First autonomous flight failure",
    title: "The system that taught me to listen.",
    description:
      "A UAV lost signal in a GPS-denied corridor. Recovery took 11 seconds of pure autonomous decision-making. That failure rewired how I architect every failsafe since.",
    image: uavImg,
    impact: "Led to sensor-fusion-first architecture across all platforms.",
  },
  {
    id: "IP.02",
    moment: "ANALOG Astronaut Mission",
    title: "When the team becomes the system.",
    description:
      "Lunar analog mission. Comms blackout. Equipment malfunction. The moment I realized that human factors aren't edge cases, they're the primary constraint in extreme environments.",
    image: roverImg,
    impact: "Shifted focus to human-machine interface design under stress.",
  },
  {
    id: "IP.03",
    moment: "INVESTOR MEET",
    title: "Building under pressure.\n",
    description:
      "Limited time. High stakes. Every claim had to hold under questioning. Every assumption had to survive scrutiny. This is where ideas are tested against reality.",
    image: investorImg,
    impact: "Converted conversations into serious investor interest.",
    textRight: true,
  },
];

const InflectionCard = ({ point, index }: { point: InflectionPoint; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 0.95]);
  const textY = useTransform(scrollYProgress, [0, 1], [60, -40]);

  return (
    <motion.div
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden flex items-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1 }}
    >
      {/* Full-bleed background image */}
      <motion.div style={{ scale: imgScale }} className="absolute inset-0 z-0">
        <img
          src={point.image}
          alt={point.moment}
          loading="lazy"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 ${point.textRight ? 'bg-background/40' : 'bg-background/70'}`} />
        <div className={`absolute inset-0 ${point.textRight ? 'bg-gradient-to-l from-background via-background/60 to-transparent' : 'bg-gradient-to-r from-background via-background/60 to-transparent'}`} />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: textY }}
        className={`relative z-20 container mx-auto px-6 md:px-16 py-20 ${point.textRight ? 'flex justify-end' : ''}`}
      >
        <div className={`max-w-2xl ${point.textRight ? 'text-right' : ''}`}>
          {/* Moment label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`flex items-center gap-3 mb-6 ${point.textRight ? 'justify-end' : ''}`}
          >
            <span className="text-mono text-primary/40 text-[10px]">{point.id}</span>
            <span className="w-8 h-px bg-primary/20" />
            <span className="text-mono text-primary/60 text-[10px]">{point.moment.toUpperCase()}</span>
          </motion.div>

          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-light tracking-tight text-foreground text-3xl sm:text-4xl lg:text-5xl leading-[1.1] mb-8"
          >
            {point.title}
          </motion.h3>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-muted-foreground font-light leading-relaxed text-base sm:text-lg mb-8"
          >
            {point.description}
          </motion.p>

          {/* Impact */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className={`${point.textRight ? 'border-r-2 border-l-0 pr-4' : 'border-l-2 pl-4'} border-primary/30`}
          >
            <span className="text-mono text-primary/40 text-[9px] block mb-1">IMPACT</span>
            <p className="text-foreground/80 font-light text-sm">{point.impact}</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const InflectionPointsSection = () => {
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
              INFLECTION POINTS
            </motion.span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-display font-light tracking-tight text-foreground text-4xl sm:text-5xl lg:text-6xl"
          >
            Moments that <span className="text-primary">changed everything.</span>
          </motion.h2>
        </div>
      </div>

      {/* Inflection points */}
      <div className="relative z-10">
        {POINTS.map((point, index) => (
          <InflectionCard key={point.id} point={point} index={index} />
        ))}
      </div>
    </section>
  );
};

export default InflectionPointsSection;
