"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

const InfiniteScroll = ({ page }) => {
  const ref = useRef();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const params = new URLSearchParams(searchParams);
        params.set("page", page + 1);

        replace(`${pathName}?${params}`);
      }
    });
    observer.observe(ref.current);
  }, []);

  return <div ref={ref} />;
};

export default InfiniteScroll;
