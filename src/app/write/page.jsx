"use client";
import useOutsideClick from "@/hooks/outsideClick";
import upload from "@/utills/upload";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  CiCirclePlus,
  CiCircleRemove,
  CiImageOn,
  CiLink,
  CiVideoOn,
} from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import "react-quill/dist/quill.bubble.css";
import Combobox from "./_components/Combobox";
import QuillToolbar, { formats, modules } from "./_components/CustomToolbar";

const Write = () => {
  const { status } = useSession();
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [selected, setSelected] = useState("");
  const [file, setFile] = useState();
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

  const fileRef = useOutsideClick(() => {
    setOpen(false);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    handleError();
    setSubmiting(true);

    const url = await upload(file);
    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        des,
        img: url,
        catSlug: selected.toLowerCase(),
      }),
    });
    setSubmiting(false);
    if (res.status === 200) {
      const data = await res.json();
      router.push(`/singlepost/${data.id}`);
    }
  };

  if (status === "unauthenticated") {
    router.push("/");
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 p-4 max-w-[1000px] mx-auto mt-6 min-h-[100vh] relative"
    >
      <div className="flex items-center gap-4 w-full">
        <label htmlFor="" className="w-20 text-right text-xl">
          Title:
        </label>
        <input
          className="text-2xl md:text-4xl w-full placeholder:italic bg-transparent border-none focus:outline-none "
          type="text"
          placeholder="Title"
          required
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex items-start gap-4 w-full">
        <label htmlFor="" className="w-20 text-right text-lg pt-2">
          Category:
        </label>
        {/* combobox item  */}
        <Combobox selected={selected} setSelected={setSelected} />
      </div>
      <div className="mx-auto w-full py-4">
        {file && (
          <div className="relative h-[400px] w-full">
            <Image
              src={URL.createObjectURL(file)}
              fill
              alt=""
              className="object-cover"
            />
            <RxCross2
              size={18}
              className="cursor-pointer absolute top-1 right-1 rounded-full bg-red-500 hover:bg-red-400 p-1"
              onClick={() => setFile("")}
            />
          </div>
        )}
      </div>
      <div className="flex gap-4 items-end w-full">
        <div className="w-20 flex justify-end relative">
          <div className="pb-4 cursor-pointer">
            {open ? (
              <CiCircleRemove
                onClick={() => setOpen(!open)}
                size={36}
                className="hover:text-zinc-300"
              />
            ) : (
              <CiCirclePlus
                onClick={() => setOpen(!open)}
                size={36}
                className="hover:text-zinc-300"
              />
            )}
          </div>

          {open && (
            <div
              ref={fileRef}
              className={`${
                open ? "zoomin flex" : "hidden"
              } flex items-center gap-4 text-green-600 bg-zinc-900 absolute left-24 z-10`}
            >
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                id="img"
                className="hidden"
              />
              <label
                htmlFor="img"
                className="cursor-pointer h-8 w-8 rounded-full ring-1 ring-green-600 flex items-center justify-center"
              >
                <CiImageOn size={24} />
              </label>

              <button className="h-8 w-8 rounded-full ring-1 ring-green-600 flex items-center justify-center">
                <CiVideoOn size={24} />
              </button>
              <button className="h-8 w-8 rounded-full ring-1 ring-green-600 flex items-center justify-center">
                <CiLink size={24} />
              </button>
            </div>
          )}
        </div>
        <div className="w-full">
          <QuillToolbar />
          <ReactQuill
            onFocus={() => setOpen(false)}
            className={"w-full "}
            theme="bubble"
            modules={modules}
            formats={formats}
            value={des}
            onChange={setDes}
            placeholder="Tell your story..."
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={submiting || !title || !des || !selected}
        className="absolute -top-3 right-2 disabled:bg-orange-300 disabled:cursor-not-allowed bg-orange-400 hover:bg-orange-300 rounded-md px-2 p-1 border-none text-black w-max"
      >
        {submiting ? "Publishing..." : "Publish"}
      </button>
    </form>
  );
};

export default Write;
