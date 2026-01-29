import { motion } from "framer-motion";

const GlassCard = ({ children, className, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`rounded-xl backdrop-blur-3xl border border-primary/30 shadow-primary p-6 transition-all duration-300 bg-linear-to-bl from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10
        ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
