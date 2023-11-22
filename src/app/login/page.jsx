"use client";
import Loader from "@/components/loader/Loader";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const { status, session } = useSession();

  if (status === "loading") {
    return <Loader />;
  }
  if (status === "authenticated") {
    router.push("/");
  }

  return (
    <div className="w-screen h-[calc(100vh-48px)} my-10">
      <div className="w-[500px] h-[80vh] m-auto ring-1 ring-zinc-700 p-6 rounded-md">
        <h1 className="text-4xl my-10 text-center">Login</h1>
        <div className="flex flex-col gap-4 items-center justify-center">
          <button
            target="blank"
            onClick={() => signIn("google")}
            className="ring-1 ring-zinc-700 hover:bg-zinc-700 transition-all rounded-full py-2 w-full"
          >
            Login with google
          </button>
          <button className="ring-1 ring-zinc-700 hover:bg-zinc-700 transition-all rounded-full py-2 w-full">
            Login with github
          </button>
          <button className="ring-1 ring-zinc-700 hover:bg-zinc-700 transition-all rounded-full py-2 w-full">
            Login with Phone Number
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
