// Remember to add your logo images to the `public/images` folder
// For example: public/images/college_logo.png

const Intro = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-gray-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left Side: Logos */}
        <div className="w-full md:w-1/3 flex justify-center items-center gap-8">
          {/* Replace '#' with the actual path to your logos */}
          <img src="/images/college_logo.png" alt="College Logo" className="max-h-32" />
          <img src="/images/ieee_sb_logo.png" alt="IEEE SB Logo" className="max-h-32" />
        </div>
        
        {/* Right Side: Introduction */}
        <div className="w-full md:w-2/3">
          <h2 className="text-3xl font-bold text-ieee-blue mb-4">About Our Student Branch</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Welcome to the official webspace for the IEEE Student Branch at P.A. College of Engineering. We are a community of innovators, thinkers, and builders dedicated to advancing technology for humanity. Our branch provides students with opportunities to network, develop professional skills, and participate in exciting technical events.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Intro;