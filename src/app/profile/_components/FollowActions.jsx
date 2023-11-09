const FollowActions = ({ isFollowing, mutateFn, id }) => {
  const handleFollow = async (type) => {
    if (type === "follow") {
      await fetch(`http://localhost:3000/api/follow?followingId=${id}`, {
        method: "POST",
      });
    } else {
      await fetch(`http://localhost:3000/api/unfollow?followingId=${id}`, {
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
