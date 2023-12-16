"use client";

import React, { useState } from "react";
import { LinkAdded } from "./linkAdded";

type propType = {
  setSelect: () => void;
  socialName: String;
};
interface FormSubmitEvent extends React.FormEvent<HTMLFormElement> {
  data: FormData;
}

export const SubmitLink: React.FC<propType> = ({ setSelect, socialName }) => {
  const [addDone, setAddDone] = useState(false);
  const [link, setLink] = useState("");
  const [empty, setEmpty] = useState(false);


  console.log(link)
  const handleSubmit = async (e: FormSubmitEvent) => {
    e.preventDefault();
    if (!link) {
      setEmpty(true);
      return;
    }
    try {
      const res = await fetch(`http://localhost:8000/profile/content/add/?social=${socialName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          link,
        }),
        credentials: "include",
      });


      console.log(res);
      if (res.ok) {
        setAddDone(true);
      } else {
        const form = e.target as HTMLFormElement;
        form.reset();
        console.log("add failed");
      }
    } catch (error) {
      console.log("error while adding");
    }
  };

  return (
    <div>
      {!addDone && (
        <div className="flex flex-col h-52">
          <button
            className=" w-10 h-8 bg-red-500 rounded-md"
            onClick={setSelect}
          >
            {"<-"}
          </button>

          <p className=" text-xl text-white mb-2 mt-14">
            {`Enter ${socialName} creator/influencer User Name...`}
          </p>
          <form action="" onSubmit={handleSubmit}>
            <input
              className="bg-purple-700 text-white text-lg focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40 h-12 w-96 rounded-lg pl-6"
              placeholder="url.."
              onChange={(e) => setLink(e.target.value)}
              type="text"
            />
            <button className=" w-12 h-12 bg-purple-500 rounded-xl ml-1 mt-2 text-2xl text-white">
              <div>+</div>
            </button>
          </form>
        </div>
      )}
      {empty &&
        <div className="text-red-500">
          Provide link!
        </div>
      }
      {addDone && <LinkAdded />}
    </div>
  );
};
