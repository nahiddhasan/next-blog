import PaginationCom from "@/components/pagination/PaginationCom";
import Post from "@/components/post/Post";

const getData = async (slug, q, page, limit) => {
  const res = await fetch(
    `http://localhost:3000/api/category/${slug}?q=${q}&page=${page}&limit=${limit}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    return "Something went wrong";
  }
  return res.json();
};

const Category = async ({ params, searchParams }) => {
  const { slug } = params;
  const q = searchParams?.q || "";
  const page = parseInt(searchParams?.page || 1);
  const limit = 5;
  const { posts, count } = await getData(slug, q, page, limit);

  const hasPrev = limit * (page - 1) > 0;
  const hasNext = limit * (page - 1) + limit < count;
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
          {posts.length ? (
            <PaginationCom page={page} hasPrev={hasPrev} hasNext={hasNext} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Category;
