import { useCallback } from "react";
import Particles from "react-tsparticles";
// **CHANGE 1: Switched to the lighter 'tsparticles-slim' package**
import { loadSlim } from "tsparticles-slim"; 
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
  // The init function now calls loadSlim
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  // **CHANGE 2: Using the new, simpler particle configuration**
  // This configuration is based on your example, themed for the IEEE website.
  const particleOptions = {
    fullScreen: { enable: false }, // Important to keep it contained in the hero section
    particles: {
      number: {
        value: 50, // A lower number of particles for a cleaner look
        density: { enable: true, area: 800 },
      },
      color: { value: "#00629B" }, // Particles are IEEE blue
      shape: { type: "circle" },
      opacity: {
        value: 0.5, // Slightly transparent
      },
      size: {
        value: 3,
        random: true, // Particles will have random sizes up to 3
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        outModes: { default: "bounce" }, // Particles will bounce off the edges
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
        className="absolute top-0 left-0 w-full h-full z-0"
      />
      <div className="relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-ieee-blue">
          Welcome to
        </h1>
        <div className="text-4xl md:text-6xl font-bold text-ieee-blue mt-2">
          <TypeAnimation
            sequence={[
              'PACE IEEE Student Branch',
              2000,
              '',
            ]}
            wrapper="span"
            speed={60}
            repeat={Infinity}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;