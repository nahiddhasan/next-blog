"use client";

import { useState } from "react";

const FollowActions = ({ isFollowing, mutateFn, id }) => {
  const [followLoading, setFollowLoading] = useState(false);
  const handleFollow = async (type) => {
    if (type === "follow") {
      setFollowLoading(true);
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/follow?followingId=${id}`,
        {
          method: "POST",
        }
      );
      setFollowLoading(false);
    } else {
      setFollowLoading(true);
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/unfollow?followingId=${id}`,
        {
          method: "DELETE",
        }
      );
      setFollowLoading(false);
    }

    mutateFn();
  };

  return (
    <>
      {isFollowing ? (
        <button
          disabled={followLoading}
          onClick={() => handleFollow("unfollow")}
          className="px-3 rounded-full bg-blue-700 hover:bg-blue-600"
        >
          Unfollow
        </button>
      ) : (
        <button
          disabled={followLoading}
          onClick={() => handleFollow("follow")}
          className="px-3 rounded-full bg-blue-700 hover:bg-blue-600"
        >
          Follow
        </button>
      )}
    </>
  );
};

export default FollowActions;
