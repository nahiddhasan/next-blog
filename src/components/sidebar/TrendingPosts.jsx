import { trandings } from "@/utills/actions";
import Link from "next/link";
import { BiTrendingUp } from "react-icons/bi";
import User from "../user/User";

const SignleTrendPost = ({ id, title, user }) => {
  return (
    <>
      <div className="flex flex-col">
        <User
          userId={user.id}
          img={user.image || "/img/avatar.png"}
          name={user.name}
          bio={user.bio}
          top={true}
        />
        <Link className="cursor-pointer" href={`/singlepost/${id}`}>
          <p className="text-sm">{title}</p>
        </Link>
      </div>
      <hr className="my-2 h-[1px] border-zinc-700" />
    </>
  );
};

const TrendingPosts = async () => {
  const trandingsPost = await trandings();
  return (
    <div className="z-50">
      <h1 className="flex items-center gap-2 text-zinc-400 mb-2">
        <BiTrendingUp /> Trending&apos;s
      </h1>
      {trandingsPost.map((item) => (
        <SignleTrendPost
          key={item.id}
          id={item.id}
          title={item.title}
          user={item.user}
        />
      ))}
    </div>
  );
};

export default TrendingPosts;
