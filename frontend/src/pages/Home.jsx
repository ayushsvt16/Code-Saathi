import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import AnimatedBackground from "../components/AnimatedBackground";
import RoomModal from "../components/RoomModal";

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

      <div className="min-h-screen flex flex-col items-center justify-center text-white">
        
        <h1
          onClick={() => navigate("/")}
          className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent cursor-pointer"
        >
          Code With Saathi
        </h1>

        <div className="bg-[#1e293b] p-8 rounded-2xl shadow-2xl w-[350px] space-y-4">
          
          <button
            onClick={createRoom}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 py-3 rounded-lg font-semibold hover:opacity-90 transition"
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