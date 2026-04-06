import { useEffect, useRef } from "react";

const CursorGlow = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const glowPos = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

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
      glowPos.current.x += (pos.current.x - glowPos.current.x) * 0.15;
      glowPos.current.y += (pos.current.y - glowPos.current.y) * 0.15;
      glow.style.left = `${glowPos.current.x}px`;
      glow.style.top = `${glowPos.current.y}px`;
      raf.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      {/* Trailing glow */}
      <div ref={glowRef} className="cursor-glow-ring" />
      {/* Precise dot */}
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
};

export default CursorGlow;
