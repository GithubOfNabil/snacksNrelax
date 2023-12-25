"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type cardProps = {
  video: string;
  thumbnail:string;
}


export default function ContentCard({video, thumbnail}: cardProps) {
  const [title, setTitle] = useState<string>("");
  fetch(`https://noembed.com/embed?dataType=json&url=${video}`)
  .then(res => res.json())
  .then(data =>  setTitle(data.title));

  return (
    <div>
      <div className="bg-[#44475A] relative rounded-lg h-72 w-[280px] sm:w-[180px] md:w-[280px] lg:w-[400px] overflow-hidden">
        <div>
        <Link
        href={video}
        target="_blank"
        >
        <Image
          src={thumbnail}
          width={400}
          height={300}
          style={{ clipPath: 'inset(45px 0 45px 0)', overflow: 'hidden' }}
          alt="content thumbnail"
          className="rounded-t-lg absolute -top-12"
          priority={true}
          />
          </Link>
          </div>
        <p className="absolute top-52 p-4 mb-3 font-normal text-white">
          {title}
        </p>
      </div>
    </div>
  );
}
