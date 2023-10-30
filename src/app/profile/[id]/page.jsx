"use client";
import Post from "@/components/post/Post";
import Image from "next/image";
import { useState } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
const tabs = ["Home", "About"];
const Profile = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <div className="flex px-4 gap-4 my-12 max-w-[1366px] mx-auto">
      {/* left content  */}
      <div className=" flex-[3] ring-1 ring-zinc-800 p-4 text-white">
        <div className="w-full">
          <div className="relative w-full h-[200px]">
            <Image
              src={"/img/ss.jpg"}
              fill
              alt="cover"
              className="object-cover"
            />
          </div>
          <h1 className="text-4xl font-bold mb-3 p-4">John Doe</h1>
        </div>
        <div className="w-full">
          {/* tabs */}
          <div className="mb-6 flex gap-2 items-center w-full border-b-2 border-zinc-800 srelative">
            {tabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setSelectedTab(i)}
                className={`${
                  selectedTab === i
                    ? "border-b-red-500 border-b-2"
                    : "border-b-zinc-900 border-b-2"
                } transition-all duration-300 py-1 rounded-md px-3 `}
              >
                {tab}
              </button>
            ))}
          </div>
          {/* User Posts  */}
          {selectedTab === 0 ? (
            <>
              <Post />
            </>
          ) : (
            <span className="py-4">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Suscipit, aspernatur?
            </span>
          )}
        </div>
      </div>
      {/* right content */}
      <div className="flex-[2] ring-1 ring-zinc-800 p-4 text-white">
        <div className="flex flex-col gap-2 items-center mb-6">
          <Image
            src={"/img/avatar.png"}
            height={120}
            width={120}
            alt="dp"
            className="object-cover rounded-full"
          />
          <span>John Doe</span>
          <div className="flex items-center gap-6 mb-4">
            <span>2.5k Followers</span>
            <button className="px-3 rounded-full bg-blue-700 hover:bg-blue-600">
              Follow
            </button>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
            adipisci, nisi optio tempora reiciendis quos?
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xl mb-2">Following</span>
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <Image
                src={"/img/avatar.png"}
                height={20}
                width={20}
                alt="dp"
                className="object-cover rounded-full"
              />
              <span>John Moe</span>
            </div>
            <span>
              <BiDotsHorizontalRounded />
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Image
                src={"/img/avatar.png"}
                height={20}
                width={20}
                alt="dp"
                className="object-cover rounded-full"
              />
              <span>John Moe</span>
            </div>
            <span>
              <BiDotsHorizontalRounded />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
