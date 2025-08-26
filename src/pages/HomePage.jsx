// src/pages/HomePage.jsx
import Hero from '../components/Hero';
import Intro from '../components/Intro';
import About from '../components/About';
import Societies from '../components/Societies';

const HomePage = () => {
  return (
    <>
      <Hero />
      <main>
        <Intro />
        <About />
        <Societies />
      </main>
    </>
  );
};
export default HomePage;