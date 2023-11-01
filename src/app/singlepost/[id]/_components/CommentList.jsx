import moment from "moment";
import Image from "next/image";

const CommentList = ({ comment }) => {
  return (
    <div>
      {/* user  */}
      <div className="flex items-center gap-2">
        <Image
          src={comment.user.image || "/img/avatar.png"}
          height={40}
          width={40}
          className="object-cover cursor-pointer rounded-full"
          alt="userimg"
        />
        <div className="flex flex-col">
          <span className="cursor-pointer">{comment.user.name}</span>
          <span className="cursor-pointer text-sm">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
      </div>
      <p className="my-2 text-sm">{comment.body}</p>
      <hr className="my-3 h-[1px] border-zinc-700" />
    </div>
  );
};

export default CommentList;
