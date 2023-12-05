"use client";

import Image from "next/image";

export default function ContentCard() {
  return (
    <div>
      <div className="bg-[#44475A] rounded-lg w-[280px] sm:w-[180px] md:w-[280px] lg:w-[400px] ">
        <Image
          src={"/thumbnail.webp"}
          width={400}
          height={100}
          alt="content thumbnail"
          className="rounded-t-lg"
        />
        <p className="p-4 mb-3 font-normal text-white">
          Here are the biggest enterprise technology acquisitions of 2021 so
        </p>
      </div>
    </div>
  );
}
