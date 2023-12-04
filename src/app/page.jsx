import Categories from "@/components/categories/Categories";
import Hero from "@/components/hero/Hero";
import Posts from "@/components/posts/Posts";
import Sidebar from "@/components/sidebar/Sidebar";

const MainPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const cat = searchParams?.cat || "";
  return (
    <div className=" max-w-[1366px] mx-auto relative h-full">
      <Hero />
      <div className="flex w-full p-4 gap-4 bg-zinc-900">
        <section className="w-full md:w-3/4 ">
          <Categories />
          <Posts q={q} cat={cat} />
        </section>
        <aside className="hidden md:block w-1/4">
          <Sidebar />
        </aside>
      </div>
    </div>
  );
};

export default MainPage;
