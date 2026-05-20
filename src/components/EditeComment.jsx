"use client";

import {
  Button,
  Input,
  Label,
  Modal,
  Surface,
  TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { CiEdit } from "react-icons/ci";
import toast from "react-hot-toast";

const EditComment = ({ comment ,fetchComments}) => {
  const router = useRouter();

  const handleEdit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const updatedData = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(
        `https://idea-vult-backend.vercel.app/comments/${comment._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        },{cache: "no-store"}
      );

      const data = await res.json();
      fetchComments()
      if (data.modifiedCount > 0) {
        toast.success("Comment updated successfully");
        router.refresh();
      } else {
        toast.error("No changes were made");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update comment");
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
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <CiEdit />
              </Modal.Icon>

              <div>
                <h2 className="text-lg font-semibold">Edit Comment</h2>
                <p className="text-sm text-default-500">
                  Update your comment and save the changes.
                </p>
              </div>
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface variant="default">
                <form onSubmit={handleEdit} className="flex flex-col gap-4">
                  <TextField
                    className="w-full"
                    name="comment"
                    defaultValue={comment.comment}
                    isRequired
                  >
                    <Label>Comment</Label>
                    <Input
                      
                      placeholder="Write your comment"
                    />
                  </TextField>

                  <Modal.Footer>
                    <Button slot="close" variant="secondary">
                      Cancel
                    </Button>

                    <Button slot="close" type="submit">
                      Update Comment
                    </Button>
                  </Modal.Footer>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default EditComment;