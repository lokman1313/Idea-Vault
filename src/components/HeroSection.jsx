"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import IdeaCard from "./IdeaCard";
import BannerCard from "./BannerCard";

const MarqueeIdeas = () => {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:4000/hero");
      const data = await res.json();
      setIdeas(data);
    };

    fetchData();
  }, []);

  return (
    <section className="w-full py-14 bg-transparent">
      
   
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">
          🔥 Trending Ideas
        </h2>

        <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
          Explore the most popular and innovative ideas shared by our community.
          Discover new opportunities, insights, and creativity in one place.
        </p>
      </div>

      
      <div className="overflow-hidden w-full">

        <motion.div
          className="flex gap-6 w-max items-stretch"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 40, 
            ease: "linear",
            repeat: Infinity,
          }}
        >

          
          <div className="flex gap-6">
            {ideas.map((idea) => (
              <div key={idea._id} className="w-[300px] shrink-0">
                <motion.div
                  whileHover={{
                    scale: 1.03,
                    y: -6,
                  }}
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

          
          <div className="flex gap-6">
            {ideas.map((idea) => (
              <div key={`${idea._id}-clone`} className="w-[300px] shrink-0">
                <motion.div
                  whileHover={{
                    scale: 1.03,
                    y: -6,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 180,
                    damping: 18,
                  }}
                  className="h-5xl"
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