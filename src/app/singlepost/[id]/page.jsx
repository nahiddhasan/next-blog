import User from "@/components/user/User";
import Content from "./_components/Content";
import UserActions from "./_components/UserActions";
const getData = async (id) => {
  const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return "Something went wrong";
  }
  return res.json();
};

const SinglePost = async ({ params }) => {
  const { id } = params;
  const post = await getData(id);

  return (
    <div className="text-white max-w-[1000px] min-h-[calc(100vh-48px)] mx-auto mt-6 p-4">
      {/* title */}
      <div className="py-3 md:py-6">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3">
          {post.title}
        </h1>
        <div
          className="my-3 md:my-4 lg:my-8 text-zinc-300"
          dangerouslySetInnerHTML={{ __html: post.des.substring(0, 120) }}
        />
      </div>
      {/* author */}
      <User
        userId={post.user?.id}
        img={post.user?.image || "/img/avatar.png"}
        name={post.user?.name}
        bio={post.user?.bio}
        createdAt={post?.createdAt}
      />
      {/* content */}
      <Content img={post.img} desc={post.des} />
      {/* useractions */}
      <UserActions postId={post.id} commentsCount={post._count.comments} />
    </div>
  );
};

export default SinglePost;
