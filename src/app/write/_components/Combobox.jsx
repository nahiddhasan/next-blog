"use client";
import useOutsideClick from "@/hooks/outsideClick";
import fetcher from "@/utills/fetcher";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { LuChevronsUpDown } from "react-icons/lu";
import useSWR from "swr";

const Combobox = (props) => {
  const { selected, setSelected } = props;
  const [searchText, setSearchText] = useState(null);
  const [openDropdown, setOpenDropdrown] = useState();

  const { data: categories, isLoading } = useSWR(
    `http://localhost:3000/api/category/cat?q=${searchText}`,
    fetcher
  );

  const onChange = (e) => {
    if (e.target.value) {
      setSearchText(e.target.value);
    }
  };
  const handleCategory = (item) => {
    setSelected(item);
    setOpenDropdrown(false);
  };

  const refs = useOutsideClick(() => {
    setOpenDropdrown(false);
  });

  return (
    <div className="flex flex-col gap-2">
      <div
        onClick={() => setOpenDropdrown((open) => !open)}
        className="w-[200px] flex items-center justify-between ring-1 ring-zinc-600 p-2 cursor-pointer rounded-md hover:bg-zinc-600"
      >
        <span>{selected ? selected : "Select Category"}</span>
        <LuChevronsUpDown />
      </div>
      {openDropdown && (
        <div
          ref={refs}
          className={`${
            openDropdown ? "zoomin block" : "hidden"
          } w-[200px] max-h-[300px] ring-1 ring-zinc-600 p-2 rounded-md overflow-y-auto`}
        >
          <div className="flex items-center">
            <IoSearch size={22} />
            <input
              type="text"
              placeholder="Search"
              onChange={onChange}
              className="w-full px-2 p-1 bg-transparent border-none outline-none"
            />
          </div>
          <hr className="border-b border-zinc-700" />
          <div className="flex flex-col mt-2">
            {isLoading
              ? "Loading.."
              : categories?.length
              ? categories.map((cat) => (
                  <span
                    key={cat.id}
                    onClick={() => handleCategory(cat.title)}
                    className="hover:bg-zinc-600 rounded-md py-1 px-4"
                  >
                    {cat.title}
                  </span>
                ))
              : "not found!"}
          </div>
        </div>
      )}
    </div>
  );
};

export default Combobox;
