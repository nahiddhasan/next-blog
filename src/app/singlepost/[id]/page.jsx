import User from "@/components/user/User";
import Content from "./_components/Content";
import UserActions from "./_components/UserActions";

const SinglePost = () => {
  return (
    <div className="text-white max-w-[1000px] mx-auto mt-6">
      {/* title */}
      <div className="py-6">
        <h1 className="text-5xl font-bold mb-3">
          Let’s Stop Calling It “Content”
        </h1>
        <h3 className="text-2xl text-zinc-400">
          Hollywood and tech firms want to reduce culture to a slurry of
          interchangeable bits. Let’s not help them out
        </h3>
      </div>
      {/* author */}
      <User
        userId={123}
        img={"/img/avatar.png"}
        name={"John Doe"}
        bio={"this is bio "}
        createdAt={"12 jan"}
      />
      {/* useractions */}
      <UserActions />
      {/* content */}
      <Content />
      {/* useractions */}
      <UserActions />
    </div>
  );
};

export default SinglePost;
