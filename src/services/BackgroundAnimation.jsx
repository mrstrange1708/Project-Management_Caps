import { useEffect, useMemo, useState, useContext } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";  
import { TheamContext } from "../App";
const BackgroundAnimation = () => {
    const { theam } = useContext(TheamContext);
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);



  const options = useMemo(
    () => ({
      background: {
        color: {
          value: theam ? "#000000" : "#ffffff",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: theam ? "#ffffff" : "#000000"
        },
        links: {
          color: theam ? "#ffffff" : "#000000",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 6,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }),
    [theam],
  );

  if (init) {
    return (
      <Particles
        className="absolute top-0 left-0 w-full h-full "
        id="tsparticles"
        options={options}
      />
    );
  }

  return <></>;
};
export default BackgroundAnimation;