import Image from "next/image";
import { GiSelfLove } from "react-icons/gi";

const SignlePost = () => {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Image
            src={"/img/avatar.png"}
            height={30}
            width={30}
            className="object-cover cursor-pointer rounded-full"
            alt="userimg"
          />
          <span className="text-sm cursor-pointer">John Doe</span>
        </div>
        <h2 className="text-sm font-semibold">Title goes here</h2>
      </div>
      <hr className="my-2 !border-[.5px] border-zinc-700" />
    </>
  );
};

const EditorsPic = () => {
  return (
    <div className="">
      <h1 className="flex items-center gap-2 text-zinc-400 mb-2">
        <GiSelfLove /> Editor&apos;s Pick&apos;s
      </h1>
      <SignlePost />
      <SignlePost />
      <SignlePost />
    </div>
  );
};

export default EditorsPic;
