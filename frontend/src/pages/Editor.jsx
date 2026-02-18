import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Editor() {
  const { roomId } = useParams();
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("");

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

  return (
    <div style={{ padding: "20px" }}>
      <h2>Editor Room: {roomId}</h2>

      <p><strong>Language:</strong> {language}</p>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows="15"
        cols="80"
      />
    </div>
  );
}

export default Editor;
