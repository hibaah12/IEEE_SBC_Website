const ExeCom = () => {
    const members = [
        { title: "Branch Counselor", name: "[Name Here]", img: "/images/placeholder.png" },
        { title: "Chair", name: "[Name Here]", img: "/images/placeholder.png" },
        { title: "Vice Chair", name: "[Name Here]", img: "/images/placeholder.png" },
        { title: "Secretary", name: "[Name Here]", img: "/images/placeholder.png" },
    ];

    return (
        <section className="py-16 px-4 md:px-8">
            <div className="container mx-auto">
                <h2 className="text-4xl font-bold text-center text-ieee-blue mb-12">ExeCom Members</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {members.map((member, index) => (
                        <div key={index} className="text-center">
                            <img 
                                src={member.img} 
                                alt={member.name} 
                                className="w-40 h-40 rounded-full mx-auto mb-4 object-cover border-4 border-ieee-blue" 
                            />
                            <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                            <p className="text-ieee-blue">{member.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ExeCom;