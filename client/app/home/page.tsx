"use client";

import Link from "next/link";
import Image from "next/image";
import ContentCard from "../component/contentCard";
import AddModal from "../component/addModal";
import {
  YoutubeSelect,
  InstagramSelect,
  TiktokSelect,
  FacebookSelect,
} from "../component/socialSelect";

import { useEffect, useReducer, useRef, useState } from "react";
import { SubmitLink } from "../component/submitLink";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [select, setSelect] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [selected, setSelected] = useState<String>("");
  const router = useRouter();
  const ref = useRef(null);
 


  const handleUserData = async () => {
    try {
      const res = await fetch("http://localhost:8000/profile/name", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        router.push("/login");
      } else {
        setName(data.name);
      }
    } catch {
      router.push("/login");
    }
  };

  const handleLogout = async () => {
    try {
      const logOutRes = await fetch("http://localhost:8000/auth/logout", {
        method: "GET",
        credentials: "include",
      });
      console.log(logOutRes)
      if (logOutRes.ok) {
        router.push("/login");
      } else {
        console.log("logout failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleUserData();
  }, []);

  return (
    <div>
      {/*Navbar*/}
      <nav className="flex flex-row-reverse mt-8">
        {/* Profile and logout PopUp*/}
        {isOpen && (
          <div className="flex flex-col h-24 w-52 space-y-2.5 z-20 bg-purple-700 absolute rounded-lg border top-28 right-28 text-white items-center justify-center">
            <hr className="w-28 h-px bg-white border-0 rounded "></hr>
            <button
              className="flex bg-rose-500 h-8 w-20 rounded-lg items-center justify-center "
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
        )}

        {/*UserName and Profile Picture */}
        <div className="flex w-52 h-12 items-center justify-center focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-normal rounded-full text-lg mr-28 ml-2 mt-4">
          <Image
            src="/logo.png"
            width={45}
            height={40}
            alt="Picture of the author"
            className="ml-2 mr-20"
            onClick={() => setIsOpen(!isOpen)}
          />
          <div onClick={() => setIsOpen(!isOpen)}>{name}</div>
        </div>

        {/*Add button and modal popUp */}
        <button
          className="w-40 h-12 mt-4 text-white bg-[#44475A] border-2 border-purple-700 hover:bg-purple-600 font-normal rounded-full text-lg px-5 py-2.5"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          + Add
        </button>

        <AddModal
          open={openModal}
          onClose={() => {
            setOpenModal(false);
            setSelect(false);
          }}
        >
    
          {!select && (
            <div className="grid grid-cols-4 mt-12">
              <div onClick={() =>setSelected("youtube")}><YoutubeSelect setSelect={() => setSelect(true)}></YoutubeSelect></div>
              <InstagramSelect />
              <TiktokSelect />
              {/* <FacebookSelect /> */}
            </div>
          )}
          {select &&  (
            <div >
              <SubmitLink socialName={selected} setSelect={() => setSelect(false)} ></SubmitLink>
            </div>
          )}
        </AddModal>

        {/*Title and Logo */}
        <Link href="/home" className="mr-auto flex flex-row">
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
        {/* SearchBar */}
        <div className="relative h-16  bg-[#44475A]">
          <form action="">
            <div className="absolute inset-x-1/3 -bottom-7 ">
              <input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search"
                className="w-full h-12 pl-10 pr-4 py-2 text-white bg-purple-700 rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
              <div
                className="absolute inset-y-0 left-0 pl-3  
                    flex items-center  
                    pointer-events-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="16"
                  viewBox="0 0 512 512"
                >
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
              </div>
            </div>
          </form>
        </div>

        {/*card section*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-16 ml-28 mr-24 gap-y-6 ">
          <ContentCard />
          <ContentCard />
          <ContentCard />
          <ContentCard />
          <ContentCard />
          <ContentCard />
          <ContentCard />
          <ContentCard />
          <ContentCard />
        </div>
      </main>
    </div>
  );
}
