import Categories from "@/components/categories/Categories";
import Hero from "@/components/hero/Hero";
import Post from "@/components/post/Post";
import Sidebar from "@/components/sidebar/Sidebar";

const MainPage = () => {
  return (
    <div className=" max-w-[1366px] relative h-full">
      <Hero />
      <Categories />
      <div className="flex w-full p-4 gap-4 bg-zinc-900">
        <section className="flex-[3]">
          <Post />
          <Post />
          <Post />
        </section>
        <aside className="flex-[1]">
          <Sidebar />
        </aside>
      </div>
    </div>
  );
};

export default MainPage;
