import PaginationCom from "../pagination/PaginationCom";
import Post from "../post/Post";

const getData = async (q, page, cat, limit) => {
  const res = await fetch(
    `http://localhost:3000/api/posts?q=${q}&cat=${cat}&page=${page}&limit=${limit}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    return "Something went wrong";
  }
  return res.json();
};

const Posts = async ({ q, page, cat }) => {
  const limit = 5;
  const { posts, count } = await getData(q, page, cat, limit);
  const hasPrev = limit * (page - 1) > 0;
  const hasNext = limit * (page - 1) + limit < count;
  return (
    <div>
      {posts?.length ? (
        posts?.map((item) => (
          <Post key={item.id} post={item} user={item.user} />
        ))
      ) : (
        <div className="flex items-center justify-center min-h-[400px]">
          <span className="text-xl">No Post Found!</span>
        </div>
      )}
      {posts?.length ? (
        <PaginationCom page={page} hasPrev={hasPrev} hasNext={hasNext} />
      ) : null}
    </div>
  );
};

export default Posts;
