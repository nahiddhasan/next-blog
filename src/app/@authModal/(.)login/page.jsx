"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AiOutlineClose } from "react-icons/ai";

const AuthModal = () => {
  const router = useRouter();
  return (
    <div className="h-screen w-full bg-zinc-800/20 fixed top-0 left-0 z-50 flex items-center justify-center">
      <div className="fixed drop-shadow-md top-[50%] left-[50%] max-h-full h-full md:h-auto md:max-h-[85vh] w-full md:w-[90vw] md:max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-zinc-700 p-8 flex items-center justify-center ">
        <button
          onClick={() => router.back()}
          className="rounded-full hover:bg-zinc-600 h-7 w-7 flex items-center justify-center absolute right-2 top-2"
        >
          <AiOutlineClose />
        </button>

        {/* login form  */}
        <div className="p-5 flex items-center justify-center flex-col gap-8 w-full">
          <h1 className="text-2xl">Login Form</h1>
          <div className="flex flex-col gap-4 items-center justify-center w-full">
            <button
              onClick={() => signIn("google")}
              className="ring-1 ring-zinc-600 hover:bg-zinc-600 transition-all rounded-full py-2 w-full"
            >
              Login with google
            </button>
            <button className="ring-1 ring-zinc-600 hover:bg-zinc-600 transition-all rounded-full py-2 w-full">
              Login with github
            </button>
            <button className="ring-1 ring-zinc-600 hover:bg-zinc-600 transition-all rounded-full py-2 w-full">
              Login with Phone Number
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
