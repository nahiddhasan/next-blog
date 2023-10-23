import Image from "next/image";
import Link from "next/link";
import User from "./User";
import UserActions from "./UserActions";

const Post = () => {
  return (
    <div className="flex odd:flex-row-reverse text-white gap-4 ring-1 ring-zinc-800 p-2 rounded-sm mb-6 hover:shadow-md shadow-zinc-500">
      <div className="flex flex-col gap-2">
        {/* user info */}
        <User />
        {/* content */}
        <Link href={"/singlepost/1"} className="flex gap-2 flex-col">
          <h2 className="text-xl font-bold">Title goes here</h2>
          <p className="text-zinc-300">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. At, nam
            error! Quis, beatae? Sint dicta sit iusto corporis itaque iste.
          </p>
        </Link>
        {/* details */}
        <UserActions />
      </div>
      <Image src={"/img/ss.jpg"} height={250} width={250} alt="" />
    </div>
  );
};

export default Post;
