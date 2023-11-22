"use client";
import useOutsideClick from "@/hooks/outsideClick";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BiSolidDashboard } from "react-icons/bi";
import { BsFillGearFill } from "react-icons/bs";
import { CgNotes } from "react-icons/cg";
import { IoMdHelpCircle } from "react-icons/io";
import { MdOutlineNetworkPing } from "react-icons/md";

const Profile = ({ user }) => {
  const [open, setOpen] = useState(false);

  const refs = useOutsideClick(() => {
    setOpen(false);
  });
  return (
    <div className="flex items-center gap-3 ">
      {user ? (
        <div className="relative">
          <Image
            onClick={() => setOpen((prev) => !prev)}
            src={user.image || "/img/avatar.png"}
            height={30}
            width={30}
            alt="Profile"
            className="object-cover rounded-full ring-1 ring-yellow-400/20 hover:ring-yellow-400/75 cursor-pointer"
          />
          {open && (
            <>
              <div
                ref={refs}
                className={` absolute  z-10 p-4 top-12  right-2  h-max  w-[300px] bg-zinc-900 ring-1  ring-zinc-700  rounded-md`}
              >
                {/* user info */}
                <Link
                  href={`profile/${user.id}`}
                  className="flex items-center gap-4 mb-4"
                >
                  <Image
                    src={user.image || "/img/avatar.png"}
                    height={40}
                    width={40}
                    alt="Profile"
                    className="object-cover rounded-full ring-1 ring-yellow-400/20 hover:ring-yellow-400/75 cursor-pointer"
                  />
                  <div className="flex flex-col">
                    <span className="cursor-pointer">{user.name}</span>
                    <span className="text-zinc-400 text-xs">{user.email}</span>
                  </div>
                </Link>
                <div className="flex flex-col text-zinc-400 gap-2">
                  <span className="hover:text-zinc-50 cursor-pointer flex items-center gap-2">
                    <BiSolidDashboard className="text-xl" />
                    Dashboard
                  </span>
                  <span className="hover:text-zinc-50 cursor-pointer flex items-center gap-2">
                    <CgNotes className="text-xl" />
                    Posts
                  </span>
                  <span className="hover:text-zinc-50 cursor-pointer flex items-center gap-2">
                    <MdOutlineNetworkPing className="text-xl" />
                    Stats
                  </span>
                </div>
                <hr className="my-3 border-b border-zinc-700" />
                <div className="flex flex-col text-zinc-400 gap-2">
                  <span className="hover:text-zinc-50 cursor-pointer flex items-center gap-2">
                    <BsFillGearFill className="text-xl" />
                    Settings
                  </span>
                  <span className="hover:text-zinc-50 cursor-pointer flex items-center gap-2">
                    <IoMdHelpCircle className="text-xl" />
                    Help
                  </span>
                </div>
                <hr className="my-4 border-b border-zinc-700" />
                <span
                  onClick={() => signOut()}
                  className="cursor-pointer my-2 hover:text-zinc-400 rounded-md"
                >
                  Logout
                </span>
              </div>
            </>
          )}
        </div>
      ) : (
        <>
          <Link className="text-zinc-400 hover:text-zinc-50" href="/login">
            Sign In
          </Link>
          <Link
            href="/login"
            className="bg-gradient-to-r from-yellow-400 to-red-500  text-zinc-700 p-1 px-4 rounded-full"
          >
            Get Started
          </Link>
        </>
      )}
    </div>
  );
};

export default Profile;
