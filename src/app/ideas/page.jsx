"use client"
import FilterBar from "@/components/FilterBar";
import IdeaCard from "@/components/IdeaCard";
import { useEffect, useState } from "react";


const IdeasPage =() => {

  const [data, setData] = useState([]);

  const fetchFilter = async(searchValue = "", categoryValue = "") =>{
      const res = await fetch(`https://idea-vult-backend.vercel.app/ideas?search=${searchValue}&category=${categoryValue}`)
      const result = await res.json()
      setData(result)
  }
  useEffect(()=>{
    fetchFilter();
  },[])
  const handleFilter = (searchValue, categoryValue) => {
    fetchFilter(searchValue, categoryValue);
  };
    return (
        <div className="max-w-7xl mx-auto px-4 py-10"> 
        <div className="mb-4">
            <FilterBar handleFilter={handleFilter}></FilterBar>
        </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                {
                    data.map(idea=><IdeaCard key={idea._id} idea={idea}></IdeaCard>)
                }
            </div>
        </div>
    );
};

export default IdeasPage;