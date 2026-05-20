"use client"
import { Button, Input } from "@heroui/react";
import { useState } from "react";

export default function FilterBar({handleFilter}) {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  return (
    <div className="sm:flex gap-4 ">
        <div className="flex justify-between gap-4 w-full">

      <Input
        type="text"
        className="w-full"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button  onClick={() => handleFilter(search, category)}>Search</Button>
        </div>

      <select
  value={category}
  onChange={(e) => {
    const value = e.target.value;
    setCategory(value);
    handleFilter(search, value);
  }}
  className="border rounded-md px-3 py-2"
>
  <option value="">All Categories</option>
  <option value="Social">Social</option>
  <option value="Education">Education</option>
  <option value="AI">AI</option>
  <option value="Health">Health</option>
  <option value="Tech">Tech</option>
  <option value="Others">Others</option>
</select>


    </div>
  );
}