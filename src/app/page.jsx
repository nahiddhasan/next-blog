import Categories from "@/components/categories/Categories";
import Hero from "@/components/hero/Hero";
import Post from "@/components/post/Post";

const MainPage = () => {
  return (
    <div className=" max-w-[1366px] relative h-full">
      <Hero />
      <div className="flex p-4 py-12 gap-4 bg-zinc-900">
        <section className="flex-[3]">
          <Categories />
          <Post />
          <Post />
          <Post />
        </section>
        <aside className="flex-[2] bg-yellow-300">aside</aside>
      </div>
    </div>
  );
};

export default MainPage;
