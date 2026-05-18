import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center space-y-4">
        
        <h1 className="text-6xl font-bold text-foreground text-red-700">404</h1>

        <h2 className="text-xl font-semibold text-foreground ">
          Page Not Found
        </h2>

        <p className="text-sm text-muted-foreground">
          Sorry, the page you are looking for doesn’t exist.
        </p>

        <Link
          href="/"
          className="inline-block rounded-lg bg-gradient-to-br from-purple-600 via-gray-900 to-purple-200 px-5 py-2 text-white hover:opacity-80"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}