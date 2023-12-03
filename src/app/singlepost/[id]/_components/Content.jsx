import Image from "next/image";

const Content = ({ img, desc }) => {
  return (
    <div className="my-2 md:my-4 flex flex-col item-center justify-center w-full ">
      {img && (
        <div className="w-full h-[300px] md:h-[500px] relative">
          <Image src={img} fill alt="" className="object-contain -z-10" />
        </div>
      )}
      <div
        className="my-8 text-zinc-300 text-xl quill_content"
        dangerouslySetInnerHTML={{ __html: desc }}
      />
    </div>
  );
};

export default Content;
