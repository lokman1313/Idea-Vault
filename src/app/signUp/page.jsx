"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  Separator,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { FaCheck, FaGoogle } from "react-icons/fa6";

const SignInPage = () => {
  const router = useRouter();
  const redirectPath = useSearchParams().get("redirect") || "/";

  const signIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: redirectPath,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    const { name, email, password, image } = userData;

    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
      image,
      callbackURL: "/",
    });

    if (data) {
      toast.success("Account created successfully");
      router.push(redirectPath);
    } else {
      toast.error(error?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-100">
      <div className="w-full max-w-md sm:max-w-lg bg-gray-400 rounded-3xl py-10 sm:py-14 px-5 sm:px-10 shadow-lg">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Create Account
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Sign up to start using the platform
          </p>
        </div>

        {/* Form */}
        <Form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
          
          {/* Name */}
          <TextField
            isRequired
            name="name"
            validate={(value) => {
              if (value.length < 3) {
                return "Name must be at least 3 characters";
              }
              return null;
            }}
          >
            <Label>Name</Label>
            <Input placeholder="Enter Your Name" />
            <FieldError />
          </TextField>

          {/* Image */}
          <TextField isRequired name="image" type="url">
            <Label>Image URL</Label>
            <Input placeholder="https://example.com/image.jpg" />
            <FieldError />
          </TextField>

          {/* Email */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
              ) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>

          {/* Password */}
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
            <Description>
              Must be 8+ chars with 1 uppercase & 1 number
            </Description>
            <FieldError />
          </TextField>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-2">
            <Button type="submit" className="w-full sm:w-auto">
              <FaCheck />
              Submit
            </Button>

            <Button
              type="reset"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              Reset
            </Button>
          </div>
        </Form>

        <Separator className="my-5" />

        <Button
          variant="secondary"
          className="w-full flex items-center justify-center gap-2 my-3"
          onClick={signIn}
        >
          <FaGoogle />
          Continue with Google
        </Button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <span className="text-blue-500 text-base">
            <Link href={"/login"}>Login</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;