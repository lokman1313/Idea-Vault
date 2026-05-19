import { Button, Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";


const IdeaDeteisPage =async ({params}) => {
    const {id}=await params;
    const res = await fetch(`http://localhost:4000/ideas/${id}`)
    const idea = await res.json()
    const {
    destinationName,
    category,
    audience,
    price,
    shortDis,
    imageUrl,
    tags,
    problem,
    solution,
    description,
  } = idea
  const tagList =
    tags?.split(",").map((t) => t.trim()).filter(Boolean) || [];
    return (
        <div className="container mx-auto my-4">
            <div className="mb-3">
        <Link href={"/ideas"}><Button >Back to Ideas →</Button></Link>
            </div>
            
            <Card className="overflow-hidden shadow-lg border border-default-100">
       
        <div className="relative h-64 md:h-96 w-full overflow-hidden bg-default-100">
          <Image
            src={imageUrl || "/placeholder.png"}
            alt={destinationName || "Idea Image"}
            fill
            priority
            className="object-cover"
          />
         
          <span className="absolute top-4 left-4 bg-black/75 text-yellow-400 text-xs md:text-sm font-bold px-3 py-1.5 rounded uppercase tracking-wider">
            {category}
          </span>
        </div>

      
        <div className="p-6 md:p-10 space-y-8">
          
      
          <div className="space-y-3 border-b border-default-100 pb-6">
            <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground">
              {destinationName}
            </h1>
            <p className="text-lg text-default-500 italic">
              {shortDis}
            </p>
          </div>

          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-default-50 p-4 rounded-xl border border-default-100">
            <div>
              <p className="text-xs text-default-400 uppercase font-semibold tracking-wider">Audience</p>
              <p className="font-bold text-base md:text-lg text-foreground capitalize mt-1">{audience}</p>
            </div>
            <div>
              <p className="text-xs text-default-400 uppercase font-semibold tracking-wider">Estimated Price</p>
              <p className="font-bold text-base md:text-lg text-primary mt-1">
                ${Number(price || 0).toLocaleString()}
              </p>
            </div>
          </div>

         
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-danger-50/50 p-5 rounded-xl border border-danger-100">
              <h3 className="text-danger font-bold text-lg mb-2 flex items-center gap-2">
                ⚠️ The Problem
              </h3>
              <p className="text-default-700 text-sm md:text-base leading-relaxed">
                {problem}
              </p>
            </div>

            <div className="bg-success-50/50 p-5 rounded-xl border border-success-100">
              <h3 className="text-success font-bold text-lg mb-2 flex items-center gap-2">
                💡 The Solution
              </h3>
              <p className="text-default-700 text-sm md:text-base leading-relaxed">
                {solution}
              </p>
            </div>
          </div>

          
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-foreground">Project Description</h3>
            <p className="text-default-600 text-sm md:text-base leading-relaxed text-justify">
              {description}
            </p>
          </div>

          
          <div className="border-t border-default-100 pt-6">
            <p className="text-xs text-default-400 uppercase font-semibold tracking-wider mb-3">Tags</p>
            {tagList.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {tagList.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs md:text-sm bg-blue-50 text-blue-600 font-medium px-3 py-1 rounded-full border border-blue-100"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-xs bg-default-100 text-default-500 px-2 py-1 rounded"># No tags</span>
            )}
          </div>

        </div>
      </Card>
        </div>
    );
};

export default IdeaDeteisPage;