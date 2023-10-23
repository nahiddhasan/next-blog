"use client";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:flex flex-1 items-center ring-1 ring-zinc-700 bg-zinc-800 text-zinc-200 rounded-md">
      <FaSearch onClick={() => setOpen(!open)} className="m-2" />
      <input
        type="text"
        placeholder="Search"
        className={`${
          open
            ? "absolute w-[250px] z-10 p-4 top-14 left-0 right-0 mx-auto bg-inherit rounded-md "
            : "hidden"
        }  md:block border-none outline-none bg-transparent  placeholder:text-zinc-300 p-2 py-1`}
      />
    </div>
  );
};

export default Search;
