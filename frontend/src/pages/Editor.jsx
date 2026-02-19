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
    <div style={{ height: "100vh" }}>
      <h3 style={{ textAlign: "center" }}>
        Room: {roomId}
      </h3>

      <Editor
        height="90vh"
        language={language}
        value={code}
        theme="vs-dark"
        onChange={handleChange}
      />
    </div>
  );
}

export default CodeEditor;
