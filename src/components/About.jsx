const About = () => {
    return (
        <section className="py-16 px-4 md:px-8">
            <div className="container mx-auto">
                <h2 className="text-4xl font-bold text-center text-ieee-blue mb-12">Discover IEEE</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-2xl font-semibold text-ieee-blue mb-3">What is IEEE?</h3>
                        <p className="text-gray-700 leading-relaxed">
                            IEEE, the Institute of Electrical and Electronics Engineers, is the world's largest technical professional organization dedicated to advancing technology for the benefit of humanity.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold text-ieee-blue mb-3">Mission & Vision</h3>
                        <p className="text-gray-700 leading-relaxed">
                            IEEE's core purpose is to foster technological innovation and excellence. Its vision is to be essential to the global technical community and to be universally recognized for its contributions.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold text-ieee-blue mb-3">Our History</h3>
                        <p className="text-gray-700 leading-relaxed">
                            The PACE IEEE Student Branch was established in 2018 with the goal of creating a vibrant technical community on campus and providing a platform for students to grow.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold text-ieee-blue mb-3">Why Join Us?</h3>
                        <p className="text-gray-700 leading-relaxed">
                            Joining our student branch gives you access to a global network, exclusive resources, workshops, technical talks, and the chance to work on impactful projects with like-minded peers.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;