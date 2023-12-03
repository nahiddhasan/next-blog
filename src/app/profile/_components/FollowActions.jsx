"use client";
const FollowActions = ({ isFollowing, mutateFn, id }) => {
  const handleFollow = async (type) => {
    if (type === "follow") {
      await fetch(`${NEXT_PUBLIC_BASE_URL}/api/follow?followingId=${id}`, {
        method: "POST",
      });
    } else {
      await fetch(`${NEXT_PUBLIC_BASE_URL}/api/unfollow?followingId=${id}`, {
        method: "DELETE",
      });
    }

    mutateFn();
  };

  return (
    <>
      {isFollowing ? (
        <button
          onClick={() => handleFollow("unfollow")}
          className="px-3 rounded-full bg-blue-700 hover:bg-blue-600"
        >
          Unfollow
        </button>
      ) : (
        <button
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
