"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BannerCard from "./BannerCard";

const MarqueeIdeas = () => {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://idea-vult-backend.vercel.app/hero");
      const data = await res.json();
      setIdeas(data);
    };

    fetchData();
  }, []);

  return (
    <section className="w-full py-16 bg-transparent">
      {/* Header */}
      <div className="text-center mb-12 px-4">
        <h2 className="text-3xl md:text-4xl font-bold">
          🔥 Trending Ideas
        </h2>

        <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
          Explore the most popular and innovative ideas shared by our community.
          Discover new opportunities, insights, and creativity in one place.
        </p>
      </div>

      {/* Marquee */}
      <div className="overflow-hidden w-full">
        <motion.div
          className="flex gap-8 w-max items-stretch"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {/* First Loop */}
          <div className="flex gap-8 py-4">
            {ideas.map((idea) => (
              <div key={idea._id} className="w-[300px] shrink-0">
                <motion.div
                  whileHover={{ scale: 1.03, y: -6 }}
                  transition={{
                    type: "spring",
                    stiffness: 180,
                    damping: 18,
                  }}
                  className="h-full"
                >
                  <BannerCard idea={idea} />
                </motion.div>
              </div>
            ))}
          </div>

          {/* Clone Loop */}
          <div className="flex gap-8 py-4">
            {ideas.map((idea) => (
              <div key={`${idea._id}-clone`} className="w-[300px] shrink-0">
                <motion.div
                  whileHover={{ scale: 1.03, y: -6 }}
                  transition={{
                    type: "spring",
                    stiffness: 180,
                    damping: 18,
                  }}
                  className="h-full"
                >
                  <BannerCard idea={idea} />
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MarqueeIdeas;