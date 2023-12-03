"use client";
import useOutsideClick from "@/hooks/outsideClick";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import UpdatePostModal from "../UpdatePostModal";

const More = ({ post }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [modal, setModal] = useState(false);
  const [updatePostModal, setUpdatePostModal] = useState(false);
  const modalRef = useOutsideClick(() => {
    setModal(false);
  });
  const handleUpdate = () => {
    setUpdatePostModal(true);
    setModal(false);
  };
  const handleDeletePost = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${post.id}`, {
      method: "DELETE",
    });
    router.refresh();
    router.push("/");
    setModal(false);
  };
  const selfPost = session?.user.id === post.userId;

  return (
    <div className="relative">
      <FiMoreHorizontal
        onClick={() => setModal(!modal)}
        className="text-xl cursor-pointer"
      />
      <div
        ref={modalRef}
        className={`${
          modal ? "block zoomin" : "hidden"
        } absolute top-0 right-6 bg-zinc-700 p-2 rounded-md flex flex-col gap-2 z-10`}
      >
        {selfPost ? (
          <div className="">
            <button
              onClick={handleUpdate}
              className="px-2 hover:bg-zinc-800 rounded-md "
            >
              Update
            </button>
            <button
              onClick={handleDeletePost}
              className="px-2 hover:bg-zinc-800 rounded-md "
            >
              Remove
            </button>
          </div>
        ) : (
          <button
            onClick={handleDeletePost}
            className="px-2 hover:bg-zinc-800 rounded-md "
          >
            Report
          </button>
        )}
      </div>
      <div
        className={`${
          updatePostModal ? "block zoomin" : "hidden"
        }  h-screen w-full fixed top-0 left-0 z-50 flex items-center justify-center`}
      >
        <UpdatePostModal setUpdatePostModal={setUpdatePostModal} post={post} />
      </div>
    </div>
  );
};

export default More;
