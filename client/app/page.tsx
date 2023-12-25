import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <nav className="flex flex-row-reverse mt-8">
        <Link href="/signup">
          <button
            type="button"
            className="w-40 h-12 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-normal rounded-full text-lg px-5 py-2.5 mr-20 ml-14 mt-4"
          >
            Sign Up
          </button>
        </Link>
        <Link href="/login">
          <button
            type="button"
            className="w-40 h-12 focus:outline-none text-white bg-[#44475A] hover:bg-purple-800 border-2 border-purple-700 focus:ring-4 focus:ring-purple-300 font-normal rounded-full text-lg px-5 py-2 mt-4"
          >
            Log In
          </button>
        </Link>
        <div className="mr-auto text-3xl font-medium mt-5">Relax</div>
        <div className="text-3xl font-medium text-purple-600 mt-5">-N-</div>
        <div className="text-3xl font-medium mt-5">Snacks</div>
        <Image
          src="/logo.png"
          width={80}
          height={80}
          alt="Picture of the author"
          className="ml-48"
        />
      </nav>
      <main className="flex flex-row mt-40 ml-48">
        <div>
          <div className="text-6xl font-semibold mb-10">
            <p className="mb-4">Don't get confused selecting</p>
            <p>your snacks time content</p>
          </div>
          <div className="text-purple-700 text-3xl font-medium mb-2 ">
            Get all your favorite content at one place.
          </div>
          <div className="text-3xl font-medium">
            <p className="mb-2">
              So, your snacks doesn't get cold searching for the
            </p>
            perfect content to watch
          </div>
          <Link href="/signup">
            <button
              type="button"
              className="mt-5 w-48 h-14 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium text-xl rounded-lg px-5 py-2.5 text-center me-2 mb-2"
            >
              Get Started
            </button>
          </Link>
        </div>
        <Image
          src="/logo.png"
          width={500}
          height={500}
          alt="Picture of the author"
          className="ml-40 mb-20"
        />
      </main>
    </div>
  );
}
