"use client";

import { FaRocket, FaLightbulb, FaUsers } from "react-icons/fa";

const AboutSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">
          About Our Platform
        </h1>
        <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
          A smart idea-sharing platform where innovation meets collaboration.
          Build, share, and grow your ideas with the community.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="p-6 rounded-2xl shadow-md border hover:shadow-lg transition">
          <FaLightbulb className="text-3xl text-yellow-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Innovative Ideas</h2>
          <p className="text-gray-600">
            Share your creative ideas and explore solutions built by others
            across different domains like Health, Education, and Tech.
          </p>
        </div>

        {/* Card 2 */}
        <div className="p-6 rounded-2xl shadow-md border hover:shadow-lg transition">
          <FaUsers className="text-3xl text-blue-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Community Driven</h2>
          <p className="text-gray-600">
            Connect with like-minded people, comment on ideas, and grow
            together through collaboration and feedback.
          </p>
        </div>

        {/* Card 3 */}
        <div className="p-6 rounded-2xl shadow-md border hover:shadow-lg transition">
          <FaRocket className="text-3xl text-red-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Fast & Scalable</h2>
          <p className="text-gray-600">
            Built with modern technologies like Next.js and Node.js for fast,
            secure, and scalable performance.
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center mt-16">
        <p className="text-gray-600 max-w-3xl mx-auto">
          Our mission is to empower individuals to turn ideas into reality by
          providing a simple, powerful, and collaborative platform for
          innovation.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;