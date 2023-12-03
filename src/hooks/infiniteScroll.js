import fetcher from "@/utills/fetcher";
import useSWRInfinite from "swr/infinite";


const useInfiniteScroll =(url)=>{
  const limit = 5;
  const { data, mutate, size, setSize, isLoading } = useSWRInfinite(
    (index) =>
      `${url}&limit=${limit}&page=${
        index + 1
      }`,
    fetcher
  );

  const fetchData = data ? [].concat(...data) : [];
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < limit);

    return {
      fetchData,isLoadingMore,isEmpty,isReachingEnd,mutate,size,setSize,isLoading
    }
}
export default useInfiniteScroll;