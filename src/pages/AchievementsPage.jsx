// src/pages/AchievementsPage.jsx
const AchievementsPage = () => {
  // Sample data for achievements. You can add more here.
  const achievements = [
    {
      id: 1,
      title: "Winner at IEEE Xtreme 24-Hour Programming Competition",
      description: "Our team 'Code Wizards' secured the 1st place in the national finals of the IEEE Xtreme programming competition.",
      date: "October 22, 2024",
      image: "/images/achievements/ieee-xtreme.jpg",
    },
    {
      id: 2,
      title: "Best Student Branch Award - Region 10",
      description: "Recognized for our outstanding activities, community engagement, and membership growth throughout the year.",
      date: "January 15, 2025",
      image: "/images/achievements/award.jpg",
    },
    {
      id: 3,
      title: "Published Research Paper in IEEE Access",
      description: "A research paper on 'Advanced Signal Processing Techniques' authored by our members was published in the prestigious IEEE Access journal.",
      date: "March 05, 2025",
      image: "/images/achievements/paper.jpg",
    },
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center text-ieee-blue mb-4">
        Our Achievements
      </h1>
      <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-16">
        We are proud to showcase the accomplishments and milestones of our dedicated members and the student branch as a whole.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {achievements.map((achievement) => (
          <div key={achievement.id} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img src={achievement.image} alt={achievement.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <p className="text-sm text-gray-500 mb-2">{achievement.date}</p>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{achievement.title}</h3>
              <p className="text-gray-700">{achievement.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsPage;