"use client";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiFillCaretLeft } from "react-icons/ai";

const User = ({ img, name, bio, userId, createdAt }) => {
  const [tooltip, setTooptip] = useState(false);
  return (
    <div
      onMouseEnter={() => setTooptip(true)}
      onMouseLeave={() => setTooptip(false)}
      className="flex items-center w-max relative pr-4"
    >
      <div className="flex items-center gap-2">
        <Link href={`/profile/${userId}`}>
          <Image
            src={img}
            height={30}
            width={30}
            className="object-cover cursor-pointer rounded-full"
            alt="userimg"
          />
        </Link>
        <div className="flex flex-col">
          <Link
            href={`/profile/${userId}`}
            className="cursor-pointer font-semibold"
          >
            {name}
          </Link>
          {createdAt && (
            <span className="text-zinc-400 text-sm">
              {moment(createdAt).fromNow()}
            </span>
          )}
        </div>
      </div>

      {tooltip && (
        <>
          <div className="absolute right-0 left-[100%] p-4 w-[200px] bg-zinc-800 rounded-md">
            <div>
              <Link
                href={`/profile/${userId}`}
                className="flex items-center gap-2"
              >
                <Image
                  src={img}
                  height={30}
                  width={30}
                  className="object-cover cursor-pointer rounded-full"
                  alt="userimg"
                />
                <span className="cursor-pointer font-semibold">{name}</span>
              </Link>
              <p>{bio}</p>
            </div>
            <hr className="my-2 border-b border-zinc-700" />
            <div className="flex justify-between items-center">
              <span>2k Followers</span>
              <button className="px-2 bg-blue-800 rounded-full text-sm">
                Follow
              </button>
            </div>
          </div>
          <AiFillCaretLeft className="absolute right-0 left-[calc(100%-14px)] text-zinc-800 text-xl" />
        </>
      )}
    </div>
  );
};

export default User;
