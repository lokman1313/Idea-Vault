"use client";

import { Card, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import MyCardEdite from "./MyCardEdite";
import MyCardDelete from "./MyCardDelete";

const MotionCard = motion(Card);

const MyIdeaCard = ({idea , refetch}) => {
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
      whileTap={{ scale: 0.99 }}
      transition={{
        type: "tween",
        duration: 0.15,
        ease: "easeOut",
      }}
      className="max-w-sm w-full overflow-hidden shadow-md hover:shadow-xl"
    >
        <div className="flex justify-between">
            <MyCardEdite idea={idea} refetch={refetch}></MyCardEdite>
            <MyCardDelete id ={_id} refetch={refetch}></MyCardDelete>
        </div>
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="h-full w-full"
        >
          <Image
            src={imageUrl || "/placeholder.png"}
            alt={project || "idea"}
            width={200}
            height={200}
            className="h-full w-full object-cover"
          />
        </motion.div>

        <span className="absolute top-3 left-3 bg-black/70 text-yellow-400 text-xs px-2 py-1 rounded uppercase">
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <Card.Header className="gap-1 pr-8">
          <Card.Title className="text-lg font-bold line-clamp-2">
            {project}
          </Card.Title>

          <Card.Description className="text-sm text-default-500 line-clamp-2">
            {shortDis}
          </Card.Description>
        </Card.Header>

        <div className="flex items-center gap-6 text-sm mt-2">
          <div>
            <p className="text-xs text-default-400 uppercase">Audience</p>
            <p className="font-semibold capitalize">{audience}</p>
          </div>

          <div>
            <p className="text-xs text-default-400 uppercase">Price</p>
            <p className="font-semibold">
              ${Number(price || 0).toLocaleString()}
            </p>
          </div>
        </div>

        {tagList.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {tagList.map((tag, i) => (
              <span
                key={i}
                className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        ) : (<h2 className="text-xs bg-blue-100 text-blue-600 px-2 py-1 w-fit rounded"># No tags</h2>)}

        <Card.Footer>
          <Link href={`/ideaDeteis/${_id}`}>
          <Button
            color="primary"
            fullWidth
            className="font-bold"
          >
            View Details →
          </Button></Link>
        </Card.Footer>
      </div>
    </MotionCard>
    );
};

export default MyIdeaCard;