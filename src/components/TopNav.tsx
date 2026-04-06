import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { label: "EXPERIENCE", path: "/experience" },
  { label: "RESEARCH", path: "/research" },
];

const TopNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-16 py-5 flex items-center justify-between pointer-events-none"
    >
      {/* Logo / Home */}
      <button
        onClick={() => navigate("/")}
        className="text-mono text-primary/60 hover:text-primary transition-colors duration-500 pointer-events-auto cursor-pointer"
      >
        SRIVASTAV
      </button>

      {/* Links */}
      <div className="flex items-center gap-8 pointer-events-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`text-mono text-[11px] tracking-[0.15em] transition-all duration-500 cursor-pointer relative
                ${isActive ? "text-primary" : "text-muted-foreground/60 hover:text-primary/80"}`}
            >
              {item.label}
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-1.5 left-0 right-0 h-px bg-primary/60"
                  transition={{ duration: 0.4 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default TopNav;
