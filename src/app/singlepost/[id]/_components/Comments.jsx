"use client";
import LoadMore from "@/components/loadMore/LoadMore";
import useInfiniteScroll from "@/hooks/infiniteScroll";
import useOutsideClick from "@/hooks/outsideClick";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import ReactTextareaAutosize from "react-textarea-autosize";
import CommentList from "./CommentList";

const Comments = ({ commentOpen, setCommentOpen, postId, commentsCount }) => {
  const { data: session, status } = useSession();
  const [body, setBody] = useState("");

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/comments?postId=${postId}`;
  const {
    fetchData: comments,
    isEmpty,
    isLoadingMore,
    isReachingEnd,
    mutate,
    size,
    setSize,
    isLoading,
  } = useInfiniteScroll(url);

  const handleComment = async (e) => {
    e.preventDefault();
    if (!body) {
      return;
    }
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/comments`, {
      method: "POST",
      body: JSON.stringify({ body, postId }),
    });
    setBody("");
    mutate();
  };
  const commentRef = useOutsideClick(() => {
    setCommentOpen(false);
  });

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
          Total Comments ({commentsCount})
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
                src={session?.user.image || "/img/avatar.png"}
                height={30}
                width={30}
                className="object-cover cursor-pointer rounded-full"
                alt="userimg"
              />
              <div className="">
                <span className="cursor-pointer font-semibold">
                  {session?.user.name}
                </span>
              </div>
            </div>
            <form onSubmit={handleComment}>
              <ReactTextareaAutosize
                className="w-full bg-transparent text-sm outline-none resize-none p-2"
                placeholder="What are You Thoughts?"
                onChange={(e) => setBody(e.target.value)}
                value={body}
              />

              <button
                disabled={!body}
                type="submit"
                on
                className="disabled:cursor-not-allowed disabled:bg-zinc-800 rounded-full px-3 p-1 bg-zinc-900 hover:bg-zinc-800 text-sm text-white"
              >
                Comment
              </button>
            </form>
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
        {isEmpty ? <p className="text-center">No comments found!</p> : null}
        {comments.map((comment) => (
          <CommentList
            key={comment.id}
            comment={comment}
            session={session}
            mutate={mutate}
          />
        ))}
        <LoadMore
          isReachingEnd={isReachingEnd}
          setSize={setSize}
          size={size}
          isLoadingMore={isLoadingMore}
        />
      </div>
    </div>
  );
};

export default Comments;
