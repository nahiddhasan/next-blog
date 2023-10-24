"use client";

import { styles } from "@/app/styles";

import Link from "next/link";
import { useState } from "react";
import { BiCategory } from "react-icons/bi";
import { categories } from "../../../data";

const SidebarCategories = () => {
  const [more, setMore] = useState(false);
  return (
    <div
      className={`my-4 flex flex-col w-full bg-zinc-900 ${
        more ? "h-max" : "h-[250px]"
      } transition-all duration-1000 overflow-hidden relative`}
    >
      <h1 className="flex items-center gap-2 text-zinc-400 mb-2">
        <BiCategory /> Categorie&apos;s
      </h1>
      <div
        className={`${styles.categories} w-full flex flex-wrap gap-4 px-3 py-1 rounded-md`}
      >
        {categories.map((item) => (
          <Link
            href={`/${item.path}`}
            key={item}
            className="cursor-pointer px-3 p-1 rounded-full"
          >
            {item.title}
          </Link>
        ))}
      </div>
      <button
        onClick={() => setMore(!more)}
        className="absolute bottom-0 left-0 right-0 mx-auto bg-zinc-700 rounded-full w-max px-4 shadow-xl"
      >
        {!more ? "See More..." : "See Less..."}
      </button>
    </div>
  );
};

export default SidebarCategories;
