import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

function CyberBackground() {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div className="absolute inset-0 -z-10">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: false,
          background: {
            color: "#0f172a",
          },
          fpsLimit: 60,
          particles: {
            number: {
              value: 60,
            },
            color: {
              value: ["#a855f7", "#3b82f6"],
            },
            links: {
              enable: true,
              color: "#8b5cf6",
              distance: 150,
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 1.5,
            },
            size: {
              value: 3,
            },
            opacity: {
              value: 0.7,
            },
          },
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "grab",
              },
              onClick: {
                enable: true,
                mode: "push",
              },
            },
            modes: {
              grab: {
                distance: 200,
                links: {
                  opacity: 1,
                },
              },
              push: {
                quantity: 4,
              },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
}

export default CyberBackground;