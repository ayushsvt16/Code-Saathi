import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function Home() {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");

  const createRoom = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/rooms/create`
      );
      navigate(`/editor/${res.data.roomId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const joinRoom = () => {
    if (roomId.trim() !== "") {
      navigate(`/editor/${roomId}`);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>CodeSync</h1>

      <button onClick={createRoom}>
        Create New Room
      </button>

      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button onClick={joinRoom}>Join Room</button>
      </div>
    </div>
  );
}

export default Home;
