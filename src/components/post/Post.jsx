import Image from "next/image";
import Link from "next/link";

import User from "../user/User";
import UserActions from "./UserActions";

const Post = ({ post, user }) => {
  return (
    <div className="max-w-[1366px] mx-auto  text-white gap-4 ring-1 ring-zinc-800 p-4 rounded-sm mb-6 hover:shadow-md shadow-zinc-500">
      {/* content */}
      <div className="flex flex-col justify-between">
        {/* user info */}
        {user && (
          <User
            img={user?.image}
            name={user?.name}
            bio={user?.bio}
            userId={user?.id}
          />
        )}
        {/* post content  */}
        <Link
          href={`/singlepost/${post?.id}`}
          className="flex flex-col md:flex-row justify-between gap-4 my-2 "
        >
          <div className="w-full md:w-[70%]">
            <h2 className="text-xl font-bold">{post?.title}</h2>
            <div
              className="text-zinc-300"
              dangerouslySetInnerHTML={{
                __html: post?.des.substring(0, 120),
              }}
            />
          </div>

          {post?.img && (
            <div className="relative h-[180px] w-full md:w-[30%]">
              <Image src={post?.img} fill alt="" className="object-cover" />
            </div>
          )}
        </Link>

        {/* details */}
        <UserActions
          cat={post?.catSlug}
          views={post?.views}
          createdAt={post?.createdAt}
        />
      </div>
    </div>
  );
};

export default Post;
