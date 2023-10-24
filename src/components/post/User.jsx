import Image from "next/image";

const User = () => {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={"/img/avatar.png"}
        height={30}
        width={30}
        className="object-cover cursor-pointer rounded-full"
        alt="userimg"
      />
      <span className="cursor-pointer font-semibold">John Doe</span>
    </div>
  );
};

export default User;
