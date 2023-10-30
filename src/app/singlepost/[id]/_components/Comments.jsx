"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { RxCrossCircled } from "react-icons/rx";
import CommentList from "./CommentList";
const Comments = ({ commentOpen, setCommentOpen }) => {
  const user = true;
  const commentRef = useRef();

  const handleClickOutside = (e) => {
    if (!commentRef.current.contains(e.target)) {
      setCommentOpen(false);
    }
  };

  useEffect(() => {
    if (commentOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [commentOpen]);

  return (
    <div
      ref={commentRef}
      className={`${
        commentOpen ? "block" : "hidden"
      } sidebar overflow-y-auto shadow-2xl shadow-zinc-400/30 p-4 text-white fixed right-0 top-12 bg-zinc-800 h-[calc(100vh-48px)] w-screen md:w-[400px] z-20`}
    >
      {/* top part  */}
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold">Total Comments (250)</span>
        <RxCrossCircled
          onClick={() => setCommentOpen(false)}
          className="text-2xl hover:text-zinc-200 cursor-pointer"
        />
      </div>
      {/* comments section */}
      <div>
        {/* comment input  */}
        {user ? (
          <div className="w-full my-4 p-3 bg-zinc-700 rounded-md">
            {/* user  */}
            <div className="flex items-center gap-2">
              <Image
                src={"/img/avatar.png"}
                height={30}
                width={30}
                className="object-cover cursor-pointer rounded-full"
                alt="userimg"
              />
              <div className="flex flex-col">
                <span className="cursor-pointer font-semibold">John Doe</span>
              </div>
            </div>
            <textarea
              className="w-full bg-transparent text-sm outline-none"
              placeholder="What are You Thoughts?"
            />
            <button className="rounded-full px-3 p-1 bg-zinc-900 hover:bg-zinc-800 text-sm text-white">
              Comment
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="font-medium mt-4 text-red-300">
              Login to post a comment.
            </p>
            <Link href="/login" className="bg-yellow-400 px-3 rounded-full">
              Login
            </Link>
          </div>
        )}
        {/* comment list */}
        <CommentList />
        <CommentList />
        <CommentList />
        <CommentList />
      </div>
    </div>
  );
};

export default Comments;
