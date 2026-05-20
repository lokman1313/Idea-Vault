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
     const {data : token} =await authClient.token()

      const res = await fetch(
        `https://ideavult-backend.vercel.app/comments/user/${session.user.email}`,{
          headers : {
            authorization : `Bearer ${token?.token}`
          }
        }
      );

      const data = await res.json();
      setComments(data);
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
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl text-blue-400 font-bold my-6">
        MY INTERACTIONS
      </h1>

      <div className="space-y-3 w-7xl mx-auto">
        {comments.length === 0 ? (
          <div className="text-center py-10">
            <h2 className="text-xl font-semibold text-gray-500">
              No comments found. Please add some interactions.
            </h2>
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