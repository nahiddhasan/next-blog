import Image from "next/image";

const Content = ({ img, desc }) => {
  return (
    <div className="my-4 flex flex-col item-center justify-center">
      <Image src={img} height={600} width={700} alt="" />
      <p className="my-8 text-xl text-zinc-300">{desc}</p>
    </div>
  );
};

export default Content;
