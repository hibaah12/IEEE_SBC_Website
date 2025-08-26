// src/pages/HomePage.jsx
import Hero from '../components/Hero';
import Intro from '../components/Intro';
import About from '../components/About';
import Societies from '../components/Societies';
import ExeCom from '../components/ExeCom';
import JoinUs from '../components/JoinUs';

const HomePage = () => {
  return (
    <>
      <Hero />
      <main>
        <Intro />
        <About />
        <Societies />
        <ExeCom />
        <JoinUs />
      </main>
    </>
  );
};
export default HomePage;