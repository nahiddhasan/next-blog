"use client";
import useOutsideClick from "@/hooks/outsideClick";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import DeleteModal from "./DeleteModal";
import UpdateModal from "./UpdateModal";

const CommentList = ({ comment, session, mutate }) => {
  const [open, setOpen] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const commentModal = useOutsideClick(() => setOpen(false));

  const updateModalHandle = () => {
    setUpdateModal(true);
    setOpen(false);
  };
  const deleteModalHandle = () => {
    setDeleteModal(!deleteModal);
    setOpen(false);
  };
  const commentOwner = session?.user.id === comment.user.id;

  return (
    <div className="relative">
      {/* user  */}
      <div className="w-full flex justify-between relative">
        <div className="flex items-center gap-2">
          <Image
            src={comment.user.image || "/img/avatar.png"}
            height={40}
            width={40}
            className="object-cover cursor-pointer rounded-full"
            alt="userimg"
          />
          <div className="flex flex-col">
            <Link
              href={`/profile/${comment.user.id}`}
              className="cursor-pointer"
            >
              {comment.user.name}
            </Link>
            <span className="cursor-pointer text-sm">
              {moment(comment.createdAt).fromNow()}
            </span>
          </div>
        </div>
        <FiMoreHorizontal
          onClick={() => setOpen(!open)}
          className="text-xl cursor-pointer"
        />
        <div
          ref={commentModal}
          className={`${
            open ? "block zoomin" : "hidden"
          } bg-zinc-700 p-2 flex flex-col gap-2 rounded-md absolute top-0 right-6 z-20`}
        >
          {commentOwner ? (
            <>
              <button
                onClick={updateModalHandle}
                className="hover:bg-zinc-800 rounded-md px-2 text-sm"
              >
                Update
              </button>
              <button
                onClick={deleteModalHandle}
                className="hover:bg-zinc-800 rounded-md px-2 text-sm"
              >
                Remove
              </button>
            </>
          ) : (
            "Report"
          )}
        </div>
      </div>
      <p className="my-2 text-sm">{comment.body}</p>
      <hr className="my-3 h-[1px] border-zinc-700" />
      <div
        className={`${
          updateModal ? "block zoomin" : "hidden"
        } absolute right-6 w-[80%] top-0 z-10`}
      >
        <UpdateModal
          setUpdateModal={setUpdateModal}
          comment={comment}
          mutate={mutate}
        />
      </div>
      <div
        className={`${
          deleteModal ? "block zoomin" : "hidden"
        } absolute right-6 w-[80%] top-0 z-10`}
      >
        <DeleteModal
          setDeleteModal={setDeleteModal}
          comment={comment}
          mutate={mutate}
        />
      </div>
    </div>
  );
};

export default CommentList;
