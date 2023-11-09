import Image from "next/image";
import { BiDotsHorizontalRounded } from "react-icons/bi";

const RightContent = (user, session) => {
  return (
    <div className="flex-[2] ring-1 ring-zinc-800 p-4 text-white">
      <div className="flex flex-col gap-2 items-center mb-6">
        <Image
          src={user?.image || "/img/avatar.png"}
          height={120}
          width={120}
          alt="dp"
          className="object-cover rounded-full"
        />
        <span>{user?.name}</span>
        <div className="flex items-center gap-6 mb-4">
          <span>2.5k Followers</span>
          {session?.user?.email === user.email ? (
            <button
              onClick={() => setModalOpen(true)}
              className="px-3 rounded-full bg-blue-700 hover:bg-blue-600"
            >
              Edit
            </button>
          ) : (
            <button className="px-3 rounded-full bg-blue-700 hover:bg-blue-600">
              Follow
            </button>
          )}
        </div>
        <p>{user?.bio}</p>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xl mb-2">Following</span>
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <Image
              src={"/img/avatar.png"}
              height={20}
              width={20}
              alt="dp"
              className="object-cover rounded-full"
            />
            <span>John Moe</span>
          </div>
          <span>
            <BiDotsHorizontalRounded />
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Image
              src={"/img/avatar.png"}
              height={20}
              width={20}
              alt="dp"
              className="object-cover rounded-full"
            />
            <span>John Moe</span>
          </div>
          <span>
            <BiDotsHorizontalRounded />
          </span>
        </div>
      </div>
    </div>
  );
};

export default RightContent;
