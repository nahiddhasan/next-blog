import Search from "@/components/navbar/Search";
import Link from "next/link";
const getData = async (q) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/category?q=${q}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    return "Something went wrong";
  }
  return res.json();
};
const CategoyList = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const categories = await getData(q);
  return (
    <div className="max-w-[1366px] relative h-full">
      <div className="p-4">
        <h1 className="text-center text-6xl py-8 capitalize font-bold">
          Categories
        </h1>
        <hr className="my-2 h-[1px] border-zinc-700" />
        <div className=" flex items-center justify-center flex-col">
          <div className="w-[350px] mt-4">
            <Search placeholder={"Search Category"} />
          </div>
          {/* categories list */}
          <div className="flex items-center justify-center my-5 w-[60%]">
            <div
              className={`catBg w-full flex flex-wrap gap-4 px-3 py-8 rounded-md`}
            >
              {categories.length ? (
                categories.map((item) => (
                  <Link
                    href={`category/${item.slug}`}
                    key={item}
                    className="cursor-pointer px-3 p-1 rounded-full hover:bg-opacity-50 hover:text-opacity-75"
                  >
                    {item.title}
                  </Link>
                ))
              ) : (
                <span className="mx-auto  !bg-inherit !text-inherit ">
                  Nothing Found!
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoyList;
