import { getAuthSession } from "@/utills/auth";
import Link from "next/link";
import { BsPencilSquare } from "react-icons/bs";
import { FaBlogger } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import MobileNav from "./MobileNav";
import Profile from "./Profile";
import Search from "./Search";

const Navbar = async () => {
  const session = await getAuthSession();
  return (
    <div className="z-10 sticky top-0 bg-zinc-900 border-b border-zinc-700">
      <div className="h-12 max-w-[1366px] flex items-center m-auto px-4 justify-between bord">
        {/* logo */}
        <Link
          href={"/"}
          className="flex flex-1 items-center gap-3 h-8 text-rose-500"
        >
          <FaBlogger className="text-2xl text-yellow-400" />
          <span className="font-bold text-2xl">
            Blogge<span className="text-yellow-400 font-extrabold">.</span>
          </span>
        </Link>
        {/* search bar */}
        <div className="hidden md:block">
          <Search placeholder={"Search"} />
        </div>
        {/* Menu item */}
        {/* mobile menu */}
        <MobileNav user={session?.user} />
        {/* desktop nav */}
        <div className="text-white items-center gap-3 hidden lg:flex flex-1 justify-end">
          <Link
            className="text-zinc-400 hover:text-zinc-50 transition-all flex items-center gap-3 "
            href={session?.user ? "/write" : "/login"}
          >
            <BsPencilSquare className="text-lg" />
            Write
          </Link>
          <IoIosNotificationsOutline className="text-2xl text-zinc-400 hover:text-zinc-50 cursor-pointer" />
          <Profile user={session?.user} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
