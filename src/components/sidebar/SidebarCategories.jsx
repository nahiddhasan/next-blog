import Link from "next/link";
import { BiCategory } from "react-icons/bi";

const SidebarCategories = ({ categories }) => {
  return (
    <div
      className={`my-4 flex flex-col w-full bg-zinc-900 transition-all duration-1000 overflow-hidden relative`}
    >
      <h1 className="flex items-center gap-2 text-zinc-400 mb-2">
        <BiCategory /> Categorie&apos;s
      </h1>
      <div className={`catBg w-full flex flex-wrap gap-4 px-3 py-1 rounded-md`}>
        {categories.splice(0, 8).map((item) => (
          <Link
            href={`category/${item.slug}`}
            key={item.slug}
            className="cursor-pointer px-3 p-1 rounded-full"
            suppressHydrationWarning
          >
            {item.title}
          </Link>
        ))}
      </div>
      <Link
        href={"/category"}
        className="w-max px-2 shadow-xl ml-4 mt-2 hover:underline hover:text-blue-500"
      >
        See More
      </Link>
    </div>
  );
};

export default SidebarCategories;
