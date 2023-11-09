"use client";
import Image from "next/image";
import { useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiUpload } from "react-icons/bi";

const Modal = ({ onClose, image, body, onSubmit, disabled }) => {
  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [onSubmit, disabled]);

  return (
    <div className="h-screen w-full bg-zinc-800/20 fixed top-0 left-0 z-50 flex items-center justify-center">
      <div className="h-3/4 w-[550px] bg-zinc-700 rounded-md p-8 overflow-auto">
        <div className="flex items-center justify-between ">
          <h1 className="text-2xl">Profile Information</h1>
          <button
            onClick={onClose}
            className="rounded-full hover:bg-zinc-600 h-7 w-7 flex items-center justify-center"
          >
            <AiOutlineClose />
          </button>
        </div>
        <div>
          <div className="flex items-center justify-between gap-2 py-4">
            <div className="flex items-center gap-2">
              <Image
                src={image || "/img/avatar.png"}
                height={120}
                width={120}
                alt="avatar"
                className="object-cover rounded-full"
              />
              <button className="px-2 p-1 bg-blue-700 hover:bg-blue-600 rounded-md">
                <BiUpload />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src={"/img/ss.jpg"}
                height={40}
                width={200}
                alt="avatar"
                className="object-cover rounded-md"
              />
              <button
                disabled={disabled}
                className="px-2 p-1 bg-blue-700 hover:bg-blue-600 rounded-md"
              >
                <BiUpload />
              </button>
            </div>
          </div>
          <div className="p-5">{body}</div>
        </div>
        <div className="flex float-right gap-2">
          <button
            onClick={onClose}
            className="px-2 p-1 bg-zinc-600 hover:bg-zinc-500 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={disabled}
            className="px-2 p-1 bg-blue-700 hover:bg-blue-600 rounded-md disabled:cursor-not-allowed disabled:bg-blue-600/10"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
