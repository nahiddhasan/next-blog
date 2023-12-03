"use client";
import Input from "@/components/input/Input";
import LoadMore from "@/components/loadMore/LoadMore";
import Loader from "@/components/loader/Loader";
import Modal from "@/components/modal/Modal";
import Post from "@/components/post/Post";
import useInfiniteScroll from "@/hooks/infiniteScroll";
import fetcher from "@/utills/fetcher";
import upload from "@/utills/upload";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";
import FollowActions from "../_components/FollowActions";
const tabs = ["Home", "About"];

const Profile = ({ params }) => {
  const page = 1;
  const { data: session, status } = useSession();
  const { id } = params;
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [cover, setCover] = useState("");
  const [profile, setProfile] = useState("");
  const [errorMessege, setErrorMessege] = useState("");
  const [error, setError] = useState(false);
  const [submiting, setSubmiting] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  const {
    data: user,
    isLoading,
    mutate,
  } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${id}`, fetcher);

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?userId=${id}`;
  const {
    fetchData: userPosts,
    isLoadingMore,
    isReachingEnd,
    size,
    setSize,
    isLoading: postLoading,
  } = useInfiniteScroll(url);

  const { data: follow, mutate: followMutate } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/follow?followingId=${id}`,
    fetcher
  );

  useEffect(() => {
    if (!isLoading) {
      setName(user.name);
      setBio(user.bio);
    }
  }, [isLoading]);

  const handleError = (name) => {
    if (!name) {
      setError(true);
      setErrorMessege("Name Required");
    } else if (name.length < 3) {
      setError(true);
      setErrorMessege("Name Must be greater than 2 character");
    } else {
      setError(false);
    }
  };

  const handleUpdate = async () => {
    handleError(name);
    if (error) {
      return;
    }
    setSubmiting(true);
    const profileUrl = await upload(profile);
    const coverUrl = await upload(cover);
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        name,
        bio,
        image: profileUrl,
        coverImg: coverUrl,
      }),
    });
    mutate();
    setModalOpen(false);
    setSubmiting(false);
  };

  if (isLoading || status === "loading") {
    return <Loader />;
  }

  const updateProfile = () => {
    return (
      <form>
        <Input
          label="Name*"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={error}
          errorMessege={errorMessege}
          reqired={true}
        />
        <Input
          label="Bio"
          type="text"
          placeholder="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </form>
    );
  };

  return (
    <div className="flex px-4 gap-4 my-4 md:my-12 max-w-[1366px] mx-auto">
      {/* left content  */}
      <div className=" flex-[3] ring-1 ring-zinc-800 p-4 text-white">
        {modalOpen && (
          <Modal
            image={user.image}
            coverImg={user.coverImg}
            profile={profile}
            setProfile={setProfile}
            cover={cover}
            setCover={setCover}
            body={updateProfile()}
            onSubmit={handleUpdate}
            onClose={() => setModalOpen(false)}
            disabled={submiting}
          />
        )}
        <div className="w-full relative">
          <div className="relative w-full h-[200px] -z-10">
            {user?.coverImg && (
              <Image
                src={user.coverImg}
                fill
                alt="cover"
                className="object-cover"
              />
            )}
          </div>
          <h1 className="hidden md:block text-4xl font-bold mb-3 p-4">
            {user?.name}
          </h1>
          {/* mobile profile section  */}
          <div className=" md:hidden flex flex-col gap-2 items-center mb-6 -mt-16">
            <Image
              src={user?.image || "/img/avatar.png"}
              height={120}
              width={120}
              alt="dp"
              className="object-cover rounded-full"
            />
            <h1 className="text-2xl font-bold">{user?.name}</h1>
            <div className="flex items-center gap-6 mb-4">
              <span>{follow?.followings} Followers</span>
              {session?.user?.email === user.email ? (
                <button
                  onClick={() => setModalOpen(true)}
                  className="px-3 rounded-full bg-blue-700 hover:bg-blue-600"
                >
                  Edit
                </button>
              ) : (
                <Link href={!session?.user ? "/login" : ""}>
                  <FollowActions
                    mutateFn={followMutate}
                    isFollowing={!!follow?.isFollowing}
                    id={id}
                  />
                </Link>
              )}
            </div>
            <p>{user?.bio}</p>
          </div>
        </div>
        <div className="w-full">
          {/* tabs */}
          <div className="mb-6 flex gap-2 items-center w-full border-b-2 border-zinc-800 srelative">
            {tabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setSelectedTab(i)}
                className={`${
                  selectedTab === i
                    ? "border-b-red-500 border-b-2"
                    : "border-b-zinc-900 border-b-2"
                } transition-all duration-300 py-1 rounded-md px-3 `}
              >
                {tab}
              </button>
            ))}
          </div>
          {/* User Posts  */}
          {selectedTab === 0 ? (
            <>
              {userPosts?.map((post) => (
                <Post key={post.id} post={post} />
              ))}
              {/* <ProfilePostLoadMore id={id} /> */}
              <LoadMore
                isReachingEnd={isReachingEnd}
                setSize={setSize}
                size={size}
                isLoadingMore={isLoadingMore}
                endNote={"No more Post found!"}
              />
            </>
          ) : (
            <span className="py-4">{user?.bio}</span>
          )}
        </div>
      </div>
      {/* right content */}
      <div className="hidden md:block sticky top-12 h-max flex-[2] ring-1 ring-zinc-800 p-4 text-white">
        <div className="flex flex-col gap-2 items-center mb-6">
          <Image
            src={user?.image || "/img/avatar.png"}
            height={120}
            width={120}
            alt="dp"
            className="object-cover rounded-full"
          />
          <h1 className="text-2xl font-bold">{user?.name}</h1>
          <div className="flex items-center gap-6 mb-4">
            <span>{follow?.followings} Followers</span>
            {session?.user?.email === user.email ? (
              <button
                onClick={() => setModalOpen(true)}
                className="px-3 rounded-full bg-blue-700 hover:bg-blue-600"
              >
                Edit
              </button>
            ) : (
              <Link href={!session?.user ? "/login" : ""}>
                <FollowActions
                  mutateFn={followMutate}
                  isFollowing={!!follow?.isFollowing}
                  id={id}
                />
              </Link>
            )}
          </div>
          <p>{user?.bio}</p>
        </div>

        {/* <div className="flex flex-col gap-2">
          <span className="text-xl mb-2">Following</span>
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <Image
                src={"/img/avatar.png"}
                height={20}
                width={20}
                alt="dp"
                className="object-cover rounded-full"
              />
              <span>John Moe</span>
            </div>
            <span>
              <BiDotsHorizontalRounded />
            </span>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Profile;
