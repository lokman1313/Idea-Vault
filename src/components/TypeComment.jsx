"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Form,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const TypeComment = ({id}) => {
   const router = useRouter()
    const { data: session } = authClient.useSession();
    const userData = session?.user;

    const handelComment = async(e)=>{
        e.preventDefault();
        if (!session?.user) {
        toast.error("Please login first");
        return;
       }
        const formData = new FormData(e.currentTarget);
        const commentData = Object.fromEntries(formData.entries());

        const allData = {
            ideaId: id,
            name : userData.name,
            userImage: userData.image,
            email : userData.email,
            comment:commentData.bio
        }
        const {data : token} =await authClient.token()
        const res = await fetch(`https://idea-vult-backend.vercel.app/comments`,{
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                authorization : `Bearer ${token?.token}`
            },
            body : JSON.stringify(allData)
        })
        const data =await res.json()
        if(data){
            toast.success("Comment added Successfully")
            router.refresh();
        }
        return data;
    }

  return (
    <div className="my-4">
      <Form onSubmit={handelComment}>
        <div className="flex flex-col gap-2 mb-3">
          
          <TextField
            isRequired
            name="bio"
            validate={(value) => {
              if (value.length < 10) {
                return "Bio must be at least 10 characters";
              }
              return null;
            }}
          >
            <Label htmlFor="textarea-rows-3">Short feedback</Label>
            <TextArea
              placeholder="Tell us about this project..."
              variant="secondary"
            />
            <Description>Minimum 10 characters</Description>
            <FieldError />
          </TextField>
        </div>

        <Button type="submit">Comment</Button>
      </Form>
    </div>
  );
};

export default TypeComment;