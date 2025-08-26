import Hero from './components/Hero';
import Intro from './components/Intro';
import About from './components/About';
import Societies from './components/Societies';
import ExeCom from './components/ExeCom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Events from './components/Events';
import JoinUs from './components/JoinUs';

function App() {
  return (
    <div className="bg-white text-gray-800">
      <Navbar />
      <Hero />
      <main>
        <Intro />
        <About />
        <Societies />
        <Events />
        <ExeCom />
        <JoinUs />
      </main>
      <Footer />
    </div>
  );
}

export default App;