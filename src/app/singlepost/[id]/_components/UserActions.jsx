"use client";
import { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { SlLike } from "react-icons/sl";
import Comments from "./Comments";
const UserActions = ({ postId }) => {
  const [commentOpen, setCommentOpen] = useState(false);

  const {
    data: likes,
    mutate,
    isLoading,
  } = useSWR(`http://localhost:3000/api/likes?postId=${postId}`, fetcher);

  console.log(likes);
  const handleLike = async () => {
    await fetch("http://localhost:3000/api/comments", {
      method: "POST",
    });

    mutate();
  };

  return (
    <div className="flex items-center justify-between p-4 my-6">
      <div className="flex gap-3">
        <span
          onClick={handleLike}
          className="flex items-center gap-1 cursor-pointer text-lg"
        >
          <SlLike /> {likes.length || 0}
        </span>
        <span
          onClick={() => setCommentOpen(!commentOpen)}
          className="flex items-center gap-1 cursor-pointer text-lg"
        >
          <FaRegComment />
        </span>
      </div>
      <div>
        <FiMoreHorizontal className="text-xl cursor-pointer" />
      </div>

      {/* comments */}
      <Comments
        commentOpen={commentOpen}
        setCommentOpen={setCommentOpen}
        postId={postId}
      />
    </div>
  );
};

export default UserActions;
