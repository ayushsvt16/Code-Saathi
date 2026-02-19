import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import { io } from "socket.io-client";

function CodeEditor() {
  const { roomId } = useParams();
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const socket = io("`${import.meta.env.VITE_BACKEND_URL}/api/rooms/create`");

  const saveTimeout = useRef(null);

  useEffect(() => {
    
    const fetchRoom = async () => {
      socket.emit("join-room", roomId);
      socket.on("receive-code",(newcode)=>{
        setCode(newcode);
      });
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/rooms/${roomId}`);
        setCode(res.data.code);
        setLanguage(res.data.language);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRoom();
    return()=>{
      socket.off("receive-code");
    };
  }, [roomId]);

  const handleChange = (value) => {
    if (typeof value !== "string") return;

    setCode(value);

    socket.emit("code-change", {
      roomId,
      code: value,
    });
    if (saveTimeout.current) {
      clearTimeout(saveTimeout.current);
    }

    saveTimeout.current = setTimeout(() => {
      console.log("Sending PUT request...");

      axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/rooms/${roomId}`,
        {
          code: value,
          language: language,
        }
      )
      .then(() => {
        console.log("Auto-saved");
      })
      .catch((error) => {
        console.error("Save failed:", error);
      });

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
