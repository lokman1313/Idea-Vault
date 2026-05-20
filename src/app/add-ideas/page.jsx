"use client";

import { authClient } from "@/lib/auth-client";
import {
  FieldError,
  Input,
  Label,
  TextField,
  Select,
  ListBox,
  TextArea,
  Button,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AddIdeasPage = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const handelForm = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    if (!session?.user) {
      toast.error("You are not logged in");
      return;
    }

    const formData = new FormData(form);
    const projectData = Object.fromEntries(formData.entries());

    const allData = {
      userEmail: session.user.email,
      project: projectData.project,
      audience: projectData.audience,
      category: projectData.category,
      price: projectData.price,
      tags: projectData.tags,
      problem: projectData.problem,
      solution: projectData.solution,
      shortDis: projectData.shortDis,
      imageUrl: projectData.imageUrl,
      description: projectData.description,
    };

    const { data: token } = await authClient.token();

    const res = await fetch(
      "https://idea-vult-backend.vercel.app/ideas",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token?.token}`,
        },
        body: JSON.stringify(allData),
      }
    );

    const data = await res.json();

    if (res.ok) {
      toast.success("Your idea is successfully added");

      form.reset();        // form clear
      router.refresh();    // refresh idea list
    } else {
      toast.error(data?.message || "Something went wrong");
    }
  };

  return (
    <div className="md:w-3/5 mx-auto">
      <h1 className="text-4xl font-bold text-blue-400 my-3">
        Add Your Unic Ideas :
      </h1>

      <form onSubmit={handelForm} className="p-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Idea Title */}
          <div className="md:col-span-2">
            <TextField name="project" isRequired>
              <Label>Idea Title</Label>
              <Input placeholder="AI Study Planner App" />
              <FieldError />
            </TextField>
          </div>

          {/* Audience */}
          <TextField name="audience" isRequired>
            <Label>Target Audience</Label>
            <Input placeholder="Students, Job Holders" />
            <FieldError />
          </TextField>

          {/* Category */}
          <div>
            <Select name="category" isRequired className="w-full">
              <Label>Category</Label>
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  <ListBox.Item id="Social">Social</ListBox.Item>
                  <ListBox.Item id="Education">Education</ListBox.Item>
                  <ListBox.Item id="AI">AI</ListBox.Item>
                  <ListBox.Item id="Health">Health</ListBox.Item>
                  <ListBox.Item id="Tech">Tech</ListBox.Item>
                  <ListBox.Item id="Others">Others</ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          {/* Price */}
          <TextField name="price">
            <Label>Estimated Budget</Label>
            <Input type="number" placeholder="1299" />
            <FieldError />
          </TextField>

          {/* Tags */}
          <TextField name="tags">
            <Label>Tags</Label>
            <Input placeholder="AI, Productivity, Students" />
            <FieldError />
          </TextField>

          {/* Problem */}
          <TextField name="problem" isRequired>
            <Label>Problem Statement</Label>
            <Input placeholder="Students fail to manage time..." />
            <FieldError />
          </TextField>

          {/* Solution */}
          <TextField name="solution" isRequired>
            <Label>Solution</Label>
            <Input placeholder="AI smart scheduling system" />
            <FieldError />
          </TextField>

          {/* Short */}
          <div className="md:col-span-2">
            <TextField name="shortDis" isRequired>
              <Label>Short Description</Label>
              <Input placeholder="1/2 line idea summary" />
              <FieldError />
            </TextField>
          </div>

          {/* Image */}
          <div className="md:col-span-2">
            <TextField name="imageUrl" isRequired>
              <Label>Image URL</Label>
              <Input type="url" placeholder="https://..." />
              <FieldError />
            </TextField>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <TextField name="description" isRequired>
              <Label>Description</Label>
              <TextArea placeholder="Full idea description..." />
              <FieldError />
            </TextField>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-3">
          <Button
            type="reset"
            variant="secondary"
            className="w-full"
          >
            Clear Form
          </Button>

          <Button
            type="submit"
            className="w-full bg-cyan-500 text-white"
          >
            Add Idea
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddIdeasPage;