"use client";
import Image from "next/image";
import { useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";

const UpdateProfileModal = ({
  onClose,
  image,
  coverImg,
  body,
  onSubmit,
  disabled,
  profile,
  setProfile,
  cover,
  setCover,
}) => {
  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [onSubmit, disabled]);
  return (
    <div className="h-screen w-full bg-zinc-800/20 fixed top-0 left-0 z-50 flex items-center justify-center">
      <div className="max-h-full h-full md:h-auto md:max-h-[85vh] w-full md:w-[90vw] md:max-w-[550px] bg-zinc-700 rounded-md p-8 overflow-auto">
        <div className="flex items-center justify-between ">
          <h1 className="text-2xl">Profile Information</h1>
          <button
            onClick={onClose}
            // type="submit"
            className="rounded-full hover:bg-zinc-600 h-7 w-7 flex items-center justify-center"
          >
            <AiOutlineClose />
          </button>
        </div>
        <div>
          <div className="flex items-center justify-between gap-2 py-4 relative">
            <div className="w-full h-[150px] flex items-center gap-2 relative">
              <Image
                src={
                  (cover && URL.createObjectURL(cover)) ||
                  coverImg ||
                  "/img/ss.jpg"
                }
                fill
                alt="avatar"
                className="object-cover rounded-md"
              />
              <input
                type="file"
                onChange={(e) => setCover(e.target.files[0])}
                id="cover"
                className="hidden"
              />
              <label
                htmlFor="cover"
                className="absolute bottom-1 right-1 cursor-pointer px-2 p-1 bg-blue-700 hover:bg-blue-600 rounded-full"
              >
                <MdModeEdit />
              </label>
            </div>
            <div className="flex items-center gap-2 absolute left-4 -bottom-4">
              <div className="relative">
                <Image
                  src={
                    (profile && URL.createObjectURL(profile)) ||
                    image ||
                    "/img/avatar.png"
                  }
                  height={120}
                  width={120}
                  alt="avatar"
                  className="object-cover rounded-full "
                />
                <input
                  type="file"
                  onChange={(e) => setProfile(e.target.files[0])}
                  id="profile"
                  className="hidden"
                />
                <label
                  htmlFor="profile"
                  className=" absolute right-1 bottom-1 cursor-pointer px-2 p-1 bg-blue-700 hover:bg-blue-600 rounded-full"
                >
                  <MdModeEdit />
                </label>
              </div>
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

export default UpdateProfileModal;
