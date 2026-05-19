"use client"
import { authClient } from "@/lib/auth-client";
import { FieldError, Input, Label, TextField ,Select, ListBox, TextArea, Button} from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


const AddIdeasPage = () => {
  const router = useRouter()
  const { data: session } = authClient.useSession();
  
    const handelForm = async (e) => {
  e.preventDefault();

  if (!session?.user) {
    toast.error("You are not logged in");
    return;
  }

  const formData = new FormData(e.currentTarget);
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

  const res = await fetch("http://localhost:4000/ideas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(allData),
  });

  const data = await res.json();

  if (data) {
    toast.success("Your idea is successfully added");
    router.refresh();
  }
};
    return (
        <div className="md:w-3/5 mx-auto">
           <h1 className="text-4xl font-bold text-blue-400 my-3">Add Your Unic Ideas :</h1> 
           <form
            onSubmit={handelForm}
            className="p-10 space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Idea Title */}
              <div className="md:col-span-2">
                <TextField name="project" isRequired>
                  <Label>Idea Title</Label>
                  <Input placeholder="AI Study Planner App" className="rounded-2xl" />
                  <FieldError />
                </TextField>
              </div>

              {/* Target Audience */}
              <TextField name="audience" isRequired>
                <Label>Target Audience</Label>
                <Input placeholder="Student , Job-Holders , etc" className="rounded-2xl" />
                <FieldError />
              </TextField>

              {/* Category - Updated Select Component */}
              <div>
                <Select
                  name="category"
                  isRequired
                  className="w-full"
                  placeholder="Select category"
                >
                  <Label>Category</Label>
                  <Select.Trigger className="rounded-2xl">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      <ListBox.Item id="Social" textValue="Social">
                        Social
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="Education" textValue="Education">
                        Education
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="AI" textValue="AI">
                        AI
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="Health" textValue="Health">
                        Health
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="Tech" textValue="Tech">
                        Tech
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="Others" textValue="Others">
                        Others
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              {/* Estimated Budget */}
              <TextField name="price" type="number" >
                <Label>Estimated Budget</Label>
                <Input
                  type="number"
                  placeholder="1299"
                  className="rounded-2xl"
                />
                <FieldError />
              </TextField>

              {/* Tags*/}
              <TextField name="tags">
                <Label>Tags</Label>
                <Input
                  placeholder="AI, Productivity ,Students"
                  className="rounded-2xl"
                />
                <FieldError />
              </TextField>

              {/* Problem Statement */}
              <TextField name="problem" type="text" isRequired>
                <Label>Problem Statement</Label>
                <Input
                  type="text"
                  placeholder="Students fail to manage study time effectively."
                  className="rounded-2xl"
                />
                <FieldError />
              </TextField>

              {/* Proposed Solution*/}
              <TextField name="solution" isRequired>
                <Label>Proposed Solution</Label>
                <Input
                  placeholder="AI-generated smart schedules that adapt to performance"
                  className="rounded-2xl"
                />
                <FieldError />
              </TextField>

              {/* Short Description */}
              <div className="md:col-span-2">
                <TextField name="shortDis" type="text" isRequired>
                  <Label>Short Description</Label>
                  <Input type="text" placeholder="Discribe your idea in 1 or 2 line." className="rounded-2xl" />
                  <FieldError />
                </TextField>
              </div>

              {/* Image URL - Removed preview */}
              <div className="md:col-span-2">
                <TextField name="imageUrl" isRequired>
                  <Label>Image URL</Label>
                  <Input
                    type="url"
                    placeholder="https://example.com/bali-paradise.jpg"
                    className="rounded-2xl"
                  />
                  <FieldError />
                </TextField>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <TextField name="description" isRequired>
                  <Label>Description</Label>
                  <TextArea
                    placeholder="Describe the idea in deteils..."
                    className="rounded-3xl"
                  />
                  <FieldError />
                </TextField>
              </div>
            </div>

            {/* Buttons */}

            <Button
              type="submit"
              variant="outline"
              className=" rounded-none w-full bg-cyan-500 text-white"
            >
             Add Your Idea
            </Button>
          </form>
        </div>
    );
};

export default AddIdeasPage;