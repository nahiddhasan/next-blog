import Categories from "@/components/categories/Categories";
import Hero from "@/components/hero/Hero";
import Posts from "@/components/posts/Posts";
import Sidebar from "@/components/sidebar/Sidebar";

const getData = async () => {
  const res = await fetch(`http://localhost:3000/api/category`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return "Something went wrong";
  }
  return res.json();
};

const MainPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const cat = searchParams?.cat || "";
  const page = parseInt(searchParams?.page || 1);
  const categories = await getData();
  return (
    <div className=" max-w-[1366px] relative h-full">
      <Hero />
      <Categories categories={categories} />
      <div className="flex w-full p-4 gap-4 bg-zinc-900">
        <section className="flex-[3]">
          <Posts q={q} page={page} cat={cat} />
        </section>
        <aside className="flex-[1] hidden md:block">
          <Sidebar categories={categories} />
        </aside>
      </div>
    </div>
  );
};

export default MainPage;
