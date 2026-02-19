import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");

  const createRoom = async () => {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/rooms/create`
    );
    navigate(`/editor/${res.data.roomId}`);
  };

  const joinRoom = () => {
    if (roomId.trim()) {
      navigate(`/editor/${roomId}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center">
      
      <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        CodeSync
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
          onChange={(e) => setRoomId(e.target.value)}
        />

        <button
          onClick={joinRoom}
          className="w-full bg-gray-700 py-3 rounded-lg hover:bg-gray-600 transition"
        >
          Join Room
        </button>
      </div>

      <p className="mt-6 text-gray-400 text-sm">
        Real-time collaborative coding 🚀
      </p>
    </div>
  );
}

export default Home;
