import moment from "moment";
import Link from "next/link";
import { AiOutlineEye } from "react-icons/ai";
const UserActions = ({ cat, views, createdAt }) => {
  return (
    <div className="flex gap-4 text-white">
      <span>{moment(createdAt).fromNow()}</span>
      <Link href={`/category/${cat}`} className="px-2 rounded-full bg-zinc-700">
        {cat}
      </Link>
      <span className="flex items-center gap-1">
        <AiOutlineEye className="text-white text-xl" />
        {views}
      </span>
    </div>
  );
};

export default UserActions;
