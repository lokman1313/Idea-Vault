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
import { useSearchParams } from "next/navigation";
import { FaCheck, FaGoogle } from "react-icons/fa6";
import toast from "react-hot-toast";

const LoginPage = () => {
  const redirectPath = useSearchParams().get("redirect") || "/";

  const signIn = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: redirectPath,
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
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-100">
      <div className="w-full max-w-md sm:max-w-lg bg-gray-400 py-10 sm:py-14 px-5 sm:px-10 rounded-3xl shadow-lg">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Welcome Back User
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Login to continue your journey
          </p>
        </div>

        {/* Form */}
        <Form className="flex my-4 w-full flex-col gap-4" onSubmit={onSubmit}>
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
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>
            <FieldError />
          </TextField>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-2">
            <Button type="submit" className="w-full sm:w-auto">
              <FaCheck />
              Submit
            </Button>

            <Button type="reset" variant="secondary" className="w-full sm:w-auto">
              Reset
            </Button>
          </div>

          <Link href={"/forgetPass"}>
            <p className="text-gray-600 text-sm hover:text-gray-800">
              Forget Password ?
            </p>
          </Link>
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
          Don&apos;t have any account?{" "}
          <span className="text-blue-500 text-base">
            <Link href={"/signUp"}>Sign Up</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;