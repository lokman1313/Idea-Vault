import IdeaCard from "@/components/IdeaCard";


const IdeasPage = async () => {
    const res = await fetch(`http://localhost:4000/ideas`)
    const data = await res.json()
    return (
        <div className="max-w-7xl mx-auto px-4 py-10"> 
            <h1 className="text-3xl font-bold mb-6">ideas</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                {
                    data.map(idea=><IdeaCard key={idea._id} idea={idea}></IdeaCard>)
                }
            </div>
        </div>
    );
};

export default IdeasPage;