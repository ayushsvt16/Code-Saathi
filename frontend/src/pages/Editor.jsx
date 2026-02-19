import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import { io } from "socket.io-client";

function CodeEditor() {
  const { roomId } = useParams();

  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [saveStatus, setSaveStatus] = useState("Saved");

  const socket = useRef(null);
  const saveTimeout = useRef(null);

  useEffect(() => {
    // Create socket connection
    socket.current = io(import.meta.env.VITE_BACKEND_URL);

    socket.current.emit("join-room", roomId);

    socket.current.on("receive-code", (newCode) => {
      setCode(newCode);
    });

    // Fetch existing room data
    const fetchRoom = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/rooms/${roomId}`
        );
        setCode(res.data.code || "");
        setLanguage(res.data.language || "javascript");
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
    setSaveStatus("Saving...");

    // Real-time sync
    socket.current.emit("code-change", {
      roomId,
      code: value,
    });

    // Clear previous timer
    if (saveTimeout.current) {
      clearTimeout(saveTimeout.current);
    }

    // Auto-save after 1 sec
    saveTimeout.current = setTimeout(() => {
      axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/api/rooms/${roomId}`,
          {
            code: value,
            language: language,
          }
        )
        .then(() => {
          setSaveStatus("Auto Saved");
        })
        .catch(() => {
          setSaveStatus("Error Saving");
        });
    }, 1000);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#0f172a] text-white flex flex-col">

      {/* Top Bar */}
      <div className="bg-[#1e293b] px-6 py-3 flex justify-between items-center border-b border-gray-800">

        {/* Left */}
        <div className="flex items-center gap-4">
          <h2 className="font-bold text-xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            CodeSync
          </h2>

          <span className="bg-gray-800 px-3 py-1 rounded text-purple-400 text-sm">
            Room: {roomId}
          </span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">

          {/* Save Status */}
          <span className="text-sm text-green-400">
            {saveStatus}
          </span>

          {/* Language Selector */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-[#0f172a] border border-gray-700 px-3 py-1 rounded"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>
        </div>
      </div>

      {/* Editor */}
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
