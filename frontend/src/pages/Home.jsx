import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import AnimatedBackground from "../components/AnimatedBackground";
import RoomModal from "../components/RoomModal";
import NeonBackground from "../components/NeonBackground";

function Home() {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [createdRoom, setCreatedRoom] = useState(null);
  const [error, setError] = useState("");

  const createRoom = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/rooms/create`
      );
      setCreatedRoom(res.data.roomId);
    } catch (err) {
      console.error(err);
    }
  };

  const joinRoom = async () => {
    if (!roomId.trim()) return;

    try {
      await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/rooms/${roomId}`
      );
      navigate(`/editor/${roomId}`);
    } catch {
      setError("Room ID incorrect. Create new or re-enter.");
    }
  };

  return (
    <>
      <AnimatedBackground />

      <div className="relative min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center">

        <NeonBackground />
        <h1
          onClick={() => navigate("/")}
          className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent cursor-pointer"
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(139,92,246,0.8)]">
            Code With Saathi
          </h1>
        </h1>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-[0_0_40px_rgba(139,92,246,0.3)] w-[350px] space-y-4">

          <button
            onClick={createRoom}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 py-3 rounded-lg font-semibold shadow-[0_0_20px_rgba(139,92,246,0.7)] hover:scale-105 transition"
          >
            Create New Room
          </button>

          <input
            type="text"
            placeholder="Enter Room ID"
            className="w-full px-4 py-2 bg-[#0f172a] border border-gray-700 rounded-lg focus:outline-none"
            value={roomId}
            onChange={(e) => {
              setRoomId(e.target.value);
              setError("");
            }}
          />

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <button
            onClick={joinRoom}
            className="w-full bg-gray-700 py-3 rounded-lg hover:bg-gray-600 transition"
          >
            Join Room
          </button>
        </div>

        {createdRoom && (
          <RoomModal
            roomId={createdRoom}
            onEnter={() => navigate(`/editor/${createdRoom}`)}
            onClose={() => setCreatedRoom(null)}
          />
        )}
      </div>
    </>
  );
}

export default Home;