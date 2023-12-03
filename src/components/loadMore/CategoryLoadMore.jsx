"use client";
// let page = 2;
import { CategoryData } from "@/utills/actions";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { LoaderSm } from "../loader/Loader";
import Post from "../post/Post";

const CategoryLoadMore = ({ slug, q, limit, count }) => {
  const { ref, inView } = useInView();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(2);
  const [isLoading, setisLoading] = useState(false);
  const hasNext = limit * (page - 2) + limit < count;
  useEffect(() => {
    if (inView) {
      setisLoading(true);
      const timeOut = setTimeout(() => {
        CategoryData(slug, q, page, limit).then((res) => {
          setData([...data, ...res.posts]);
          setPage((page) => page + 1);
        });
        setisLoading(false);
      }, 500);
      return () => clearTimeout(timeOut);
    }
  }, [data, inView]);
  return (
    <>
      <div>
        {data?.map((item) => (
          <Post key={item.id} post={item} user={item.user} />
        ))}
      </div>
      {hasNext && <div ref={ref}>{inView && isLoading && <LoaderSm />}</div>}
    </>
  );
};

export default CategoryLoadMore;
