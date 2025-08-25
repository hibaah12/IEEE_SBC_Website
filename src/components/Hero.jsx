import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particleOptions = {
    background: {
      color: {
        value: "#ffffff",
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
        resize: true,
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
        value: "#00629B", // IEEE Blue
      },
      links: {
        color: "#00629B",
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      collisions: {
        enable: true,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 2,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
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
  };

  return (
    <section className="relative h-screen flex justify-center items-center text-center">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particleOptions}
        className="absolute top-0 left-0 w-full h-full z-[-1]"
      />
      <div className="z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-ieee-blue">
          <TypeAnimation
            sequence={[
              'Welcome to PACE IEEE Student Branch',
              2000, // wait 2s
              '',     // erase it
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </h1>
      </div>
    </section>
  );
};

export default Hero;