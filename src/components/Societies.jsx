import Marquee from "react-fast-marquee";

const Societies = () => {
    // **CHANGE 1: Created a detailed array for the 13 societies.**
    // Now you can easily update the name and logo path for each society.
    const societiesList = [
        { id: 1, name: "Council of Electronics and Design Automation", logoUrl: "/images/ceda.png" },
        { id: 2, name: "Aerospace and Electronics Systems Society", logoUrl: "/images/aess.png" },
        { id: 3, name: "Engineering in Medicine and Biology Society", logoUrl: "/images/embs.png" },
        { id: 4, name: "Technology and Engineering Management Society", logoUrl: "/images/tems.png" },
        { id: 5, name: "Robotics and Automation Society", logoUrl: "/images/ras.png" },
        { id: 6, name: "Computational Intelligence Society", logoUrl: "/images/cis.png" },
        { id: 7, name: "Women in Engineering", logoUrl: "/images/wie.png" },
        { id: 8, name: "Professional Communication Society", logoUrl: "/images/procomm.webp" },
        { id: 9, name: "Microwave Theory and Technology Society", logoUrl: "/images/mtts.png" },
        { id: 10, name: "Geoscience and Remote Sensing Society", logoUrl: "/images/grss.png" },
        { id: 11, name: "Computer Society", logoUrl: "/images/cs.png" },
        { id: 12, name: "Signal Processing Society", logoUrl: "/images/sps.png" },
        { id: 13, name: "Special Interest Group on Humanitarian Technology", logoUrl: "/images/sight.jpg" },
    ];

    return (
        <section className="py-16">
            <div className="container mx-auto">
                <h2 className="text-4xl font-bold text-center text-ieee-blue mb-12">Our Society Chapters</h2>
                <Marquee gradient={true} gradientColor={[249, 250, 251]} gradientWidth={100} speed={50}>
                    {/* **CHANGE 2: Mapping over the new 'societiesList' array.** */}
                    {societiesList.map((society) => (
                        <div key={society.id} className="mx-8 flex-shrink-0">
                            {/* **CHANGE 3: Improved styling for the logo container and added the <img> tag.** */}
                            <div className="w-40 h-40 bg-white rounded-lg shadow-md p-4 flex items-center justify-center">
                                <img 
                                    src={society.logoUrl} 
                                    alt={`${society.name} Logo`}
                                    className="max-w-full max-h-full object-contain"
                                    // This adds a placeholder if an image fails to load
                                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/128x128/E2E8F0/4A5568?text=Logo"; }}
                                />
                            </div>
                        </div>
                    ))}
                </Marquee>
            </div>
        </section>
    );
}

export default Societies;