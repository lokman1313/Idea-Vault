import DeteisCard from "@/components/DeteisCard";
import { Button} from "@heroui/react";
import Link from "next/link";


const IdeaDeteisPage =async ({params}) => {
    const {id}=await params;
    const res = await fetch(`http://localhost:4000/ideas/${id}`)
    const idea = await res.json()
    
  
    return (
        <div className="container mx-auto my-4">
            <div className="mb-3">
        <Link href={"/ideas"}><Button >Back to Ideas →</Button></Link>
            </div>

            <DeteisCard idea={idea}></DeteisCard>
            
        </div>
    );
};

export default IdeaDeteisPage;