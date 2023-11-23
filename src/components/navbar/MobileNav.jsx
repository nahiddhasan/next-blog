"use client";
import useOutsideClick from "@/hooks/outsideClick";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BiSolidDashboard } from "react-icons/bi";
import { BsFillGearFill, BsPencilSquare } from "react-icons/bs";
import { CgNotes } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";
import { IoIosNotificationsOutline, IoMdHelpCircle } from "react-icons/io";
import { MdClose, MdOutlineNetworkPing } from "react-icons/md";
import Search from "./Search";
const MobileNav = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const searchRef = useOutsideClick(() => {
    setSearchOpen(false);
  });

  return (
    <div className="lg:hidden flex flex-1 justify-end">
      <div className="flex items-center gap-3">
        <FaSearch
          onClick={() => setSearchOpen(!searchOpen)}
          className="md:hidden text-lg text-zinc-400 hover:text-zinc-50 cursor-pointer"
        />
        {searchOpen && (
          <div ref={searchRef} className="absolute top-[105%] left-10">
            <Search placeholder={"Search"} />
          </div>
        )}
        <IoIosNotificationsOutline className="text-2xl text-zinc-400 hover:text-zinc-50 cursor-pointer" />
        {user ? (
          <Image
            onClick={() => setOpen(true)}
            src={user.image || "/img/avatar.png"}
            height={30}
            width={30}
            alt="Profile"
            className="object-cover rounded-full ring-1 ring-yellow-400/20 hover:ring-yellow-400/75 cursor-pointer"
          />
        ) : (
          <span onClick={() => signIn("google")} className="text-white">
            Sign In
          </span>
        )}
      </div>
      {open && (
        <div
          className={`${
            open ? "sidebar flex" : "hidden"
          } fixed top-0 left-0 h-screen w-screen bg-zinc-900 items-center justify-center flex-col`}
        >
          {open && (
            <MdClose
              className="text-2xl text-white fixed top-2 right-6 hover:bg-zinc-500 transition-all rounded-full p-1 z-10"
              onClick={() => setOpen(false)}
            />
          )}

          <div>
            {/* user info */}
            <div className="flex items-center gap-4 mb-8">
              <Image
                src={user.image || "/img/avatar.png"}
                height={80}
                width={80}
                alt="Profile"
                className="object-cover rounded-full ring-1 ring-yellow-400/20 hover:ring-yellow-400/75 cursor-pointer"
              />
              <div className="flex flex-col">
                <span className="cursor-pointer text-2xl text-white">
                  {user.name}
                </span>
                <span className="text-zinc-400 text-xl">{user.email}</span>
              </div>
            </div>
            <div className="flex flex-col text-3xl text-zinc-400 gap-4">
              <Link
                onClick={() => setOpen(false)}
                href={"/write"}
                className="hover:text-zinc-50 cursor-pointer flex items-center gap-2"
              >
                <BsPencilSquare />
                Write
              </Link>
              <span className="hover:text-zinc-50 cursor-pointer flex items-center gap-2">
                <BiSolidDashboard />
                Dashboard
              </span>
              <span className="hover:text-zinc-50 cursor-pointer flex items-center gap-2">
                <CgNotes />
                Posts
              </span>
              <span className="hover:text-zinc-50 cursor-pointer flex items-center gap-2">
                <MdOutlineNetworkPing />
                Stats
              </span>
            </div>
            <hr className="my-3 border-b border-zinc-700" />

            <div className="flex flex-col text-3xl text-zinc-400 gap-4">
              <span className="hover:text-zinc-50 cursor-pointer flex items-center gap-2">
                <BsFillGearFill />
                Settings
              </span>
              <span className="hover:text-zinc-50 cursor-pointer flex items-center gap-2">
                <IoMdHelpCircle />
                Help
              </span>
            </div>
            <hr className="my-4 border-b border-zinc-700" />
            <span
              onClick={() => signOut()}
              className="cursor-pointer my-2 text-white hover:text-zinc-400 text-3xl"
            >
              Logout
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
