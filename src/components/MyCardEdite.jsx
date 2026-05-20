"use client";

import {
  Button,
  FieldError,
  Input,
  Label,
  ListBox,
  Modal,
  Select,
  Surface,
  TextArea,
  TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CiEdit } from "react-icons/ci";

const categories = [
  "Social",
  "Education",
  "AI",
  "Health",
  "Tech",
  "Others",
];

const MyCardEdite = ({idea,refetch}) => {
    const router = useRouter()
    const {
    _id,
    project,
    category,
    audience,
    price,
    problem,
    shortDis,
    solution,
    imageUrl,
    tags,
    description
  } = idea
  const handelForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const projectData = Object.fromEntries(formData.entries());
    const res = await fetch(`http://localhost:4000/ideas/${_id}`,{
        method : "PATCH",
        headers : {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(projectData)
    })
    const data = await res.json()
    refetch()
    if(data){
        toast.success("Edite Successfully");
        router.refresh();
    }
  };

  return (
    <Modal>
      <Modal.Trigger>
        <Button isIconOnly size="sm" variant="secondary">
          <CiEdit size={18} />
        </Button>
      </Modal.Trigger>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-3xl">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <CiEdit />
              </Modal.Icon>

              <div>
                <h2 className="text-lg font-semibold">Edit Idea</h2>
                <p className="text-sm text-default-500">
                  Update your idea information and save changes.
                </p>
              </div>
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface variant="default">
                <form onSubmit={handelForm} className="space-y-8">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="md:col-span-2">
                      <TextField name="project" defaultValue={project}>
                        <Label>Idea Title</Label>
                        <Input
                          placeholder="AI Study Planner App"
                          className="rounded-2xl"
                        />
                        <FieldError />
                      </TextField>
                    </div>

                    <TextField name="audience" defaultValue={audience}>
                      <Label>Target Audience</Label>
                      <Input
                        placeholder="Students, Job Holders, etc."
                        className="rounded-2xl"
                      />
                      <FieldError />
                    </TextField>

                    <Select
                      name="category"
                      defaultValue={category}
                      placeholder="Select category"
                      className="w-full"
                    >
                      <Label>Category</Label>

                      <Select.Trigger className="rounded-2xl">
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>

                      <Select.Popover>
                        <ListBox>
                          {categories.map((category) => (
                            <ListBox.Item
                              key={category}
                              id={category}
                              textValue={category}
                            >
                              {category}
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>

                    <TextField name="price" type="number" defaultValue={price}>
                      <Label>Estimated Budget</Label>
                      <Input
                        type="number"
                        placeholder="1299"
                        className="rounded-2xl"
                      />
                      <FieldError />
                    </TextField>

                    <TextField name="tags" defaultValue={tags}>
                      <Label>Tags</Label>
                      <Input
                        placeholder="AI, Productivity, Students"
                        className="rounded-2xl"
                      />
                      <FieldError />
                    </TextField>

                    <TextField name="problem" defaultValue={problem}>
                      <Label>Problem Statement</Label>
                      <Input
                        placeholder="Students fail to manage study time effectively."
                        className="rounded-2xl"
                      />
                      <FieldError />
                    </TextField>

                    <TextField name="solution" defaultValue={solution}>
                      <Label>Proposed Solution</Label>
                      <Input
                        placeholder="AI-generated smart schedules that adapt to performance"
                        className="rounded-2xl"
                      />
                      <FieldError />
                    </TextField>

                    <div className="md:col-span-2">
                      <TextField name="shortDis" defaultValue={shortDis}>
                        <Label>Short Description</Label>
                        <Input
                          placeholder="Describe your idea in 1 or 2 lines."
                          className="rounded-2xl"
                        />
                        <FieldError />
                      </TextField>
                    </div>

                    <div className="md:col-span-2">
                      <TextField name="imageUrl" defaultValue={imageUrl}>
                        <Label>Image URL</Label>
                        <Input
                          type="url"
                          placeholder="https://example.com/image.jpg"
                          className="rounded-2xl"
                        />
                        <FieldError />
                      </TextField>
                    </div>

                    <div className="md:col-span-2">
                      <TextField name="description" defaultValue={description}>
                        <Label>Description</Label>
                        <TextArea
                          placeholder="Describe the idea in details..."
                          className="rounded-3xl"
                        />
                        <FieldError />
                      </TextField>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    slot="close"
                    variant="outline"
                    className="w-full rounded-none bg-cyan-500 text-white"
                  >
                    Update Idea
                  </Button>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default MyCardEdite;