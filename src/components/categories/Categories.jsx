"use client";

import { useRef } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Categories = ({ categories }) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  const catRef = useRef();
  //navigate left and right
  const handleClick = (type) => {
    if (type === "left") {
      catRef.current.scrollLeft -= 150;
    } else {
      catRef.current.scrollLeft += 150;
    }
  };
  let isDragging = false;
  let startX;
  let scrollLeft;
  const dragstart = (e) => {
    isDragging = true;
    e.preventDefault();
    startX = e.pageX || e.touches[0].pageX - catRef.current.offsetLeft;
    scrollLeft = catRef.current.scrollLeft;
  };
  const dragging = (e) => {
    if (!isDragging) return;
    const x = e.pageX || e.touches[0].pageX - catRef.current.offsetLeft * 10;
    const dist = x - startX;
    catRef.current.scrollLeft = scrollLeft - dist;
  };
  const draggingStop = () => {
    isDragging = false;
  };

  //fetch post based on category
  const handleCatClick = (cat) => {
    params.set("cat", cat);
    replace(`${pathName}?${params}`);
  };
  const handleAll = () => {
    params.delete("cat");
    replace(`${pathName}?${params}`);
  };
  return (
    <div className="flex items-center gap-4 w-full bg-zinc-900 p-4 md:p-6 lg:p-12 px-4 md:px-14 lg:px-20">
      <span onClick={() => handleClick("left")}>
        <AiOutlineLeft className="p-2 rounded-full text-2xl bg-zinc-700 text-white cursor-pointer" />
      </span>
      <div
        ref={catRef}
        onMouseDown={dragstart}
        onMouseMove={dragging}
        onMouseUp={draggingStop}
        onTouchStart={dragstart}
        onTouchMove={dragging}
        className={`catBg scroll-smooth select-none flex gap-4 overflow-x-scroll no-scrollbar px-3 py-1 rounded-md`}
      >
        <span
          onClick={handleAll}
          className="cursor-pointer px-3 p-1 rounded-full"
        >
          All
        </span>
        {categories.map((item) => (
          <span
            onClick={() => handleCatClick(item.title)}
            key={item}
            className="cursor-pointer px-3 p-1 rounded-full"
          >
            {item.title}
          </span>
        ))}
      </div>
      <span onClick={() => handleClick("right")}>
        <AiOutlineRight className="p-2 rounded-full text-2xl bg-zinc-700 text-white cursor-pointer" />
      </span>
    </div>
  );
};

export default Categories;
