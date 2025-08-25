import Marquee from "react-fast-marquee";

const Societies = () => {
    // Create an array for the 13 placeholders
    const societyPlaceholders = Array.from({ length: 13 });

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto">
                <h2 className="text-4xl font-bold text-center text-ieee-blue mb-12">Our Society Chapters</h2>
                <Marquee gradient={true} gradientColor={[249, 250, 251]} gradientWidth={100} speed={40}>
                    {societyPlaceholders.map((_, index) => (
                        <div key={index} className="mx-8 flex-shrink-0">
                            {/* Replace this div with your <img> tag */}
                            <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                                <span className="text-gray-500">Logo {index + 1}</span>
                            </div>
                        </div>
                    ))}
                </Marquee>
            </div>
        </section>
    );
}

export default Societies;