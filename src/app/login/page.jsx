"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BiLoader } from "react-icons/bi";

const Login = () => {
  const router = useRouter();
  const { status } = useSession();
  if (status === "loading") {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <BiLoader size={100} className="animate-spin" />
      </div>
    );
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
            onClick={() => signIn("google")}
            className="ring-1 ring-zinc-700 rounded-full py-2 w-full"
          >
            Login with google
          </button>
          <button className="ring-1 ring-zinc-700 rounded-full py-2 w-full">
            Login with github
          </button>
          <button className="ring-1 ring-zinc-700 rounded-full py-2 w-full">
            Login with Phone Number
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
