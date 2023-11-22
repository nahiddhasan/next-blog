import Image from "next/image";

const Content = ({ img, desc }) => {
  return (
    <div className="my-4 flex flex-col item-center justify-center">
      {img && <Image src={img} height={600} width={700} alt="" />}
      <div
        className="my-8 text-zinc-300"
        dangerouslySetInnerHTML={{ __html: desc }}
      />
    </div>
  );
};

export default Content;
