"use client";
import { debounce } from "debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();
  const [open, setOpen] = useState(false);

  const handleChange = debounce((e) => {
    const params = new URLSearchParams(searchParams);
    if (e.target.value) {
      e.target.value.length > 2 && params.set("q", e.target.value);
    } else {
      params.delete("q");
    }
    replace(`${pathName}?${params}`);
  }, 500);

  return (
    <div className="md:flex flex-1 items-center ring-1 ring-zinc-700 bg-zinc-800 text-zinc-200 rounded-md">
      <FaSearch onClick={() => setOpen(!open)} className="m-2" />
      <input
        type="text"
        placeholder="Search"
        onChange={handleChange}
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
