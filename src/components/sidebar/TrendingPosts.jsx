import { BiTrendingUp } from "react-icons/bi";
import User from "../user/User";

const SignlePost = () => {
  return (
    <>
      <div className="flex flex-col">
        <User
          userId={123}
          img={"/img/avatar.png"}
          name={"John Doe"}
          bio={"this is bio"}
        />
        <h2 className="text-sm font-semibold">Title goes here</h2>
      </div>
      <hr className="my-2 h-[1px] border-zinc-700" />
    </>
  );
};

const TrendingPosts = () => {
  return (
    <div className="">
      <h1 className="flex items-center gap-2 text-zinc-400 mb-2">
        <BiTrendingUp /> Trending&apos;s
      </h1>
      <SignlePost />
      <SignlePost />
      <SignlePost />
    </div>
  );
};

export default TrendingPosts;
