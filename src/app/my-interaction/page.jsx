"use client"

import DeteilsComment from "@/components/DeteilsComment";
import MyComment from "@/components/MyComment";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";


const MyIntractionPage = () => {
    const { data: session } = authClient.useSession();
      
      const [comments, setComments] = useState([]);
      const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        if (!session?.user?.email) return;
    
        const fetchIdeas = async () => {
          try {
            const res = await fetch(
              `http://localhost:4000/comments/user/${session.user.email}`
            );
    
            const data = await res.json();
            setComments(data);
          } catch (error) {
            console.error(error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchIdeas();
      }, [session]);
    
      if (loading) {
        return <p>Loading...</p>;
      }
    
    return (
        <div className="container mx-auto">
            <h1 className="text-3xl text-blue-400 font-bold my-6">MY INTERACTIONS</h1>

            <div className="space-y-3 w-7xl mx-auto">
                {
                    comments.map(comment => <MyComment key={comment._id} comment={comment}></MyComment>)
                }
            </div>
        </div>
    );
};

export default MyIntractionPage;