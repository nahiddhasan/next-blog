import Link from "next/link";
import { FaBlogger } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="flex justify-between items-center h-8 max-w-[1366px] px-4 mx-auto border-t border-zinc-700">
      {/* left  */}
      <div className="flex-1 text-sm">
        <span>All right Reserved blogge. &copy;</span>
      </div>
      {/* center */}
      <Link
        href={"/"}
        className="flex flex-1 items-center justify-center gap-3 h-8 text-rose-500"
      >
        <FaBlogger className="text-xl text-yellow-400" />
        <span className="font-bold text-xl">
          Blogge<span className="text-yellow-400 font-extrabold">.</span>
        </span>
      </Link>
      {/* right */}
      <div className="flex-1 flex items-center justify-end text-sm">
        <Link href="#">Privacy Policy</Link> |
        <Link href="#">Terms of Service</Link>
      </div>
    </div>
  );
};

export default Footer;
