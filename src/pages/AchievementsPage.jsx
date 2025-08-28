// src/pages/AchievementsPage.jsx
const AchievementsPage = () => {
  // Sample data for achievements. You can add more here.
  const achievements = [
    {
      id: 1,
      title: "3rd Place in IEEE Mangalore Subsection (2024)",
      description: "Demonstrating a long-standing commitment to excellence, our branch secured 3rd place among all engineering colleges under the IEEE Bangalore Section for our outstanding contributions to the IEEE Mangalore Subsection in 2024.",
      date: "March 05, 2025",
      image: "/images/achievements/paper.jpg",
    },
    {
      id: 2,
      title: "Top 10 in Karnataka for Most Society Chapters",
      description: "Our institution has been recognized as one of the top 10 in Karnataka for hosting the highest number of IEEE society chapters, showcasing our deep commitment to fostering diverse fields of innovation and learning.",
      date: "March 05, 2025",
      image: "/images/achievements/paper.jpg",
    },
    {
      id: 3,
      title: "Top 10 in Karnataka for Event Organization",
      description: "Highlighting our vibrant campus life and commitment to technical engagement, our student branch has been ranked among the top 10 institutions in Karnataka for conducting the highest number of events.",
      date: "January 15, 2025",
      image: "/images/achievements/award.jpg",
    },
    {
      id: 4,
      title: "Outstanding Medium Student Branch Award",
      description: "Our student branch was honored with the prestigious \"Outstanding Medium Student Branch Award,\" a testament to the collective hard work, dedication, and impactful activities organized by our team.",
      date: "October 22, 2024",
      image: "/images/achievements/ieee-xtreme.jpg",
    },
    {
      id: 5,
      title: "\"Most Promising Chapter\" Award by IEEE CEDA",
      description: "Our institution, PA College of Engineering, was proudly recognized as the \"Most Promising Chapter\" by IEEE CEDA, a part of the IEEE Bangalore Section, highlighting our growing influence and potential.",
      date: "March 05, 2025",
      image: "/images/achievements/paper.jpg",
    },
    {
      id: 6,
      title: "Best Outstanding Contribution Award from IEEE CEDA",
      description: "Dr. Mohammed Zakir received the \"Best Outstanding Contribution Award\" from the IEEE CEDA chapter under the IEEE Bangalore Section for his significant impact and dedication.",
      date: "January 15, 2025",
      image: "/images/achievements/award.jpg",
    },
    {
      id: 7,
      title: "Outstanding Young Professional Award for Dr. Mohammed Zakir",
      description: "Dr. Mohammed Zakir was honored with the prestigious \"Outstanding Young Professional\" award by the IEEE Mangalore Sub-Section, recognizing his six years of dedicated contributions and perseverance in IEEE activities.",
      date: "October 22, 2024",
      image: "/images/achievements/ieee-xtreme.jpg",
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
        {[...achievements].reverse().map((achievement) => (
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