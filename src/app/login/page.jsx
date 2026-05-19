"use client";

import { authClient } from "@/lib/auth-client";
import {Button, Description, FieldError, Form, Input, Label, Separator, TextField} from "@heroui/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaCheck, FaGoogle } from "react-icons/fa6";

const LoginPage = () => {
const redirectPath = useSearchParams().get("redirect") || "/"

  const signIn = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: redirectPath
    });
    if (error) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(formData.entries());

    const { error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: redirectPath,
    });

    if (error) {
      toast.error(error?.message || "Something went wrong");
    }
  };
    return (
        <div className="container mx-auto flex items-center justify-center my-10">
            <div className="bg-gray-400 py-20 md:px-15 px-5 rounded-4xl">
            <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Welcome Back User
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Login to continue your journey
          </p>
        </div>

            <Form className="flex my-4 w-96 flex-col gap-4" onSubmit={onSubmit}>
      <TextField
        isRequired
        name="email"
        type="email"
        validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "Please enter a valid email address";
          }
          return null;
        }}
      >
        <Label>Email</Label>
        <Input placeholder="john@example.com" />
        <FieldError />
      </TextField>
      <TextField
        isRequired
        minLength={8}
        name="password"
        type="password"
        validate={(value) => {
          if (value.length < 8) {
            return "Password must be at least 8 characters";
          }
          if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one uppercase letter";
          }
          if (!/[0-9]/.test(value)) {
            return "Password must contain at least one number";
          }
          return null;
        }}
      >
        <Label>Password</Label>
        <Input placeholder="Enter your password" />
        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
        <FieldError />
      </TextField>
      <div className="flex gap-2">
        <Button type="submit">
          <FaCheck />
          Submit
        </Button>
        <Button type="reset" variant="secondary">
          Reset
        </Button>
      </div>
      <Link href={"/forgetPass"}><p className="text-gray-500">Forget Password ?</p></Link>
            </Form>
            <Separator />

            <Button variant="secondary" className="w-full flex items-center justify-center gap-2 my-3"
            onClick={signIn}>
              <FaGoogle />
              Continue with Google
            </Button>
            <p className="text-center ">
                Do'nt have any account? <span className="text-lg text-blue-400"><Link href={'/signUp'}>Sign Up</Link></span>
            </p>
            </div>
        </div>
    );
};

export default LoginPage;