import DeteilsComment from "@/components/DeteilsComment";
import DeteisCard from "@/components/DeteisCard";
import TypeComment from "@/components/TypeComment";
import { Button, ScrollShadow} from "@heroui/react";
import Link from "next/link";

export const metadata = {
  title: "Idea | Deteils",
  description: "Welcome to my website",
}

const IdeaDeteisPage =async ({params}) => {
    const {id}=await params;
    const res = await fetch(`http://localhost:4000/ideas/${id}`)
    const idea = await res.json()
    
    const comRes =await fetch(`http://localhost:4000/comments/${id}`)
    const comments = await comRes.json()

    return (
        <div className="container mx-auto my-4 ">
            <div className="mb-3">
        <Link href={"/ideas"}><Button >Back to Ideas →</Button></Link>
            </div>

            <DeteisCard idea={idea}></DeteisCard>
            <div className="my-4 shadow-sm">
              <p className="text-sm font-semibold">All Feedback</p>
              <ScrollShadow className="max-h-[240px] p-4">
        <div className="space-y-4">
          {
            comments.map(comment => <DeteilsComment key={comment._id} comment={comment}></DeteilsComment>)
          }
        </div>
      </ScrollShadow>
            </div>
            <TypeComment id={id}></TypeComment>
        </div>
    );
};

export default IdeaDeteisPage;