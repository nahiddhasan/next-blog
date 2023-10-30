import Categories from "@/components/categories/Categories";
import Hero from "@/components/hero/Hero";
import Post from "@/components/post/Post";
import Sidebar from "@/components/sidebar/Sidebar";

const getData = async () => {
  const res = await fetch(`http://localhost:3000/api/posts`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return "Something went wrong";
  }
  return res.json();
};

const MainPage = async () => {
  const posts = await getData();

  return (
    <div className=" max-w-[1366px] relative h-full">
      <Hero />
      <Categories />
      <div className="flex w-full p-4 gap-4 bg-zinc-900">
        <section className="flex-[3]">
          {posts.length ? (
            posts.map((item) => (
              <Post key={item.id} post={item} user={item.user} />
            ))
          ) : (
            <span>No Post Found</span>
          )}
        </section>
        <aside className="flex-[1]">
          <Sidebar />
        </aside>
      </div>
    </div>
  );
};

export default MainPage;
