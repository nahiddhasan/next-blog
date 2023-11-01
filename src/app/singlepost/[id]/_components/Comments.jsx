"use client";
import fetcher from "@/utills/fetcher";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import useSWR from "swr";
import CommentList from "./CommentList";

const Comments = ({ commentOpen, setCommentOpen, postId }) => {
  const commentRef = useRef();
  const [body, setBody] = useState("");

  const { data: session, status } = useSession();

  const {
    data: comments,
    mutate,
    isLoading,
  } = useSWR(`http://localhost:3000/api/comments?postId=${postId}`, fetcher);

  const handleComment = async () => {
    if (!body) {
      return;
    }
    await fetch("http://localhost:3000/api/comments", {
      method: "POST",
      body: JSON.stringify({ body, postId }),
    });
    setBody("");
    mutate();
  };

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
        <span className="text-lg font-semibold">
          Total Comments ({comments?.length})
        </span>
        <RxCrossCircled
          onClick={() => setCommentOpen(false)}
          className="text-2xl hover:text-zinc-200 cursor-pointer"
        />
      </div>
      {/* comments section */}
      <div>
        {/* comment input  */}
        {status === "authenticated" ? (
          <div className="w-full my-4 p-3 bg-zinc-700 rounded-md">
            {/* user  */}
            <div className="flex items-center gap-2">
              <Image
                src={session.user.image || "/img/avatar.png"}
                height={30}
                width={30}
                className="object-cover cursor-pointer rounded-full"
                alt="userimg"
              />
              <div className="flex flex-col">
                <span className="cursor-pointer font-semibold">
                  {session.user.name}
                </span>
              </div>
            </div>
            <textarea
              className="w-full bg-transparent text-sm outline-none"
              placeholder="What are You Thoughts?"
              onChange={(e) => setBody(e.target.value)}
              value={body}
            />
            <button
              onClick={handleComment}
              className="rounded-full px-3 p-1 bg-zinc-900 hover:bg-zinc-800 text-sm text-white"
            >
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
        {isLoading
          ? "Loading..."
          : comments.map((comment) => (
              <CommentList key={comment.id} comment={comment} />
            ))}
      </div>
    </div>
  );
};

export default Comments;
