"use client";
import { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { SlLike } from "react-icons/sl";
import Comments from "./Comments";
const UserActions = () => {
  const user = false;
  const [commentOpen, setCommentOpen] = useState(false);

  return (
    <div className="flex items-center justify-between p-4 my-6">
      <div className="flex gap-3">
        <span className="flex items-center gap-1 cursor-pointer text-lg">
          <SlLike /> 10
        </span>
        <span
          onClick={() => setCommentOpen(!commentOpen)}
          className="flex items-center gap-1 cursor-pointer text-lg"
        >
          <FaRegComment /> 20
        </span>
      </div>
      <div>
        <FiMoreHorizontal className="text-xl cursor-pointer" />
      </div>

      {/* comments */}
      <Comments commentOpen={commentOpen} setCommentOpen={setCommentOpen} />
    </div>
  );
};

export default UserActions;
