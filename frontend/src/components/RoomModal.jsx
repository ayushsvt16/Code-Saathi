import { motion } from "framer-motion";

export default function RoomModal({ roomId, onEnter, onClose }) {
  const shareLink = `${window.location.origin}/editor/${roomId}`;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[#1e293b] p-8 rounded-2xl w-[400px] text-center shadow-2xl"
      >
        <h2 className="text-2xl font-bold mb-4 text-purple-400">
          🎉 Room Created
        </h2>

        <p className="mb-3 text-gray-400">Room ID:</p>

        <div className="bg-gray-800 py-2 rounded mb-4 text-purple-300">
          {roomId}
        </div>

        <button
          onClick={() => navigator.clipboard.writeText(shareLink)}
          className="w-full bg-blue-600 py-2 rounded-lg mb-3 hover:bg-blue-500 transition"
        >
          Copy & Share Link
        </button>

        <button
          onClick={onEnter}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 py-2 rounded-lg hover:opacity-90 transition"
        >
          Enter Room
        </button>

        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-400 hover:text-white"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
}