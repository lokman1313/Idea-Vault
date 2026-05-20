"use client";

import MyComment from "@/components/MyComment";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

const MyIntractionPage = () => {
  const { data: session } = authClient.useSession();

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    if (!session?.user?.email) return;

    try {
      setLoading(true);

      const { data: token } = await authClient.token();

      const res = await fetch(
        `https://idea-vult-backend.vercel.app/comments/user/${session.user.email}`,
        {
          headers: {
            authorization: `Bearer ${token?.token}`,
          },
        }
      );

      const data = await res.json();
      setComments(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [session?.user?.email]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-gray-500 animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-500">
          MY INTERACTIONS
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Your comments and activity history
        </p>
      </div>

      {/* Content */}
      <div className="space-y-4 sm:space-y-5">
        {comments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <h2 className="text-base sm:text-lg font-semibold text-gray-500">
              No comments found
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Start interacting to see your activity here
            </p>
          </div>
        ) : (
          comments.map((comment) => (
            <MyComment
              key={comment._id}
              comment={comment}
              fetchComments={fetchComments}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MyIntractionPage;