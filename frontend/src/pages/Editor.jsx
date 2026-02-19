import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";

function CodeEditor() {
  const { roomId } = useParams();
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");

  const saveTimeout = useRef(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/rooms/${roomId}`
        );
        setCode(res.data.code);
        setLanguage(res.data.language);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRoom();
  }, [roomId]);

  const handleChange = (value) => {
    if (typeof value !== "string") return;

    setCode(value);

    if (saveTimeout.current) {
      clearTimeout(saveTimeout.current);
    }

    saveTimeout.current = setTimeout(() => {
      console.log("Sending PUT request...");

      axios.put(
        `http://localhost:5000/api/rooms/${roomId}`,
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
