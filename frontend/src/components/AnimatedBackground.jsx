import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0f172a]">
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute top-20 left-20 w-72 h-72 bg-purple-600 rounded-full blur-3xl opacity-30"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="absolute bottom-20 right-20 w-72 h-72 bg-blue-600 rounded-full blur-3xl opacity-30"
      />
    </div>
  );
}