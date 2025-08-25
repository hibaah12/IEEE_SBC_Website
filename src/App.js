import Hero from './components/Hero';
import Intro from './components/Intro';
import About from './components/About';
import Societies from './components/Societies';
import ExeCom from './components/ExeCom';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-white text-gray-800">
      <Hero />
      <main>
        <Intro />
        <About />
        <Societies />
        <ExeCom />
      </main>
      <Footer />
    </div>
  );
}

export default App;