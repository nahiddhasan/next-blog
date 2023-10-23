import Image from "next/image";

const User = () => {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={"/img/avatar.png"}
        height={40}
        width={40}
        className="object-cover cursor-pointer"
        alt="userimg"
      />
      <span className="text-lg cursor-pointer">John Doe</span>
    </div>
  );
};

export default User;
