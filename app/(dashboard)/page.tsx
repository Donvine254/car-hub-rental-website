import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold">Welcome to Car Hub</h1>
      <div className="p-6 flex xsm:flex-col items-center gap-2 bg-blue-100 bg-opacity-40 rounded-md">
        <Link
          href="/login"
          className="inline-flex items-center justify-center text-xl font-medium border disabled:pointer-events-none disabled:bg-gray-100 disabled:text-black h-8 w-20 px-4 py-1 xsm:w-full bg-gray-200 hover:bg-gray-300 text-black rounded-md">
          Login
        </Link>
        <Link
          href="/register"
          className="inline-flex items-center justify-center text-xl font-medium border border-blue-500 disabled:pointer-events-none disabled:bg-gray-100 disabled:text-black px-4 py-1 xsm:w-full  hover:bg-blue-600  rounded-md text-black hover:text-white h-8 w-20">
          Register
        </Link>
      </div>
    </main>
  );
}
