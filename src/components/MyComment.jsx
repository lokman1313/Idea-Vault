"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import DeleteAlart from "./DeleteAlart";
import EditeComment from "./EditeComment";

const MyComment = ({ comment, fetchComments }) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `https://idea-vult-backend.vercel.app/comments/${comment._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Comment deleted");
        fetchComments?.();
        router.refresh();
      } else {
        toast.error(data?.message || "Failed to delete comment");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full rounded-2xl bg-gray-100/70 p-4 sm:p-5 shadow-sm hover:shadow-md transition">
      <div className="flex gap-3 sm:gap-4">
        {/* Avatar */}
        <div className="h-11 w-11 sm:h-12 sm:w-12 shrink-0 overflow-hidden rounded-full border">
          <Image
            alt="user"
            src={comment.userImage || "/avatar.png"}
            width={100}
            height={100}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <h2 className="font-semibold text-sm sm:text-base">
              {comment.name}
            </h2>
            <span className="text-[10px] sm:text-xs text-gray-500 font-mono">
              {comment.createdAt}
            </span>
          </div>

          <p className="mt-1 text-xs sm:text-sm text-gray-700 leading-relaxed break-words">
            {comment.comment}
          </p>

          {/* Actions */}
          <div className="mt-3 flex items-center gap-3">
            <EditeComment comment={comment} fetchComments={fetchComments} />
            <DeleteAlart handelDelete={handleDelete} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyComment;