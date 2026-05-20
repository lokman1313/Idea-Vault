"use client";

import MyIdeaCard from "@/components/MyIdeaCard";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

const MyIdeasPage = () => {
  const { data: session } = authClient.useSession();
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchIdeas = async () => {
  const {data : token} =await authClient.token()
      try {
        const res = await fetch(
          `https://idea-vult-backend.vercel.app/ideas/user/${session.user.email}`,{
            headers : {
            authorization : `Bearer ${token?.token}`
         }
          }
        );

        const data = await res.json();
        setIdeas(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  useEffect(() => {
    if (!session?.user?.email) return;

    

    fetchIdeas();
  }, [session]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">My Ideas :</h1>

      {ideas.length === 0 ? (
        <div className="text-center py-10">
          <h2 className="text-xl font-semibold">
            Please add an idea first
          </h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {ideas.map((idea) => (
            <MyIdeaCard key={idea._id} refetch={fetchIdeas} idea={idea} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyIdeasPage;