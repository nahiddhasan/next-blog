import { AiOutlineEye } from "react-icons/ai";
const UserActions = () => {
  return (
    <div className="flex gap-4 text-white">
      <span>Jaune 15</span>
      <span className="px-2 rounded-full bg-zinc-700 cursor-pointer">
        Music
      </span>
      <span className="flex items-center gap-1">
        <AiOutlineEye className="text-white text-xl" />
        1k
      </span>
    </div>
  );
};

export default UserActions;
