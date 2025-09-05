import React from 'react';
import { FaGlobe, FaBullseye, FaNetworkWired, FaTools, FaBook, FaBriefcase } from 'react-icons/fa';

const About = () => {
    return (
        <section id="about" className="py-20 px-4 md:px-8 bg-gray-50">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-ieee-blue">Discover IEEE</h2>
                    <p className="text-lg text-gray-600 mt-2">Learn more about the organization and our student branch.</p>
                </div>

                {/* What is IEEE & Mission/Vision Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {/* What is IEEE Card */}
                    <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-ieee-blue">
                        <div className="flex items-center gap-4 mb-3">
                            <FaGlobe className="text-4xl text-ieee-blue" />
                            <h3 className="text-2xl font-semibold text-gray-800">What is IEEE?</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            IEEE is the world’s largest technical professional organization dedicated to advancing technology for the benefit of humanity. IEEE and its members inspire a global community through its highly cited publications, conferences, technology standards, and professional and educational activities.
                        </p>
                    </div>
                    
                    {/* Mission & Vision Card */}
                    <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-ieee-blue">
                        <div className="flex items-center gap-4 mb-3">
                            <FaBullseye className="text-4xl text-ieee-blue" />
                            <h3 className="text-2xl font-semibold text-gray-800">Mission & Vision</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            IEEE's core purpose is to foster technological innovation and excellence for the benefit of humanity. Its Vision is to be essential to the global technical community and to technical professionals everywhere, and be universally recognized for its contributions in improving global conditions.
                        </p>
                    </div>
                </div>

                {/* Our History Section */}
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 items-center mb-16">
                    <div>
                        <h3 className="text-3xl font-bold text-ieee-blue mb-4">Our History</h3>
                        <p className="text-gray-700 leading-relaxed text-justify">
                            Established in 2020, the PACE IEEE Student Branch has quickly grown into a hub of technical excellence on campus. Since our inception, our dedication has been consistently recognized with prestigious honors, including the "Outstanding Medium Student Branch" award, the "Most Promising Chapter" award by IEEE CEDA, and rankings among the top 10 in Karnataka for both event organization and the number of society chapters. Our commitment to community impact is highlighted by securing over $10,000 in grants. This culture of excellence extends to our members and faculty, who have earned numerous scholarships and prestigious awards for their outstanding individual contributions to the field.
                        </p>
                    </div>
                </div>

                {/* Why Join Us Section */}
                <div>
                    <h3 className="text-3xl font-bold text-center text-ieee-blue mb-10">Why Join Us?</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <FaNetworkWired className="text-4xl text-ieee-blue mx-auto mb-3" />
                            <h4 className="text-lg font-semibold text-gray-800">Global Network</h4>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <FaTools className="text-4xl text-ieee-blue mx-auto mb-3" />
                            <h4 className="text-lg font-semibold text-gray-800">Skill Development</h4>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <FaBook className="text-4xl text-ieee-blue mx-auto mb-3" />
                            <h4 className="text-lg font-semibold text-gray-800">Exclusive Resources</h4>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <FaBriefcase className="text-4xl text-ieee-blue mx-auto mb-3" />
                            <h4 className="text-lg font-semibold text-gray-800">Career Opportunities</h4>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;