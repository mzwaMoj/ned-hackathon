export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-semibold mb-4">404 - Not Found</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          The page you are looking for does not exist.
        </p>
        <a
          href="/"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
}

