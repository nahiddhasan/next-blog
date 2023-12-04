import { getPosts } from "@/utills/actions";
import PostLoadMore from "../loadMore/PostLoadMore";
import Post from "../post/Post";

const Posts = async ({ q, cat }) => {
  const page = 1;
  const limit = 5;
  const { posts, count } = await getPosts(q, cat, page, limit);
  return (
    <div className="-z-10">
      {posts?.length ? (
        posts?.map((item) => (
          <Post key={item.id} post={item} user={item.user} />
        ))
      ) : (
        <div className="flex items-center justify-center min-h-[400px]">
          <span className="text-xl">No Post Found!</span>
        </div>
      )}
      <PostLoadMore q={q} cat={cat} limit={limit} count={count} />
    </div>
  );
};

export default Posts;
