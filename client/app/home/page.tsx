"use client";

import Link from "next/link";
import Image from "next/image";
import Dropdown from "../component/component";
import { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <nav className="flex flex-row-reverse mt-8">
        {isOpen && (
          <div className="flex h-12 w-52 absolute rounded-full border top-28 right-28 text-white items-center justify-center">
            logout
          </div>
        )}
        <div className="flex w-52 h-12 items-center justify-center focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-normal rounded-full text-lg mr-28 ml-14 mt-4">
          <Image
            src="/logo.png"
            width={45}
            height={40}
            alt="Picture of the author"
            className="ml-2 mr-20"
            onClick={() => setIsOpen(!isOpen)}
          />
          <div onClick={() => setIsOpen(!isOpen)}>Nabil</div>
        </div>

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
    </div>
  );
}
