import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { useState, useEffect } from "react";

export default function IEEEDayPage() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Responsive confetti setup
  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Celebration handler
  const handleCelebrate = () => {
    setShowConfetti(true);
    setShowCelebration(true);
    setTimeout(() => setShowConfetti(false), 5000);
    setTimeout(() => setShowCelebration(false), 6000);
  };

  return (
    <div className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white pt-32 px-4">

      {/* 🎉 Confetti */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={300}
          gravity={0.3}
        />
      )}

      {/* ✨ Floating Background Accents */}
      <motion.div
        animate={{ y: [0, -30, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute w-80 h-80 bg-indigo-400 rounded-full blur-3xl top-10 left-16 opacity-20"
      />
      <motion.div
        animate={{ y: [0, 30, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ repeat: Infinity, duration: 7 }}
        className="absolute w-96 h-96 bg-sky-400 rounded-full blur-3xl bottom-20 right-10 opacity-20"
      />

      {/* 🪩 Title Section */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-6xl font-extrabold mb-4 text-center drop-shadow-lg"
      >
        IEEE Day 2025 🎉
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="text-xl text-center max-w-3xl leading-relaxed text-blue-100"
      >
        <span className="font-semibold text-white">"Leveraging Technology for a Better Tomorrow"</span>  
        <br />
        Celebrating collaboration, innovation, and the power of engineering communities worldwide.
      </motion.p>

      {/* 💫 About Section Card */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="bg-white/10 backdrop-blur-md p-8 mt-12 rounded-3xl shadow-2xl max-w-3xl text-center border border-white/20"
      >
        <h2 className="text-3xl font-semibold mb-4 text-white">About IEEE Day</h2>
        <p className="text-blue-100 leading-relaxed">
          IEEE Day commemorates the first time engineers worldwide gathered to share technical ideas in 1884.
          It’s a celebration of innovation, creativity, and global unity in technology.
        </p>

        <motion.button
          whileHover={{ scale: 1.08, boxShadow: "0px 0px 15px rgba(255,255,255,0.4)" }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCelebrate}
          className="mt-8 bg-gradient-to-r from-yellow-300 to-yellow-500 text-blue-900 font-bold px-8 py-3 rounded-xl shadow-lg transition-all"
        >
          Celebrate Now 🚀
        </motion.button>
      </motion.div>

      {/* Celebration Popup */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
              className="bg-gradient-to-br from-white to-blue-100 text-blue-800 rounded-3xl p-10 text-center shadow-2xl max-w-md"
            >
              <motion.h2
                initial={{ y: -20 }}
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-4xl font-bold mb-4"
              >
                🎊 Happy IEEE Day! 🎊
              </motion.h2>
              <p className="text-lg mb-6">
                Celebrating innovation, community, and the spirit of technology!
              </p>
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-5xl"
              >
                💡 ⚙️ 🌍 💙
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🌍 Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1.5 }}
        className="mt-20 text-sm text-center text-blue-200"
      >
        Organized by <span className="font-semibold text-white">IEEE Student Branch Chapter</span>  
        <br /> © 2025 IEEE SBC
      </motion.footer>
    </div>
  );
}


