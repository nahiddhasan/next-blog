"use client";
import fetcher from "@/utills/fetcher";
import moment from "moment";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiFillCaretLeft } from "react-icons/ai";
import useSWR from "swr";

const User = ({ img, name, bio, userId, createdAt, top }) => {
  const { data: session } = useSession();
  const [tooltip, setTooptip] = useState(false);

  const { data: follow, mutate: followMutate } = useSWR(
    `http://localhost:3000/api/follow?followingId=${userId}`,
    fetcher
  );

  const handleFollow = async (type) => {
    if (type === "follow") {
      await fetch(`http://localhost:3000/api/follow?followingId=${userId}`, {
        method: "POST",
      });
    } else {
      await fetch(`http://localhost:3000/api/unfollow?followingId=${userId}`, {
        method: "DELETE",
      });
    }

    followMutate();
  };
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

      {
        <>
          <div
            className={`${
              tooltip ? "md:block" : "hidden"
            } hidden zoomin absolute ${
              top ? "bottom-[125%] left-0" : "left-[100%] right-0"
            } p-4 w-[250px] bg-zinc-800 rounded-md`}
          >
            <AiFillCaretLeft
              className={`md:block hidden absolute ${
                top
                  ? "-rotate-90 -bottom-[14px] left-8"
                  : "-left-[14px] top-[50%]"
              }  text-zinc-800 text-xl`}
            />
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
              <span>{follow?.followings} Followers</span>
              <Link href={!session?.user ? "/login" : ""}>
                {!!follow?.isFollowing ? (
                  <button
                    onClick={() => handleFollow("unfollow")}
                    className="px-3 rounded-full bg-blue-700 hover:bg-blue-600"
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={() => handleFollow("follow")}
                    className="px-3 rounded-full bg-blue-700 hover:bg-blue-600"
                  >
                    Follow
                  </button>
                )}
              </Link>
            </div>
          </div>
        </>
      }
    </div>
  );
};

export default User;
