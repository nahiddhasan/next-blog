import Image from "next/image";
import Link from "next/link";

import User from "../user/User";
import UserActions from "./UserActions";

const Post = ({ post, user }) => {
  return (
    <div className="max-w-[1366px] mx-auto  text-white gap-4 ring-1 ring-zinc-800 p-4 rounded-sm mb-6 hover:shadow-md shadow-zinc-500">
      {/* user info */}
      {user && (
        <User
          img={user?.image}
          name={user?.name}
          bio={user?.bio}
          userId={user?.id}
        />
      )}
      <div className="flex flex-col-reverse md:flex-row justify-between gap-4 my-2">
        {/* content */}
        <div className="flex flex-col">
          <Link
            href={`/singlepost/${post?.id}`}
            className="flex gap-2 flex-col mb-2"
          >
            <h2 className="text-xl font-bold">{post?.title}</h2>
            <div
              className="text-zinc-300"
              dangerouslySetInnerHTML={{
                __html: post?.des.substring(0, 120),
              }}
            />
          </Link>

          {/* details */}
          <UserActions
            cat={post?.catSlug}
            views={post?.views}
            createdAt={post?.createdAt}
          />
        </div>
        {post?.img && (
          <Image
            src={post?.img}
            height={250}
            width={250}
            alt=""
            className="object-cover"
          />
        )}
      </div>
    </div>
  );
};

export default Post;
