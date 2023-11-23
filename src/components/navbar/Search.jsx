"use client";
import { debounce } from "debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaSearch } from "react-icons/fa";

const Search = ({ placeholder }) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const handleChange = debounce((e) => {
    const params = new URLSearchParams(searchParams);
    if (e.target.value) {
      e.target.value.length > 1 && params.set("q", e.target.value);
    } else {
      params.delete("q");
    }
    replace(`${pathName}?${params}`);
  }, 500);

  return (
    <div className="flex flex-1 items-center ring-1 ring-zinc-700 bg-zinc-800 text-zinc-200 rounded-md">
      <FaSearch className="m-2" />
      <input
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
        className={`border-none outline-none bg-transparent  placeholder:text-zinc-300 p-2 py-1`}
      />
    </div>
  );
};

export default Search;
