"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const PaginationCom = ({ page, hasPrev, hasNext }) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();
  const handleClick = (type) => {
    const params = new URLSearchParams(searchParams);
    if (type === "prev") {
      params.set("page", page - 1);
    } else {
      params.set("page", page + 1);
    }

    replace(`${pathName}?${params}`);
  };
  return (
    <div className="w-full flex items-center gap-4">
      <button
        disabled={!hasPrev}
        onClick={() => handleClick("prev")}
        className="px-3 p-1 bg-blue-600 hover:bg-blue-400 disabled:bg-blue-400 disabled:cursor-not-allowed border-none outline-none rounded-md"
      >
        Prev
      </button>
      <button
        disabled={!hasNext}
        onClick={() => handleClick("next")}
        className="px-3 p-1 bg-blue-600 hover:bg-blue-400 disabled:bg-blue-400 disabled:cursor-not-allowed border-none outline-none rounded-md"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationCom;
