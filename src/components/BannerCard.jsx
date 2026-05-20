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
    tags,
  } = idea || {};

  const tagList =
    tags?.split(",").map((t) => t.trim()).filter(Boolean) || [];

  return (
    <MotionCard
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: "tween", duration: 0.15 }}
      className="w-[300px] h-[420px] overflow-hidden shadow-md hover:shadow-xl flex flex-col"
    >
      {/* IMAGE */}
      <div className="relative h-40 w-full overflow-hidden">
        <motion.div whileHover={{ scale: 1.06 }}>
          <Image
            src={imageUrl || "/placeholder.png"}
            alt={project || "idea"}
            width={300}
            height={160}
            className="h-full w-full object-cover"
          />
        </motion.div>

        <span className="absolute top-2 left-2 bg-black/70 text-yellow-400 text-xs px-2 py-1 rounded uppercase">
          {category}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        
        {/* Top */}
        <div className="space-y-2">
          <h2 className="text-lg font-bold line-clamp-2">
            {project}
          </h2>

          <p className="text-sm text-gray-500 line-clamp-2">
            {shortDis}
          </p>

          <div className="flex justify-between text-sm mt-2">
            <div>
              <p className="text-xs text-gray-400">Audience</p>
              <p className="font-semibold capitalize">{audience}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Price</p>
              <p className="font-semibold">${price}</p>
            </div>
          </div>

          {/* Tags */}
          {tagList.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {tagList.slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-xs text-gray-400"># No tags</span>
          )}
        </div>

        {/* Button bottom fixed */}
        <Link href={`/ideaDeteis/${_id}`}>
          <Button color="primary" fullWidth className="font-bold mt-3">
            View Details →
          </Button>
        </Link>
      </div>
    </MotionCard>
  );
};

export default IdeaCard;