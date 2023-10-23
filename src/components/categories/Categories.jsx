"use client";

import { styles } from "@/app/styles";
import { useRef } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
// import "swiper/css";
// import "swiper/css/navigation";

// import { FreeMode, Navigation } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { categories } from "../../../data";

const Categories = () => {
  const catRef = useRef();

  return (
    <div className="flex gap-4 w-[700px] overflow-x-auto text-white">
      {/* <Swiper
        modules={[Navigation, FreeMode]}
        freeMode={true}
        loop={true}
        navigation={true}
        slidesPerView={5}
      >
        {categories.map((categorie) => (
          <SwiperSlide key={categorie}>
            <span className={`px-2 p-1 rounded-full`}>{categorie}</span>
          </SwiperSlide>
        ))}
      </Swiper> */}
      <span>
        <AiOutlineLeft className="p-2 rounded-full text-zinc-900 text-2xl bg-white" />
      </span>
      <ul
        ref={catRef}
        className={`${styles.categories} list flex gap-4 overflow-x-scroll no-scrollbar bg-gray-300 px-3 py-1 rounded-md`}
      >
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>7</li>
        <li>7</li>
        <li>7</li>
        <li>7</li>
        <li>7</li>
        <li>7</li>
        <li>7</li>
        <li>7</li>
        <li>7</li>
        <li>7</li>
        <li>7</li>
        <li>7</li>
        <li>7</li>
        <li>7</li>
        <li>7</li>
        <li>7</li>
        <li>7</li>
        <li>7</li>
        <li>7</li>
        <li>7</li>
        <li>7</li>
        <li>7</li>
        <li>7</li>
        <li>7</li>
        <li>7</li>
      </ul>
      <span>
        <AiOutlineRight className="p-2 rounded-full text-zinc-900 text-2xl bg-white" />
      </span>
    </div>
  );
};

export default Categories;
