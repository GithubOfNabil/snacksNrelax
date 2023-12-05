"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FormSubmitEvent extends React.FormEvent<HTMLFormElement> {
  data: FormData;
}

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  console.log(name);

  const handleSubmit = async (e: FormSubmitEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are needed!");
      return;
    }
    try {
      const res = await fetch("http://localhost:8000/auth/signup", {method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      }); 
      console.log(res)
      if (res.ok) {
        router.push('/home')
      } else {
        const form = e.target as HTMLFormElement;
        form.reset();
        setError("");
        console.log("signup failed");
      }
    } catch (error) {
      console.log("error while signup");
    }
  };

  return (
    <div>
      <nav className="flex flex-row-reverse mt-8">
        <Link href="/login">
          <button
            type="button"
            className="w-40 h-12 focus:outline-none text-white bg-[#44475A] hover:bg-purple-800 border-2 border-purple-700 focus:ring-4 focus:ring-purple-300 font-normal rounded-full text-lg px-5 py-2 mt-4 mr-28"
          >
            Log In
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
          <h1 className="text-3xl font-bold text-center text-white">Sing Up</h1>
          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-white"
              >
                Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Name"
                className="block w-full px-4 py-2.5 mt-2 text-white bg-purple-700 rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-white"
              >
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                className="block w-full px-4 py-2.5 mt-2 text-white bg-purple-700 rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
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
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
                className="block w-full px-4 py-2.5 mt-2 text-white bg-purple-700 rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mt-4 mb-2">
              <button className="w-full h-12 focus:outline-none text-white bg-[#44475A] hover:bg-purple-800 border-2 border-purple-700 focus:ring-4 focus:ring-purple-300 font-normal rounded-full text-lg px-5 py-2 mt-4">
                Sign Up
              </button>
            </div>
            {error && (
              <span className="text-red-600">
                All fields need to be filled!
              </span>
            )}
          
          </form>
        </div>
      </main>
    </div>
  );
}
