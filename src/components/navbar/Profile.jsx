"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BiSolidDashboard } from "react-icons/bi";
import { BsFillGearFill } from "react-icons/bs";
import { CgNotes } from "react-icons/cg";
import { IoMdHelpCircle } from "react-icons/io";
import { MdOutlineNetworkPing } from "react-icons/md";

const Profile = ({ user }) => {
  const [open, setOpen] = useState(false);
  const profileRef = useRef();

  const handleClickOutside = (e) => {
    if (!profileRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="flex items-center gap-3 ">
      {user ? (
        <div className="relative">
          <Image
            onClick={() => setOpen(!open)}
            src={"/img/avatar.png"}
            height={30}
            width={30}
            alt="Profile"
            className="object-cover rounded-full ring-1 ring-yellow-400/20 hover:ring-yellow-400/75 cursor-pointer"
          />
          {open && (
            <>
              <div
                ref={profileRef}
                className={` absolute  z-10 p-4 top-12  right-2  h-max  w-[250px] bg-zinc-900 ring-1  ring-zinc-700  rounded-md`}
              >
                {/* user info */}
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={"/img/avatar.png"}
                    height={40}
                    width={40}
                    alt="Profile"
                    className="object-cover rounded-full ring-1 ring-yellow-400/20 hover:ring-yellow-400/75 cursor-pointer"
                  />
                  <div className="flex flex-col">
                    <span className="cursor-pointer">John Doe</span>
                    <span className="text-zinc-400">john@email.com</span>
                  </div>
                </div>
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
                <span className="cursor-pointer my-2">Logout</span>
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
            className="bg-yellow-400 hover:bg-yellow-300 text-black p-1 px-4 rounded-full"
          >
            Get Started
          </Link>
        </>
      )}
    </div>
  );
};

export default Profile;
