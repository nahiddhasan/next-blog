"use client";
import Link from "next/link";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { sliders } from "../../../data";

const Hero = () => {
  return (
    <div className="h-[calc(90vh-48px)] bg-yellow-300">
      <Swiper
        className="h-full w-full"
        modules={[Pagination, Autoplay, EffectFade]}
        slidesPerView={1}
        effect={"fade"}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
      >
        {sliders.map((item) => (
          <SwiperSlide
            key={item.id}
            style={{
              backgroundImage: `url(${item.img})`,
            }}
            className="bg-cover bg-no-repeat"
          >
            <div className="h-full flex-1 flex justify-center px-20 bg-gradient-to-t from-zinc-900 to-transparent">
              <div className="flex-1 flex items-start justify-center flex-col gap-4 ">
                <h1 className="text-white font-bold text-[80px] leading-[80px] bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
                  {item.title}
                </h1>
                <p className="text-white text-2xl">{item.desc}</p>
                <Link
                  href="/"
                  className="bg-yellow-400 hover:bg-yellow-300 text-black p-2 px-4 rounded-full"
                >
                  Start Reading
                </Link>
              </div>
              <div className="flex-1"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
