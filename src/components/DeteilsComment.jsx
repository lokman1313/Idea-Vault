
import Image from "next/image";


const DeteilsComment = ({comment}) => {
    return (
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
    <h2 className="font-medium text-sm">{comment.name}</h2>
    <p className="text-xs text-gray-500">{comment.createdAt}</p>
    </div>
    
    <p className="text-xs text-gray-500">
      {comment.comment}
    </p>
  </div>

</div>
    );
};

export default DeteilsComment;