import { useEffect, useState } from "react";

function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="pointer-events-none fixed w-40 h-40 rounded-full blur-3xl opacity-30 bg-purple-500"
      style={{
        left: position.x - 80,
        top: position.y - 80,
      }}
    />
  );
}

export default CursorGlow;