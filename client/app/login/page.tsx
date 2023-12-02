import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
    <div>
      <nav className="flex flex-row-reverse mt-8">
        <Link href="/signup">
          <button
            type="button"
            className="w-40 h-12 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-normal rounded-full text-lg px-5 py-2.5 mr-28 ml-14 mt-4"
          >
            Sign Up
          </button>
        </Link>
        <Link href="/" className="mr-auto flex flex-row">
          <div className="text-3xl font-medium mt-5">Snacks</div>
          <div className="text-3xl font-medium text-purple-600 mt-5">-N-</div>
          <div className="text-3xl font-medium mt-5">Relax</div>
        </Link>
        <Image
          src="/logo.png"
          width={80}
          height={80}
          alt="Picture of the author"
          className="ml-48"
        />
      </nav>

      <main>
        <div className="relative flex flex-col items-center justify-center mt-40 overflow-hidden ">
          <h1 className="text-3xl font-bold text-center text-white">Log In</h1>
          <form className="mt-6">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-white"
              >
                Email
              </label>
              <input
                type="email"
                className="block w-full px-4 py-2.5 mt-2 text-gray-700 bg-purple-700 hover:bg-white rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-white"
              >
                Password
              </label>
              <input
                type="password"
                className="block w-full px-4 py-2.5 mt-2 text-gray-700 bg-purple-700 hover:bg-white rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mt-4 mb-2">
              <button className="w-full h-12 focus:outline-none text-white bg-[#44475A] hover:bg-purple-800 border-2 border-purple-700 focus:ring-4 focus:ring-purple-300 font-normal rounded-full text-lg px-5 py-2 mt-4">
                Login
              </button>
            </div>

            <Link href="/forget" className="text-sm text-white hover:underline">
              Forget Password?
            </Link>
          </form>
        </div>
      </main>
    </div>
  );
}
