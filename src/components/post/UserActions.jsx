import { AiOutlineEye } from "react-icons/ai";
const UserActions = ({ cat, views, createdAt }) => {
  return (
    <div className="flex gap-4 text-white">
      <span>{createdAt}</span>
      <span className="px-2 rounded-full bg-zinc-700 cursor-pointer">
        {cat}
      </span>
      <span className="flex items-center gap-1">
        <AiOutlineEye className="text-white text-xl" />
        {views}
      </span>
    </div>
  );
};

export default UserActions;
