"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    title: "Build Your Startup Idea",
    desc: "Share and validate your ideas with the world.",
    btn: "Get Started",
    href : "/add-ideas"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    title: "Discover Trending Ideas",
    desc: "Explore what others are building right now.",
    btn: "Explore",
    href : "/ideas"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
    title: "Join Creative Minds",
    desc: "Connect with innovators and founders.",
    btn: "Join Now",
    href : "/ideas"
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full z-0 h-[80vh] overflow-hidden">

      {/* BACKGROUND IMAGE SLIDER */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[index].id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[index].image}
            alt="hero image"
            fill
            priority
            className="object-cover"
          />

          {/* overlay */}
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
      </AnimatePresence>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full  text-white px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[index].id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {slides[index].title}
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-6">
              {slides[index].desc}
            </p>
             <Link href={slides[index].href} className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:bg-blue-700 rounded-full flex justify-center items-center w-fit gap-2">
             {slides[index].btn} <FaArrowUpRightFromSquare />
             </Link>
            <button >
              
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* DOTS */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition ${
              i === index ? "bg-white" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
}