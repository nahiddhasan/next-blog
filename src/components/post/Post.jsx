import Image from "next/image";
import Link from "next/link";

import User from "../user/User";
import UserActions from "./UserActions";

const Post = ({ post, user }) => {
  return (
    <div className="max-w-[1366px] mx-auto flex text-white gap-4 ring-1 ring-zinc-800 p-2 rounded-sm mb-6 hover:shadow-md shadow-zinc-500">
      <div className="flex flex-col gap-2">
        {/* user info */}
        {user && (
          <User
            img={user?.image}
            name={user?.name}
            bio={user?.bio}
            userId={user?.id}
          />
        )}
        {/* content */}
        <Link href={`/singlepost/${post?.id}`} className="flex gap-2 flex-col">
          <h2 className="text-xl font-bold">{post?.title}</h2>
          <p className="text-zinc-300">{post?.des.substring(0,120)}</p>
        </Link>
        {/* details */}
        <UserActions
          cat={post?.catSlug}
          views={post?.views}
          createdAt={post?.createdAt}
        />
      </div>
      {post?.img && <Image src={post?.img} height={250} width={250} alt="" />}
    </div>
  );
};

export default Post;
