import Image from "next/image";

const CommentList = () => {
  return (
    <div>
      {/* user  */}
      <div className="flex items-center gap-2">
        <Image
          src={"/img/avatar.png"}
          height={40}
          width={40}
          className="object-cover cursor-pointer rounded-full"
          alt="userimg"
        />
        <div className="flex flex-col">
          <span className="cursor-pointer">John Doe</span>
          <span className="cursor-pointer text-sm">1 hour ago</span>
        </div>
      </div>
      <p className="my-2 text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum possimus
        tenetur, ut tempora fugiat quod quidem delectus commodi maiores dolorum?
      </p>
      <hr className="my-3 h-[1px] border-zinc-700" />
    </div>
  );
};

export default CommentList;
