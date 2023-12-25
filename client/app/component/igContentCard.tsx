"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type cardProps = {
  video: string;
  thumbnail: string;
  title: string;
};

export default function IgContentCard({ video, thumbnail, title }: cardProps) {
  const [ttl, setTtl] = useState<string>("");
  useEffect(() => {
    setTtl(title);
  }, []);
  thumbnail = thumbnail.slice(1, -1);
  console.log(ttl);
  return (
    <div>
      <div className="bg-[#44475A] flex rounded-lg h-72 w-[280px] sm:w-[180px] md:w-[280px] lg:w-[400px] overflow-hidden">
        <div className="w-[200px]">
          <Link
            href={video}
            target="_blank"
            // className="w-[200px]"
          >
            <Image
              src={thumbnail}
              width={200}
              height={10}
              //   style={{ height: 'auto' }}
              alt="content thumbnail"
              className="rounded-t-lg"
              priority={true}
            />
          </Link>
        </div>
        <div className="flex items-center justify-center w-[200px]">
          <div className="font-normal text-white">{ttl}</div>
        </div>
      </div>
    </div>
  );
}
