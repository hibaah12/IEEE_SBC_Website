const ExeComPage = () => {
    const members = [
        { title: "Branch Counselor", name: "Dr. Mohammed Zakir Bellary", img: "/images/zakir.png" },
        { title: "Chair", name: "Abdul Kader Suhair Afran", img: "/images/afran.png" },
        { title: "Vice Chair", name: "Rihan Muhammed Nellikar", img: "/images/rihan.jpg" },
        { title: "Secretary", name: "Swati Mahesh Kuravattimath", img: "/images/swathi.jpg" },
    ];

    // **CHANGE 1: Removed Faculty Coordinator data, keeping only the Chair.**
    const societyChapters = [
        { id: 1, acronym: "IEEE CEDA", fullName: "Council on Electronic Design Automation", chair: { name: "Nihal Ahmed Shet", img: "/images/nihal.png" } },
        { id: 2, acronym: "IEEE AESS", fullName: "Aerospace and Electronic Systems Society", chair: { name: "Aamir Habeeb", img: "/images/aamir.png" } },
        { id: 3, acronym: "IEEE EMBS", fullName: "Engineering in Medicine and Biology Society", chair: { name: "Mohammed Zohan", img: "/images/zohan.png" } },
        { id: 4, acronym: "IEEE TEMS", fullName: "Technology and Engineering Management Society", chair: { name: "Mohammed Zaid", img: "/images/zaid.png" } },
        { id: 5, acronym: "IEEE WIE", fullName: "Women in Engineering", chair: { name: "Swati Mahesh Kuravattimath", img: "/images/swathi.jpg" } },
        { id: 6, acronym: "IEEE RAS", fullName: "Robotics and Automation Society", chair: { name: "Rihan Muhammed Nellikar", img: "/images/rihan.jpg" } },
        { id: 7, acronym: "IEEE ProComm", fullName: "Professional Communication Society", chair: { name: "Sayeda Mariya Nishat Munshi", img: "/images/sayeda.png" } },
        { id: 8, acronym: "IEEE CIS", fullName: "Computational Intelligence Society", chair: { name: "Hiba A H", img: "/images/hiba.png" } },
        { id: 9, acronym: "IEEE CS", fullName: "Computer Society", chair: { name: "Swati Mahesh Kuravattimath", img: "/images/swathi.jpg" } },
        { id: 10, acronym: "IEEE MTT-S", fullName: "Microwave Theory and Techniques Society", chair: { name: "Mohammed Zohan", img: "/images/zohan.png" } },
        { id: 11, acronym: "IEEE GRSS", fullName: "Geoscience and Remote Sensing Society", chair: { name: "Farseen Ahras", img: "/images/ahras.png" } },
        { id: 12, acronym: "IEEE SPS", fullName: "Signal Processing Society", chair: { name: "Farseen Ahras", img: "/images/ahras.png" } },
        { id: 13, acronym: "IEEE SIGHT", fullName: "Special Interest Group on Humanitarian Technology", chair: { name: "Deepushree H P", img: "/images/deepushree.png" } },
    ];

    return (
        <div className="pt-24 pb-16 min-h-screen container mx-auto px-4">
            
            <h1 className="text-4xl font-bold text-center text-ieee-blue mb-4">
                Executive Committee
            </h1>
            <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-16">
                The Executive Committee, or ExeCom, is the core leadership team responsible for planning, organizing, and executing the activities of the IEEE Student Branch and its society chapters.
            </p>

            <div className="mb-16">
                <h2 className="text-3xl font-bold text-center text-ieee-blue mb-10">
                    Student Branch Committee
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {members.map((member, index) => (
                        <div key={index} className="text-center">
                            <img src={member.img} alt={member.name} className="w-40 h-40 rounded-full mx-auto mb-4 object-cover border-4 border-ieee-blue shadow-md" />
                            <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                            <p className="text-ieee-blue font-medium">{member.title}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-3xl font-bold text-center text-ieee-blue mb-10">
                    Society Chapter Leads
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {societyChapters.map((chapter) => (
                        <div key={chapter.id} className="bg-white border border-gray-200 rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300 flex flex-col items-center">
                            
                            <div className="mb-4 min-h-[4.5rem]">
                                <p className="text-xl font-bold text-ieee-blue">{chapter.acronym}</p>
                                <p className="text-sm text-gray-600">{chapter.fullName}</p>
                            </div>
                            
                            {/* **CHANGE 2: Simplified to show only the Chapter Chair with a larger image.** */}
                            <div>
                                <img 
                                    src={chapter.chair.img} 
                                    alt={`${chapter.chair.name} - Chair`} 
                                    className="w-32 h-32 rounded-full mx-auto mb-2 object-cover border-2 border-ieee-blue" 
                                />
                                <h4 className="font-semibold text-gray-700">{chapter.chair.name}</h4>
                                <p className="text-sm text-ieee-blue">Chapter Chair</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExeComPage;