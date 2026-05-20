"use client";

import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaRegTrashCan } from "react-icons/fa6";

const MyCardDelete = ({ id ,refetch }) => {
  const router = useRouter();

  const handleDelete = async () => {
    const res = await fetch(`https://ideavult-backend.vercel.app/ideas/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    refetch()
    if (data.deletedCount > 0) {
      toast.success("Deleted successfully");
      router.refresh();
    }
  };

  return (
    <AlertDialog>
      <Button isIconOnly size="sm" variant="danger">
        <FaRegTrashCan size={18} />
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />

            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Delete Idea permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              <p>
                This will permanently delete{" "}
                <strong>My Awesome Idea</strong> and all of its data.
                This action cannot be undone.
              </p>
            </AlertDialog.Body>

            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>

              <Button
                slot="close"
                variant="danger"
                onClick={handleDelete}
              >
                Delete Idea
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default MyCardDelete;