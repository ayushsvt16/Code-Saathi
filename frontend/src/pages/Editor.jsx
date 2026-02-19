import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import { io } from "socket.io-client";

function CodeEditor() {
  const { roomId } = useParams();
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");

  const socket = useRef(null);
  const saveTimeout = useRef(null);

  useEffect(() => {
    socket.current = io(import.meta.env.VITE_BACKEND_URL);

    socket.current.emit("join-room", roomId);

    socket.current.on("receive-code", (newCode) => {
      setCode(newCode);
    });

    const fetchRoom = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/rooms/${roomId}`
        );
        setCode(res.data.code);
        setLanguage(res.data.language);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRoom();

    return () => {
      socket.current.disconnect();
    };
  }, [roomId]);

  const handleChange = (value) => {
    if (typeof value !== "string") return;

    setCode(value);

    socket.current.emit("code-change", {
      roomId,
      code: value,
    });

    if (saveTimeout.current) {
      clearTimeout(saveTimeout.current);
    }

    saveTimeout.current = setTimeout(() => {
      axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/rooms/${roomId}`,
        {
          code: value,
          language: language,
        }
      );
    }, 1000);
  };

  return (
  <div className="h-screen bg-[#0f172a] text-white flex flex-col">
    
    <div className="bg-[#1e293b] px-6 py-3 flex justify-between items-center border-b border-gray-800">
      <h2 className="font-semibold text-lg">
        Room: {roomId}
      </h2>

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="bg-[#0f172a] border border-gray-700 px-3 py-1 rounded"
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="cpp">C++</option>
      </select>
    </div>
    <div className="flex justify-between items-center px-6 py-3 bg-[#111827] border-b border-gray-800">

  {/* Room ID */}
  <div className="flex items-center gap-3">
    <span className="text-gray-400 text-sm">Room:</span>
    <span className="bg-gray-800 px-3 py-1 rounded text-purple-400">
      {roomId}
    </span>
  </div>

  {/* Language Selector */}
  <select
    value={language}
    onChange={(e) => setLanguage(e.target.value)}
    className="bg-gray-900 border border-gray-700 px-3 py-1 rounded text-white"
  >
    <option value="javascript">JavaScript</option>
    <option value="python">Python</option>
    <option value="java">Java</option>
    <option value="cpp">C++</option>
  </select>

</div>

    <Editor
      height="100%"
      language={language}
      value={code}
      theme="vs-dark"
      onChange={handleChange}
    />
  </div>
);

}

export default CodeEditor;
