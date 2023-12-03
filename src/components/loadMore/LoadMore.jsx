"use client";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { LoaderSm } from "../loader/Loader";

const LoadMore = ({ isReachingEnd, setSize, size, isLoadingMore }) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      setSize(size + 1);
    }
  }, [inView]);

  return <div ref={ref}>{!isReachingEnd && isLoadingMore && <LoaderSm />}</div>;
};

export default LoadMore;
