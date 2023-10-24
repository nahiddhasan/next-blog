"use client";

import { styles } from "@/app/styles";
import { useEffect, useRef } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import Link from "next/link";
import { categories } from "../../../data";

const Categories = () => {
  const catRef = useRef();
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
    const x = e.pageX || e.touches[0].pageX - catRef.current.offsetLeft;
    const dist = x - startX;
    catRef.current.scrollLeft = scrollLeft - dist;
  };
  const draggingStop = () => {
    isDragging = false;
  };

  useEffect(() => {
    catRef.current.addEventListener("mousedown", dragstart);
    catRef.current.addEventListener("touchstart", dragstart);
    catRef.current.addEventListener("touchmove", dragging);
    catRef.current.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", draggingStop);
  }, []);

  return (
    <div className="flex items-center gap-4 w-full bg-zinc-900 p-12 px-20">
      <span onClick={() => handleClick("left")}>
        <AiOutlineLeft className="p-2 rounded-full text-2xl bg-zinc-700 text-white cursor-pointer" />
      </span>
      <div
        ref={catRef}
        className={`${styles.categories} scroll-smooth select-none flex gap-4 overflow-x-scroll no-scrollbar px-3 py-1 rounded-md`}
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
      <span onClick={() => handleClick("right")}>
        <AiOutlineRight className="p-2 rounded-full text-2xl bg-zinc-700 text-white cursor-pointer" />
      </span>
    </div>
  );
};

export default Categories;
