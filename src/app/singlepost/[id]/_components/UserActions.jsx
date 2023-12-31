"use client";
import fetcher from "@/utills/fetcher";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import useSWR from "swr";
import Comments from "./Comments";

const UserActions = ({ postId, commentsCount }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const { data: session } = useSession();
  const { data, mutate, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/like?postId=${postId}`,
    fetcher
  );

  const handleLike = async (type) => {
    if (type === "like") {
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/like?postId=${postId}`,
        {
          method: "POST",
        }
      );
    } else {
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/unlike?postId=${postId}`,
        {
          method: "DELETE",
        }
      );
    }

    mutate();
  };
  return (
    <div className="flex items-center justify-between p-2 md:p-4 my-3 md:my-6">
      <div className="flex gap-3 items-center">
        <div>
          {!session?.user ? (
            <Link href={!session?.user ? "/login" : ""}>
              <span className="flex items-center gap-1 cursor-pointer text-lg">
                <AiOutlineLike size={22} />
                {data}
              </span>
            </Link>
          ) : (
            <span className="flex items-center gap-1 cursor-pointer text-lg">
              {!!data?.isLiked ? (
                <AiFillLike size={22} onClick={() => handleLike("unlike")} />
              ) : (
                <AiOutlineLike
                  className=""
                  size={22}
                  onClick={() => handleLike("like")}
                />
              )}{" "}
              {data?.likes}
            </span>
          )}
        </div>

        <span
          onClick={() => setCommentOpen(!commentOpen)}
          className="flex items-center gap-1 cursor-pointer text-lg"
        >
          <FaRegComment /> {commentsCount}
        </span>
      </div>
      <div>
        <FiMoreHorizontal className="text-xl cursor-pointer" />
      </div>

      {/* comments */}
      <Comments
        commentsCount={commentsCount}
        commentOpen={commentOpen}
        setCommentOpen={setCommentOpen}
        postId={postId}
      />
    </div>
  );
};

export default UserActions;
