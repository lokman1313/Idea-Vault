"use client";

import { Card, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const MotionCard = motion(Card);

const IdeaCard = ({ idea }) => {
  const {
    _id,
    project,
    category,
    audience,
    price,
    shortDis,
    imageUrl,
  } = idea || {};

  return (
    <MotionCard
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: "tween", duration: 0.15 }}
      className="w-[300px] h-[420px] overflow-hidden shadow-md hover:shadow-xl flex flex-col rounded-2xl"
    >
      {/* IMAGE */}
      <div className="relative w-full h-44 overflow-hidden">
        <motion.div whileHover={{ scale: 1.05 }}>
          <Image
            src={imageUrl || "/placeholder.png"}
            alt={project || "idea"}
            fill
            className="object-cover"
          />
        </motion.div>

        <span className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md uppercase tracking-wide">
          {category}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        {/* TOP */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold leading-snug line-clamp-2">
            {project}
          </h2>

          <p className="text-sm text-gray-500 line-clamp-3">
            {shortDis}
          </p>

          <div className="flex justify-between text-sm pt-2 border-t border-gray-100">
            <div>
              <p className="text-xs text-gray-400">Audience</p>
              <p className="font-semibold capitalize">{audience}</p>
            </div>

            <div className="text-right">
              <p className="text-xs text-gray-400">Price</p>
              <p className="font-semibold">${price}</p>
            </div>
          </div>
        </div>

        {/* BUTTON */}
        <Link href={`/ideaDeteis/${_id}`}>
          <Button color="primary" fullWidth className="mt-4 font-semibold">
            View Details →
          </Button>
        </Link>
      </div>
    </MotionCard>
  );
};

export default IdeaCard;