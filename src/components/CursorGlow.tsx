import { useEffect, useRef } from "react";

const CursorGlow = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const glowPos = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);
  const isHovering = useRef(false);

  useEffect(() => {
    const dot = dotRef.current;
    const glow = glowRef.current;
    if (!dot || !glow) return;

    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
    };

    const animate = () => {
      glowPos.current.x += (pos.current.x - glowPos.current.x) * 0.12;
      glowPos.current.y += (pos.current.y - glowPos.current.y) * 0.12;
      glow.style.left = `${glowPos.current.x}px`;
      glow.style.top = `${glowPos.current.y}px`;
      raf.current = requestAnimationFrame(animate);
    };

    // Scale cursor on interactive elements
    const onOver = (e: Event) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], input, textarea, select, [data-magnetic]");
      if (interactive && !isHovering.current) {
        isHovering.current = true;
        dot.style.transform = "translate(-50%, -50%) scale(2.5)";
        dot.style.opacity = "0.6";
        dot.style.mixBlendMode = "difference";
        glow.style.transform = "translate(-50%, -50%) scale(2)";
        glow.style.borderColor = "hsl(166 60% 50% / 0.8)";
      } else if (!interactive && isHovering.current) {
        isHovering.current = false;
        dot.style.transform = "translate(-50%, -50%) scale(1)";
        dot.style.opacity = "1";
        dot.style.mixBlendMode = "normal";
        glow.style.transform = "translate(-50%, -50%) scale(1)";
        glow.style.borderColor = "hsl(166 60% 50% / 0.5)";
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className="cursor-glow-ring" style={{ transition: "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.3s" }} />
      <div ref={dotRef} className="cursor-dot" style={{ transition: "transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.3s" }} />
    </>
  );
};

export default CursorGlow;
