"use client";
import Combobox from "@/app/write/_components/Combobox";
import QuillToolbar, {
  formats,
  modules,
} from "@/app/write/_components/CustomToolbar";
import useOutsideClick from "@/hooks/outsideClick";
import upload from "@/utills/upload";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import "react-quill/dist/quill.bubble.css";

const UpdatePostModal = ({ setUpdatePostModal, post }) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  const router = useRouter();
  const [selected, setSelected] = useState(post.catSlug);
  const [des, setDes] = useState(post.des);
  const [title, setTitle] = useState(post.title);
  const [file, setFile] = useState("");
  const [submiting, setSubmiting] = useState(false);

  const handleError = () => {
    if (!title) {
      return alert("Title Missing");
    } else if (title.length > 120) {
      return alert("Title can't be large than 120 charecter");
    } else if (!selected) {
      return alert("Category missing");
    } else if (!des) {
      return alert("Description missing");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleError();
    setSubmiting(true);
    const url = await upload(file);
    await fetch(`/api/posts/${post.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        title,
        des,
        img: url,
        catSlug: selected.toLowerCase(),
      }),
    });

    router.refresh();
    setSubmiting(false);
    setUpdatePostModal(false);
  };
  const updatePostRef = useOutsideClick(() => {
    setUpdatePostModal(false);
  });
  return (
    <div
      ref={updatePostRef}
      className={`z-50 h-3/4 w-[90%] md:w-[550px] bg-zinc-700 rounded-md p-8 overflow-auto`}
    >
      <div className="flex items-center justify-between ">
        <h1 className="text-2xl">Update Your Post</h1>
        <button
          onClick={() => setUpdatePostModal(false)}
          // type="submit"
          className="rounded-full hover:bg-zinc-600 h-7 w-7 flex items-center justify-center"
        >
          <AiOutlineClose />
        </button>
      </div>
      {/* update post info  */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <div>
          <div className="relative h-[150px] w-full mt-3">
            <Image
              src={(file && URL.createObjectURL(file)) || post.img || ""}
              fill
              alt="Image"
              className="object-contain rounded-md"
            />
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              id="img"
              className="hidden"
            />
            <label
              htmlFor="img"
              className="absolute right-2 bottom-2 cursor-pointer"
            >
              <MdEdit />
            </label>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Title</label>
            <input
              className="text-2xl md:text-3xl w-full placeholder:italic bg-transparent border-none focus:outline-none"
              type="text"
              placeholder="Update Your Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Category</label>
            <Combobox selected={selected} setSelected={setSelected} />
          </div>
          <div>
            <QuillToolbar />
            <ReactQuill
              className={"w-full !text-sm"}
              theme="bubble"
              modules={modules}
              formats={formats}
              value={des}
              onChange={setDes}
              placeholder="Update your story..."
            />
          </div>
        </div>
        <button
          disabled={submiting || !title || !des || !selected}
          type="submit"
          className="disabled:bg-orange-300 disabled:cursor-not-allowed bg-orange-400 hover:bg-orange-300 rounded-md px-2 p-1 border-none text-zinc-900 w-max"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdatePostModal;
