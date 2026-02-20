import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Home() {
  const navigate = useNavigate();

  const [roomId, setRoomId] = useState("");
  const [createdRoom, setCreatedRoom] = useState(null);
  const [copied, setCopied] = useState(false);
  const BASE_URL = import.meta.env.VITE_BACKEND_URL ||
  "https://codesaathi-backend.onrender.com";

  const createRoom = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/rooms/create`
      );
      setCreatedRoom(res.data.roomId);
    } catch (error) {
      console.error(error);
    }
  };

  const joinRoom = () => {
    if (roomId.trim()) {
      navigate(`/editor/${roomId}`);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/editor/${createdRoom}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#0f172a] text-white flex flex-col items-center justify-center">

      <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
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

      {/* MODAL */}
      {createdRoom && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-[#1e293b] p-8 rounded-2xl w-[400px] text-center space-y-4 shadow-2xl">

            <h2 className="text-2xl font-semibold text-green-400">
              Room Created 🎉
            </h2>

            <div className="bg-gray-800 px-4 py-3 rounded text-purple-400 font-mono break-all">
              {window.location.origin}/editor/{createdRoom}
            </div>

            <div className="flex gap-3">
              <button
                onClick={copyToClipboard}
                className="flex-1 bg-blue-600 py-2 rounded hover:bg-blue-500 transition"
              >
                {copied ? "Copied ✓" : "Copy Link"}
              </button>

              <button
                onClick={() =>
                  navigator.share
                    ? navigator.share({
                        title: "Join my CodeSync room",
                        url: `${window.location.origin}/editor/${createdRoom}`,
                      })
                    : copyToClipboard()
                }
                className="flex-1 bg-purple-600 py-2 rounded hover:bg-purple-500 transition"
              >
                Share
              </button>
            </div>

            <button
              onClick={() => navigate(`/editor/${createdRoom}`)}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Enter Room
            </button>

            <button
              onClick={() => setCreatedRoom(null)}
              className="text-gray-400 text-sm hover:text-white"
            >
              Close
            </button>

          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
