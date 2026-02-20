import { motion } from "framer-motion";

function NeonBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      
      {/* Animated Gradient Blob 1 */}
      <motion.div
        className="absolute w-[500px] h-[500px] bg-purple-600 rounded-full blur-[150px] opacity-30"
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Animated Gradient Blob 2 */}
      <motion.div
        className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[150px] opacity-30"
        animate={{
          x: [0, -100, 50, 0],
          y: [0, 50, -100, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

export default NeonBackground;