import CategoryLoadMore from "@/components/loadMore/CategoryLoadMore";
import Post from "@/components/post/Post";
import { CategoryData } from "@/utills/actions";

const Category = async ({ params, searchParams }) => {
  const { slug } = params;
  const q = searchParams?.q || "";
  const page = 1;
  const limit = 5;
  const { posts, count } = await CategoryData(slug, q, page, limit);

  return (
    <div className="max-w-[1000px] mx-auto relative h-full">
      <div className="p-4">
        <h1 className="text-center text-6xl py-8 capitalize font-bold">
          {slug}
        </h1>
        <hr className="my-2 h-[1px] border-zinc-700" />
        <div className="min-h-[50vh]">
          {posts.length ? (
            posts.map((item) => (
              <Post key={item.id} post={item} user={item.user} />
            ))
          ) : (
            <div className="flex items-center justify-center min-h-[400px]">
              <span className="text-xl">No Post Found!</span>
            </div>
          )}
          <CategoryLoadMore q={q} slug={slug} limit={limit} count={count} />
        </div>
      </div>
    </div>
  );
};

export default Category;
