"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import DeleteAlart from "./DeleteAlart";
import EditeComment from "./EditeComment";

const MyComment = ({comment,fetchComments}) => {
    const router = useRouter()
    const handelDelete = async()=>{
        const res = await fetch(`https://idea-vult-backend.vercel.app/comments/${comment._id}`,{
            method : "DELETE",
        })
         const data = await res.json();
     fetchComments()
     if (data) {
      toast.success("Comment deleted");
      router.refresh();
    }
    }
    
    return (
       <div className=" w-full p-4 rounded-2xl shadow-sm bg-gray-300/60">
        <div className="w-full flex gap-3 p-3">
             
         <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full">
           <Image
             alt="user"
             className="h-full w-full object-cover"
             width={100}
             height={100}
             src={comment.userImage}
             loading="lazy"
           />
         </div>
       
         
         <div className="flex flex-col">
           <div className="mb-1">
           <h2 className="font-semibold text-sm">{comment.name}</h2>
           <p className="text-xs font-mono text-gray-800">{comment.createdAt}</p>
           </div>
           
           <p className="text-xs font-medium ">
             {comment.comment}
           </p>
         </div>
       
       </div>
        <div className="flex gap-5">
            <EditeComment comment={comment} fetchComments={fetchComments}></EditeComment>
            <DeleteAlart handelDelete={handelDelete} ></DeleteAlart>
        </div>
       </div>
    );
};

export default MyComment;