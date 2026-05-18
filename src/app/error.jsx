"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center space-y-4">
        
        <h1 className="text-5xl font-bold text-red-500">Oops!</h1>

        <h2 className="text-xl font-semibold text-foreground">
          Something went wrong
        </h2>

        <p className="text-sm text-muted-foreground">
          An unexpected error occurred. Please try again.
        </p>

        <button
          onClick={() => reset()}
          className="rounded-lg bg-black px-5 py-2 text-white hover:opacity-80"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}