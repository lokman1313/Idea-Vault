"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { FaRegEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import { useState } from "react";

const UpdateProfile = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const { name, image } = Object.fromEntries(formData.entries());

    try {
      await authClient.updateUser({
        name,
        image,
      });

      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal>
      <Button variant="tertiary">
        <FaRegEdit className="mr-1" />
        Edit Profile
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <FaRegEdit />
              </Modal.Icon>
              <Modal.Heading>Update Profile</Modal.Heading>
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface className="p-4 rounded-xl">
                <form onSubmit={onSubmit} className="space-y-4">
                  <TextField name="name" isRequired>
                    <Label>Name</Label>
                    <Input placeholder="Enter your name" />
                  </TextField>

                  <TextField name="image" isRequired>
                    <Label>Image URL</Label>
                    <Input placeholder="Enter image URL" />
                  </TextField>

                  <Button type="submit" className="w-full" isDisabled={loading}>
                    {loading ? "Updating..." : "Update Profile"}
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

export default UpdateProfile;